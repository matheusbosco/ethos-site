import { Resend } from "resend";

// Origem do lead: formulario de contato ou chat do concierge.
export type LeadOrigem = "form" | "chat";

// Payload flexivel. No form todos os campos vem preenchidos; no chat o
// concierge coleta o essencial (nome, empresa, contato, necessidade) e os
// demais ficam opcionais para nao virar interrogatorio.
export interface LeadPayload {
  nome: string;
  empresa: string;
  email?: string;
  telefone?: string;
  faturamento?: string;
  tamanho?: string;
  mensagem: string;
  origem: LeadOrigem;
}

export type SendLeadResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Monta uma linha da tabela de email so quando o valor existe.
function row(label: string, value: string | undefined, isLink = false): string {
  if (!value || value.trim().length === 0) return "";
  const cell = isLink
    ? `<a href="mailto:${escape(value)}" style="color: #C89A4F;">${escape(value)}</a>`
    : `<strong>${escape(value)}</strong>`;
  return `<tr><td style="padding: 4px 0; color: #5A7090; width: 140px;">${label}</td><td style="padding: 4px 0;">${cell}</td></tr>`;
}

export async function sendLeadEmail(payload: LeadPayload): Promise<SendLeadResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 503, error: "Servico de envio nao configurado." };
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "site@mail.somosethos.com.br";
  const to = process.env.CONTACT_TO_EMAIL ?? "contato@somosethos.com.br";

  const origemLabel = payload.origem === "chat" ? "chat do site" : "formulario do site";
  const subject = `[Site Ethos] Novo contato (${origemLabel}) — ${payload.empresa}`;

  const plain = [
    `Origem: ${origemLabel}`,
    `Nome: ${payload.nome}`,
    `Empresa: ${payload.empresa}`,
    payload.email ? `Email: ${payload.email}` : null,
    payload.telefone ? `Telefone: ${payload.telefone}` : null,
    payload.faturamento ? `Faturamento mensal: ${payload.faturamento}` : null,
    payload.tamanho ? `Tamanho da empresa: ${payload.tamanho}` : null,
    "",
    "Mensagem:",
    payload.mensagem,
    "",
    "---",
    `Enviado via ${origemLabel} em somosethos.com.br`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; line-height: 1.6; color: #2C2620; max-width: 560px;">
      <h2 style="margin: 0 0 16px; font-size: 18px; color: #2C2620;">Novo contato via ${escape(origemLabel)}</h2>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        ${row("Nome", payload.nome)}
        ${row("Empresa", payload.empresa)}
        ${row("Email", payload.email, true)}
        ${row("Telefone", payload.telefone)}
        ${row("Faturamento", payload.faturamento)}
        ${row("Tamanho", payload.tamanho)}
      </table>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #8BA5BB33;">
        <p style="margin: 0 0 8px; color: #5A7090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Mensagem</p>
        <p style="margin: 0; white-space: pre-wrap;">${escape(payload.mensagem)}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #8BA5BB;">Enviado via ${escape(origemLabel)} em somosethos.com.br</p>
    </div>
  `;

  const replyTo = payload.email;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Site Ethos <${from}>`,
      to: [to],
      ...(replyTo ? { replyTo } : {}),
      subject,
      text: plain,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false, status: 502, error: "Falha ao enviar a mensagem." };
    }

    return { ok: true };
  } catch (err) {
    console.error("sendLeadEmail exception:", err);
    return { ok: false, status: 500, error: "Erro inesperado ao enviar." };
  }
}
