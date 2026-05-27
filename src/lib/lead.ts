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

// Paleta Ethos (mesma de globals.css).
const C = {
  carvao: "#2C2620",
  areia: "#F4EFE8",
  areiaClara: "#FBF8F3",
  ambar: "#C89A4F",
  azul: "#5A7090",
  nevoa: "#8BA5BB",
  borda: "#E2DACE",
} as const;

const FONT_STACK =
  "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// EthosMark inline: tres barras ambar (≡) + wordmark ETHOS em ExtraBold.
// SVG inline evita bloqueio de imagens externas em clients de email.
function ethosMark(): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td style="padding-right: 10px; vertical-align: middle;">
          <svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="0" y="2"  width="22" height="3" rx="1.5" fill="${C.ambar}"/>
            <rect x="0" y="8"  width="22" height="3" rx="1.5" fill="${C.ambar}"/>
            <rect x="0" y="14" width="22" height="3" rx="1.5" fill="${C.ambar}"/>
          </svg>
        </td>
        <td style="vertical-align: middle;">
          <span style="font-family: ${FONT_STACK}; font-size: 16px; font-weight: 800; letter-spacing: 0.18em; color: ${C.carvao};">ETHOS</span>
        </td>
      </tr>
    </table>
  `;
}

// Linha de campo na tabela editorial. So renderiza se houver valor.
function field(label: string, value: string | undefined, opts: { link?: "mailto" | "tel" } = {}): string {
  if (!value || value.trim().length === 0) return "";
  let cell: string;
  if (opts.link === "mailto") {
    cell = `<a href="mailto:${escape(value)}" style="color: ${C.carvao}; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: ${C.ambar};">${escape(value)}</a>`;
  } else if (opts.link === "tel") {
    const digits = value.replace(/\D/g, "");
    cell = `<a href="tel:+55${digits}" style="color: ${C.carvao}; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: ${C.ambar};">${escape(value)}</a>`;
  } else {
    cell = escape(value);
  }
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid ${C.borda}; width: 140px; vertical-align: top;">
        <span style="font-family: ${FONT_STACK}; font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: ${C.azul};">${label}</span>
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid ${C.borda}; vertical-align: top;">
        <span style="font-family: ${FONT_STACK}; font-size: 15px; font-weight: 500; color: ${C.carvao};">${cell}</span>
      </td>
    </tr>
  `;
}

export async function sendLeadEmail(payload: LeadPayload): Promise<SendLeadResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 503, error: "Servico de envio nao configurado." };
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "site@mail.somosethos.com.br";
  const to = process.env.CONTACT_TO_EMAIL ?? "contato@somosethos.com.br";

  const origemLabel = payload.origem === "chat" ? "chat do site" : "formulario do site";
  const origemTag = payload.origem === "chat" ? "Chat · Otto" : "Formulario";
  const subject = `[Ethos] Novo lead (${origemLabel}) · ${payload.empresa}`;

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

  // HTML em tabelas + estilos inline: padrao de email pra renderizar bem em
  // Gmail / Outlook / Apple Mail. Sem <style> no head (varios clients removem).
  const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escape(subject)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: ${C.areia}; font-family: ${FONT_STACK}; color: ${C.carvao};">
    <!-- Preview (visivel na inbox antes do email abrir) -->
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; color: ${C.areia};">
      ${escape(payload.nome)} de ${escape(payload.empresa)} entrou em contato via ${escape(origemLabel)}.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${C.areia}; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: ${C.areiaClara}; border: 1px solid ${C.borda}; border-radius: 14px; overflow: hidden;">

            <!-- Header com a marca -->
            <tr>
              <td style="padding: 28px 32px; border-bottom: 1px solid ${C.borda};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align: middle;">${ethosMark()}</td>
                    <td align="right" style="vertical-align: middle;">
                      <span style="display: inline-block; padding: 5px 10px; border: 1px solid ${C.ambar}; border-radius: 999px; font-family: ${FONT_STACK}; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${C.ambar};">${escape(origemTag)}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Titulo editorial -->
            <tr>
              <td style="padding: 32px 32px 8px 32px;">
                <p style="margin: 0 0 6px; font-family: ${FONT_STACK}; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: ${C.azul};">Novo lead</p>
                <h1 style="margin: 0; font-family: ${FONT_STACK}; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; color: ${C.carvao};">${escape(payload.empresa)}</h1>
                <p style="margin: 6px 0 0; font-family: ${FONT_STACK}; font-size: 15px; font-weight: 500; color: ${C.azul};">via ${escape(payload.nome)}</p>
              </td>
            </tr>

            <!-- Tabela de dados -->
            <tr>
              <td style="padding: 24px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                  ${field("Empresa", payload.empresa)}
                  ${field("Contato", payload.nome)}
                  ${field("Email", payload.email, { link: "mailto" })}
                  ${field("Telefone", payload.telefone, { link: "tel" })}
                  ${field("Faturamento", payload.faturamento)}
                  ${field("Tamanho", payload.tamanho)}
                </table>
              </td>
            </tr>

            <!-- Mensagem -->
            <tr>
              <td style="padding: 24px 32px 32px 32px;">
                <p style="margin: 0 0 10px; font-family: ${FONT_STACK}; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: ${C.azul};">Mensagem</p>
                <div style="padding: 18px 20px; background-color: ${C.areia}; border-left: 3px solid ${C.ambar}; border-radius: 6px;">
                  <p style="margin: 0; font-family: ${FONT_STACK}; font-size: 15px; line-height: 1.7; color: ${C.carvao}; white-space: pre-wrap;">${escape(payload.mensagem)}</p>
                </div>
              </td>
            </tr>

            <!-- Acao rapida -->
            ${
              payload.email
                ? `
            <tr>
              <td align="center" style="padding: 8px 32px 32px 32px;">
                <a href="mailto:${escape(payload.email)}?subject=${encodeURIComponent(`Re: contato com a Ethos — ${payload.empresa}`)}"
                   style="display: inline-block; padding: 12px 24px; background-color: ${C.carvao}; color: ${C.areia}; font-family: ${FONT_STACK}; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 999px; letter-spacing: 0.02em;">
                  Responder ${escape(payload.nome.split(" ")[0])}
                </a>
              </td>
            </tr>`
                : ""
            }

            <!-- Footer institucional -->
            <tr>
              <td style="padding: 24px 32px; background-color: ${C.areia}; border-top: 1px solid ${C.borda};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align: middle;">
                      <span style="font-family: ${FONT_STACK}; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: ${C.nevoa};">BPO de tecnologia</span>
                    </td>
                    <td align="right" style="vertical-align: middle;">
                      <a href="https://www.somosethos.com.br" style="font-family: ${FONT_STACK}; font-size: 12px; font-weight: 500; color: ${C.azul}; text-decoration: none;">somosethos.com.br</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>

          <!-- Nota fora do card -->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">
            <tr>
              <td align="center" style="padding: 16px 24px 0 24px;">
                <p style="margin: 0; font-family: ${FONT_STACK}; font-size: 11px; color: ${C.nevoa};">Notificacao automatica enviada via ${escape(origemLabel)}.</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
</html>`;

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
