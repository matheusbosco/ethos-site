import { NextRequest } from "next/server";

/**
 * Rate limit in-memory por IP (sliding window). Suficiente pra mitigar abuso
 * em endpoints publicos que custam (ex.: /api/chat → tokens Anthropic).
 *
 * Limitacao conhecida: cada instancia serverless da Vercel tem o proprio Map.
 * Em pico de trafego, varias instancias podem ser criadas e o limite por IP
 * acaba "diluido" entre elas. Pra protecao mais rigorosa, migrar pra Vercel
 * KV / Upstash Redis. Por ora, isto basta — qualquer instancia limita o burst
 * que ela ve.
 */

interface Bucket {
  // Timestamps (ms) dos hits dentro da janela.
  hits: number[];
}

const buckets = new Map<string, Bucket>();

// Limpeza periodica: a cada 5min remove IPs sem hits no ultimo dia. Evita
// vazamento de memoria em instancias longas.
let lastSweep = Date.now();
const SWEEP_INTERVAL_MS = 5 * 60 * 1000;
const SWEEP_TTL_MS = 24 * 60 * 60 * 1000;

function maybeSweep(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  const cutoff = now - SWEEP_TTL_MS;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.hits.length === 0 || bucket.hits[bucket.hits.length - 1] < cutoff) {
      buckets.delete(key);
    }
  }
}

export interface RateLimitOptions {
  /** Identificador do limit pool (ex.: 'chat', 'contact'). */
  key: string;
  /** Limite de hits dentro da janela. */
  max: number;
  /** Tamanho da janela em segundos. */
  windowSec: number;
}

export interface RateLimitResult {
  ok: boolean;
  /** Segundos ate o primeiro slot voltar a ficar disponivel (so quando !ok). */
  retryAfterSec: number;
}

/**
 * Extrai um identificador estavel pra rate limit. Prioriza headers do Vercel
 * (`x-real-ip`, `x-forwarded-for`) e cai pra ip da request quando ausentes.
 */
function clientId(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // Primeiro IP da cadeia e o do cliente.
    return forwarded.split(",")[0]!.trim();
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  // Sem header de IP confiavel: usa um identificador degradado (CF-Connecting-IP
  // ou hostname). Em producao Vercel sempre temos x-forwarded-for.
  return req.headers.get("cf-connecting-ip") ?? "unknown";
}

/**
 * Aplica rate limit pra request atual. Retorna `{ok:false}` quando estourou.
 *
 * Uso:
 *   const rl = rateLimit(req, { key: "chat", max: 20, windowSec: 60 });
 *   if (!rl.ok) return NextResponse.json({...}, { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } });
 */
export function rateLimit(req: NextRequest, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  maybeSweep(now);

  const windowMs = opts.windowSec * 1000;
  const cutoff = now - windowMs;
  const id = `${opts.key}:${clientId(req)}`;

  let bucket = buckets.get(id);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(id, bucket);
  }

  // Remove hits fora da janela.
  bucket.hits = bucket.hits.filter((t) => t > cutoff);

  if (bucket.hits.length >= opts.max) {
    // Quando o hit mais antigo expira, o primeiro slot abre.
    const oldest = bucket.hits[0]!;
    const retryAfterMs = oldest + windowMs - now;
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }

  bucket.hits.push(now);
  return { ok: true, retryAfterSec: 0 };
}
