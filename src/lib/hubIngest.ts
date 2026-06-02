import type { LeadPayload } from "@/lib/lead";

export interface HubIngestPayload extends LeadPayload {
  contact_id?: string;
  urgency?: string;
  budget?: string;
  is_decision_maker?: string;
  messages?: Array<{ role: string; content: string }>;
}

/**
 * Notifica o Ethos Hub que um novo lead chegou pelo site. Cria um deal
 * no pipeline (stage='lead') via POST /api/ingest/lead, incluindo campos
 * BANT coletados pelo Otto e o histórico completo da conversa.
 *
 * Best-effort: silenciosamente loga falhas em vez de propagar erro pro caller.
 */
export async function notifyHubLead(payload: HubIngestPayload): Promise<void> {
  const baseUrl = process.env.HUB_BASE_URL ?? "https://ethos-hub.vercel.app";
  const token = process.env.HUB_INGEST_TOKEN;
  console.log("hubIngest: token?", !!token, "url:", baseUrl.slice(0, 40));
  if (!token) return;

  const endpoint = `${baseUrl.replace(/\/$/, "")}/api/ingest/lead`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    console.log("hubIngest: fetching", endpoint);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    console.log("hubIngest: response", res.status);
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
