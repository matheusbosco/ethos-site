import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { sendLeadEmail } from "@/lib/lead";
import { notifyHubLead } from "@/lib/hubIngest";
import { rateLimit } from "@/lib/rateLimit";

interface ContactPayload {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  faturamento: string;
  tamanho: string;
  mensagem: string;
  consent: boolean;
  _gotcha?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidBrazilianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

export async function POST(req: NextRequest) {
  // Rate limit: form tem honeypot + validacao estrita + LGPD consent,
  // entao 10/min/IP da pra usar normalmente e ainda bloqueia bots agressivos.
  const rl = rateLimit(req, { key: "contact", max: 10, windowSec: 60 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um instante." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  if (body._gotcha && body._gotcha.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const requiredFields: Array<keyof ContactPayload> = [
    "nome",
    "empresa",
    "email",
    "telefone",
    "faturamento",
    "tamanho",
    "mensagem",
  ];
  for (const field of requiredFields) {
    if (!body[field] || String(body[field]).trim().length === 0) {
      return NextResponse.json(
        { error: `Campo obrigatorio ausente: ${field}.` },
        { status: 400 }
      );
    }
  }

  if (!body.consent) {
    return NextResponse.json(
      { error: "Consentimento LGPD obrigatorio." },
      { status: 400 }
    );
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: "Email invalido." }, { status: 400 });
  }

  if (!isValidBrazilianPhone(body.telefone)) {
    return NextResponse.json({ error: "Telefone invalido." }, { status: 400 });
  }

  if (body.mensagem.length > 4000) {
    return NextResponse.json(
      { error: "Mensagem muito longa." },
      { status: 400 }
    );
  }

  const lead = {
    nome: body.nome,
    empresa: body.empresa,
    email: body.email,
    telefone: body.telefone,
    faturamento: body.faturamento,
    tamanho: body.tamanho,
    mensagem: body.mensagem,
    origem: "form" as const,
  };

  const result = await sendLeadEmail(lead);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  // Best-effort: cria deal no pipeline do Hub apos responder ao visitante.
  after(() => notifyHubLead(lead));

  return NextResponse.json({ ok: true }, { status: 200 });
}
