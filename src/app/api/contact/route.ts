import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Servico de envio nao configurado." },
      { status: 503 }
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

  const from = process.env.CONTACT_FROM_EMAIL ?? "site@mail.somosethos.com.br";
  const to = process.env.CONTACT_TO_EMAIL ?? "contato@somosethos.com.br";

  const subject = `[Site Ethos] Novo contato — ${body.empresa}`;
  const plain = [
    `Nome: ${body.nome}`,
    `Empresa: ${body.empresa}`,
    `Email: ${body.email}`,
    `Telefone: ${body.telefone}`,
    `Faturamento mensal: ${body.faturamento}`,
    `Tamanho da empresa: ${body.tamanho}`,
    "",
    "Mensagem:",
    body.mensagem,
    "",
    "---",
    "Enviado pelo formulario de contato em somosethos.com.br",
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; line-height: 1.6; color: #2C2620; max-width: 560px;">
      <h2 style="margin: 0 0 16px; font-size: 18px; color: #2C2620;">Novo contato pelo site</h2>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <tr><td style="padding: 4px 0; color: #5A7090; width: 140px;">Nome</td><td style="padding: 4px 0;"><strong>${escape(body.nome)}</strong></td></tr>
        <tr><td style="padding: 4px 0; color: #5A7090;">Empresa</td><td style="padding: 4px 0;"><strong>${escape(body.empresa)}</strong></td></tr>
        <tr><td style="padding: 4px 0; color: #5A7090;">Email</td><td style="padding: 4px 0;"><a href="mailto:${escape(body.email)}" style="color: #C89A4F;">${escape(body.email)}</a></td></tr>
        <tr><td style="padding: 4px 0; color: #5A7090;">Telefone</td><td style="padding: 4px 0;">${escape(body.telefone)}</td></tr>
        <tr><td style="padding: 4px 0; color: #5A7090;">Faturamento</td><td style="padding: 4px 0;">${escape(body.faturamento)}</td></tr>
        <tr><td style="padding: 4px 0; color: #5A7090;">Tamanho</td><td style="padding: 4px 0;">${escape(body.tamanho)}</td></tr>
      </table>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #8BA5BB33;">
        <p style="margin: 0 0 8px; color: #5A7090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Mensagem</p>
        <p style="margin: 0; white-space: pre-wrap;">${escape(body.mensagem)}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #8BA5BB;">Enviado pelo formulario de contato em somosethos.com.br</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Site Ethos <${from}>`,
      to: [to],
      replyTo: body.email,
      subject,
      text: plain,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Falha ao enviar a mensagem." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route exception:", err);
    return NextResponse.json(
      { error: "Erro inesperado ao enviar." },
      { status: 500 }
    );
  }
}
