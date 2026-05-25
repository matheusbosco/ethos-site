import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/lead";
import { REGISTRAR_LEAD_TOOL, SYSTEM_PROMPT } from "@/lib/agent";

// Limites anti-abuso para o endpoint publico.
const MAX_MESSAGES = 40;
const MAX_CONTENT_CHARS = 2000;
const MAX_TOOL_ROUNDS = 3;

interface ChatMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  tool_call_id?: string;
}

interface ToolCall {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
}

interface MoonshotChoiceMessage {
  role: "assistant";
  content: string | null;
  tool_calls?: ToolCall[];
}

interface MoonshotResponse {
  choices?: Array<{ message: MoonshotChoiceMessage; finish_reason: string }>;
  error?: { message?: string };
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function hasPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

// Executa a tool registrar_lead: valida o que o modelo coletou e dispara o
// email. Retorna o texto que volta para o modelo como resultado da tool.
async function runRegistrarLead(rawArgs: string): Promise<string> {
  let args: Record<string, string>;
  try {
    args = JSON.parse(rawArgs);
  } catch {
    return "erro: argumentos invalidos, tente novamente.";
  }

  const nome = (args.nome ?? "").trim();
  const empresa = (args.empresa ?? "").trim();
  const necessidade = (args.necessidade ?? "").trim();
  const email = (args.email ?? "").trim();
  const telefone = (args.telefone ?? "").trim();

  if (!nome || !empresa || !necessidade) {
    return "erro: faltam dados obrigatorios (nome, empresa ou necessidade). Continue a conversa para coleta-los.";
  }
  if (!email && !telefone) {
    return "erro: nenhum contato informado. Peca um email ou telefone antes de registrar.";
  }
  if (email && !isValidEmail(email)) {
    return "erro: o email informado parece invalido. Confirme o email com o visitante.";
  }
  if (telefone && !hasPhone(telefone)) {
    return "erro: o telefone informado parece invalido. Confirme o telefone com o visitante.";
  }

  const result = await sendLeadEmail({
    nome,
    empresa,
    email: email || undefined,
    telefone: telefone || undefined,
    faturamento: (args.faturamento ?? "").trim() || undefined,
    tamanho: (args.tamanho ?? "").trim() || undefined,
    mensagem: necessidade,
    origem: "chat",
  });

  if (!result.ok) {
    return "erro: falha ao enviar o lead para o time. Peca desculpas e sugira tentar pelo formulario de contato do site.";
  }

  return "sucesso: lead registrado e time da Ethos notificado. Confirme ao visitante que o time vai retornar pelo contato informado.";
}

async function callMoonshot(
  messages: ChatMessage[],
  baseUrl: string,
  apiKey: string,
  model: string
): Promise<MoonshotResponse> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages,
      tools: [REGISTRAR_LEAD_TOOL],
      tool_choice: "auto",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Moonshot ${res.status}: ${text.slice(0, 300)}`);
  }

  return (await res.json()) as MoonshotResponse;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.MOONSHOT_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Assistente nao configurado." },
      { status: 503 }
    );
  }

  const baseUrl = (process.env.MOONSHOT_BASE_URL ?? "https://api.moonshot.ai/v1").replace(/\/$/, "");
  const model = process.env.MOONSHOT_MODEL ?? "kimi-k2-0905-preview";

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

  // Aceita somente role user/assistant vindos do client; system e injetado aqui.
  const history: ChatMessage[] = [];
  for (const raw of body.messages) {
    const m = raw as Partial<ChatMessage>;
    if (m.role !== "user" && m.role !== "assistant") continue;
    if (typeof m.content !== "string") continue;
    history.push({ role: m.role, content: m.content.slice(0, MAX_CONTENT_CHARS) });
  }
  if (history.length === 0) {
    return NextResponse.json({ error: "Mensagens invalidas." }, { status: 400 });
  }

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
  ];

  try {
    let leadRegistered = false;

    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const data = await callMoonshot(messages, baseUrl, apiKey, model);
      const choice = data.choices?.[0]?.message;
      if (!choice) {
        return NextResponse.json({ error: "Resposta vazia do assistente." }, { status: 502 });
      }

      const toolCalls = choice.tool_calls ?? [];
      if (toolCalls.length === 0) {
        return NextResponse.json({
          reply: choice.content ?? "",
          leadRegistered,
        });
      }

      // Reanexa a mensagem do assistente com as tool_calls antes dos resultados.
      messages.push({
        role: "assistant",
        content: choice.content ?? "",
        // @ts-expect-error tool_calls nao faz parte do tipo simplificado, mas a API exige.
        tool_calls: toolCalls,
      });

      for (const call of toolCalls) {
        if (call.function.name === "registrar_lead") {
          const out = await runRegistrarLead(call.function.arguments);
          if (out.startsWith("sucesso")) leadRegistered = true;
          messages.push({ role: "tool", tool_call_id: call.id, content: out });
        } else {
          messages.push({
            role: "tool",
            tool_call_id: call.id,
            content: "erro: ferramenta desconhecida.",
          });
        }
      }
    }

    // Esgotou as rodadas de tool sem resposta final em texto.
    return NextResponse.json({
      reply: "Perfeito. Registrei suas informacoes e o time da Ethos vai retornar em breve.",
      leadRegistered,
    });
  } catch (err) {
    console.error("Chat route exception:", err);
    return NextResponse.json(
      { error: "Erro ao falar com o assistente." },
      { status: 502 }
    );
  }
}
