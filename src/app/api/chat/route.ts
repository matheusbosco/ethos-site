import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { sendLeadEmail, type LeadPayload } from "@/lib/lead";
import { notifyHubLead } from "@/lib/hubIngest";
import { REGISTRAR_LEAD_TOOL, SYSTEM_PROMPT } from "@/lib/agent";

// Limites anti-abuso para o endpoint publico.
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

// Executa a tool registrar_lead: valida o que o modelo coletou e dispara o
// email. Retorna o texto que volta para a Claude como resultado da tool +
// o payload (pra ser usado pelo caller pra notificar o Hub).
type RunLeadResult =
  | { ok: false; text: string }
  | { ok: true; text: string; payload: LeadPayload };

async function runRegistrarLead(input: unknown): Promise<RunLeadResult> {
  const args = (input ?? {}) as Record<string, unknown>;
  const nome = str(args.nome);
  const empresa = str(args.empresa);
  const necessidade = str(args.necessidade);
  const email = str(args.email);
  const telefone = str(args.telefone);

  if (!nome || !empresa || !necessidade) {
    return { ok: false, text: "erro: faltam dados obrigatorios (nome, empresa ou necessidade). Continue a conversa para coleta-los." };
  }
  if (!email && !telefone) {
    return { ok: false, text: "erro: nenhum contato informado. Peca um email ou telefone antes de registrar." };
  }
  if (email && !isValidEmail(email)) {
    return { ok: false, text: "erro: o email informado parece invalido. Confirme o email com o visitante." };
  }
  if (telefone && !hasPhone(telefone)) {
    return { ok: false, text: "erro: o telefone informado parece invalido. Confirme o telefone com o visitante." };
  }

  const payload: LeadPayload = {
    nome,
    empresa,
    email: email || undefined,
    telefone: telefone || undefined,
    faturamento: str(args.faturamento) || undefined,
    tamanho: str(args.tamanho) || undefined,
    mensagem: necessidade,
    origem: "chat",
  };

  const result = await sendLeadEmail(payload);

  if (!result.ok) {
    return { ok: false, text: "erro: falha ao enviar o lead para o time. Peca desculpas e sugira tentar pelo formulario de contato do site." };
  }

  return {
    ok: true,
    text: "sucesso: lead registrado e time da Ethos notificado. Confirme ao visitante que o time vai retornar pelo contato informado.",
    payload,
  };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Assistente nao configurado." }, { status: 503 });
  }

  const model = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5";

  let body: { messages?: unknown };
  try {
    body = (await req.json()) as { messages?: unknown };
  } catch {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Mensagens ausentes." }, { status: 400 });
  }
  if (body.messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: "Conversa muito longa." }, { status: 400 });
  }

  // Aceita somente role user/assistant vindos do client; system vai a parte.
  const messages: Anthropic.MessageParam[] = [];
  for (const raw of body.messages) {
    const m = raw as { role?: unknown; content?: unknown };
    if (m.role !== "user" && m.role !== "assistant") continue;
    if (typeof m.content !== "string") continue;
    messages.push({ role: m.role, content: m.content.slice(0, MAX_CONTENT_CHARS) });
  }
  if (messages.length === 0) {
    return NextResponse.json({ error: "Mensagens invalidas." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    let leadRegistered = false;

    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const response = await client.messages.create({
        model,
        max_tokens: 1024,
        temperature: 0.3,
        // System estavel + tools: cacheia o prefixo (no-op enquanto curto).
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
        return NextResponse.json({ reply, leadRegistered });
      }

      // Reanexa a resposta do assistente (com os blocos tool_use) antes dos resultados.
      messages.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        if (block.name === "registrar_lead") {
          const out = await runRegistrarLead(block.input);
          if (out.ok) {
            leadRegistered = true;
            // Best-effort: cria deal no pipeline do Hub apos a resposta.
            after(() => notifyHubLead(out.payload));
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

    // Esgotou as rodadas de tool sem resposta final em texto.
    return NextResponse.json({
      reply: "Perfeito. Registrei suas informacoes e o time da Ethos vai retornar em breve.",
      leadRegistered,
    });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth error:", err.message);
      return NextResponse.json({ error: "Assistente nao configurado." }, { status: 503 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${err.status}:`, err.message);
      return NextResponse.json({ error: "Erro ao falar com o assistente." }, { status: 502 });
    }
    console.error("Chat route exception:", err);
    return NextResponse.json({ error: "Erro ao falar com o assistente." }, { status: 502 });
  }
}
