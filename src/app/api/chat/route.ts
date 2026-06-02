import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { sendLeadEmail, type LeadPayload } from "@/lib/lead";
import { notifyHubLead } from "@/lib/hubIngest";
import { rateLimit } from "@/lib/rateLimit";
import { REGISTRAR_LEAD_TOOL, SYSTEM_PROMPT } from "@/lib/agent";

const MAX_MESSAGES = 40;
const MAX_CONTENT_CHARS = 2000;
const MAX_TOOL_ROUNDS = 3;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function hasPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

type RunLeadResult =
  | { ok: false; text: string }
  | { ok: true; text: string; payload: LeadPayload & { urgency?: string; budget?: string; is_decision_maker?: string } };

async function runRegistrarLead(input: unknown): Promise<RunLeadResult> {
  const args = (input ?? {}) as Record<string, unknown>;
  const nome = str(args.nome);
  const empresa = str(args.empresa);
  const necessidade = str(args.necessidade);
  const email = str(args.email);
  const telefone = str(args.telefone);

  if (!nome || !empresa || !necessidade) {
    return { ok: false, text: "erro: faltam dados obrigatórios (nome, empresa ou necessidade). Continue a conversa para coletá-los." };
  }
  if (!email && !telefone) {
    return { ok: false, text: "erro: nenhum contato informado. Peça um email ou telefone antes de registrar." };
  }
  if (email && !isValidEmail(email)) {
    return { ok: false, text: "erro: o email informado parece inválido. Confirme o email com o visitante." };
  }
  if (telefone && !hasPhone(telefone)) {
    return { ok: false, text: "erro: o telefone informado parece inválido. Confirme o telefone com o visitante." };
  }

  const payload = {
    nome,
    empresa,
    email: email || undefined,
    telefone: telefone || undefined,
    faturamento: str(args.faturamento) || undefined,
    tamanho: str(args.tamanho) || undefined,
    mensagem: necessidade,
    origem: "chat" as const,
    // Campos BANT coletados pelo Otto.
    urgency: str(args.urgency) || undefined,
    budget: str(args.budget) || undefined,
    is_decision_maker: str(args.is_decision_maker) || undefined,
  };

  const result = await sendLeadEmail(payload);

  if (!result.ok) {
    return { ok: false, text: "erro: falha ao enviar o lead para o time. Peça desculpas e sugira tentar pelo formulário de contato do site." };
  }

  return {
    ok: true,
    text: "sucesso: lead registrado e time da Ethos notificado. Confirme ao visitante que o time vai retornar pelo contato informado.",
    payload,
  };
}

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, { key: "chat", max: 20, windowSec: 60 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Muitas mensagens. Aguarde um instante." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Assistente não configurado." }, { status: 503 });
  }

  const model = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5";

  let body: { messages?: unknown; contact_id?: unknown };
  try {
    body = (await req.json()) as { messages?: unknown; contact_id?: unknown };
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Mensagens ausentes." }, { status: 400 });
  }
  if (body.messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: "Conversa muito longa." }, { status: 400 });
  }

  const contactId = typeof body.contact_id === "string" ? body.contact_id.trim().slice(0, 128) : undefined;

  const messages: Anthropic.MessageParam[] = [];
  for (const raw of body.messages) {
    const m = raw as { role?: unknown; content?: unknown };
    if (m.role !== "user" && m.role !== "assistant") continue;
    if (typeof m.content !== "string") continue;
    messages.push({ role: m.role, content: m.content.slice(0, MAX_CONTENT_CHARS) });
  }
  if (messages.length === 0) {
    return NextResponse.json({ error: "Mensagens inválidas." }, { status: 400 });
  }

  // Snapshot do histórico para enviar ao Hub junto com o lead.
  const fullHistory = [...messages];

  const client = new Anthropic({ apiKey });

  try {
    let leadRegistered = false;

    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const response = await client.messages.create({
        model,
        max_tokens: 1024,
        temperature: 0.3,
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        tools: [REGISTRAR_LEAD_TOOL],
        messages,
      });

      if (response.stop_reason !== "tool_use") {
        const reply = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("")
          .trim();
        if (!leadRegistered) console.log("chat: stop_reason=end_turn round=" + round);
        return NextResponse.json({ reply, leadRegistered });
      }

      messages.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        if (block.name === "registrar_lead") {
          const out = await runRegistrarLead(block.input);
          if (out.ok) {
            leadRegistered = true;
            console.log("chat: registrar_lead ok, notifying hub");
            await notifyHubLead({
              ...out.payload,
              contact_id: contactId,
              messages: fullHistory.map((m) => ({
                role: String(m.role),
                content: typeof m.content === "string" ? m.content : "",
              })),
            });
          }
          toolResults.push({ type: "tool_result", tool_use_id: block.id, content: out.text });
        } else {
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: "erro: ferramenta desconhecida.",
            is_error: true,
          });
        }
      }
      messages.push({ role: "user", content: toolResults });
    }

    return NextResponse.json({
      reply: "Perfeito. Registrei suas informações e o time da Ethos vai retornar em breve.",
      leadRegistered,
    });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth error:", err.message);
      return NextResponse.json({ error: "Assistente não configurado." }, { status: 503 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${err.status}:`, err.message);
      return NextResponse.json({ error: "Erro ao falar com o assistente." }, { status: 502 });
    }
    console.error("Chat route exception:", err);
    return NextResponse.json({ error: "Erro ao falar com o assistente." }, { status: 502 });
  }
}
