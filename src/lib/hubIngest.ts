import type { LeadPayload } from "@/lib/lead";

/**
 * Notifica o Ethos Hub que um novo lead chegou pelo site. Cria um deal
 * no pipeline (stage='lead') via POST /api/ingest/lead.
 *
 * Best-effort: silenciosamente loga falhas em vez de propagar erro pra o
 * caller. Use com `after(() => notifyHubLead(...))` pra rodar depois da
 * resposta ao visitante, sem segurar a request.
 */
export async function notifyHubLead(payload: LeadPayload): Promise<void> {
  const baseUrl = process.env.HUB_BASE_URL ?? "https://ethos-hub.vercel.app";
  const token = process.env.HUB_INGEST_TOKEN;
  if (!token) {
    // Sem token configurado, simplesmente nao notifica (lead segue por email).
    return;
  }

  const endpoint = `${baseUrl.replace(/\/$/, "")}/api/ingest/lead`;

  // Timeout curto pra nao travar caso o hub esteja fora.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`hubIngest: ${res.status} ${res.statusText} - ${body.slice(0, 200)}`);
    }
  } catch (err) {
    console.error("hubIngest fetch error:", err);
  } finally {
    clearTimeout(timeoutId);
  }
}
