import { buildSystemPrompt } from "../../lib/askhet/systemPrompt";

export const config = { runtime: "edge" };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 8;
const MAX_CONTENT_CHARS = 500;
const MAX_RAW_ARRAY_LEN = 50;
const MAX_BODY_BYTES = 32 * 1024; // 32 KB — Vercel default is 4 MB
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_IPS_TRACKED = 5000;
const MAX_TOKENS_OUT = 400;

const ALLOWED_ORIGINS = new Set([
  "https://buildbyhet.me",
  "https://www.buildbyhet.me",
  "http://localhost:3000",
]);

type ChatRole = "user" | "assistant" | "system";
interface ChatMessage {
  role: ChatRole;
  content: string;
}

// Best-effort in-memory rate limit, keyed by IP.
// NOTE: per Edge isolate only — Vercel fans requests out across many isolates,
// so the *real* per-IP ceiling is RATE_LIMIT_MAX × isolate count. Combined
// with the Origin allowlist + tight payload caps below, this is fine as
// abuse-resistance for a portfolio bot. For a globally-correct limit, swap to
// @upstash/ratelimit + @upstash/redis (both work on the Edge runtime).
const rateLimitMap = new Map<string, number[]>();

function getClientIp(req: Request): string | null {
  // PROD: trust ONLY the Vercel-injected header. `x-forwarded-for` is
  // attacker-controlled at the platform edge and would let anyone spoof a
  // fresh IP per request, bypassing the per-IP rate limit.
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  // DEV: outside Vercel there is no proxy header. Use x-forwarded-for as a
  // best-effort fallback so `next dev` and curl work; this branch is gated
  // off in production.
  if (process.env.NODE_ENV !== "production") {
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0].trim();
    return "dev-local";
  }
  return null;
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const arr = (rateLimitMap.get(ip) || []).filter((t) => t > cutoff);
  if (arr.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, arr);
    return false;
  }
  arr.push(now);
  rateLimitMap.set(ip, arr);
  // Cap the per-isolate memory: evict the oldest-tracked IP when over budget.
  if (rateLimitMap.size > MAX_IPS_TRACKED) {
    const firstKey = rateLimitMap.keys().next().value;
    if (firstKey) rateLimitMap.delete(firstKey);
  }
  return true;
}

function jsonError(
  status: number,
  message: string,
  extraHeaders?: Record<string, string>
): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(extraHeaders || {}),
    },
  });
}

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  if (raw.length > MAX_RAW_ARRAY_LEN) return [];
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    // Strip ANY system-role message from the client. The system prompt is
    // added server-side only; otherwise a client could overwrite the persona.
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    out.push({
      role: role as ChatRole,
      content: trimmed.slice(0, MAX_CONTENT_CHARS),
    });
  }
  return out.slice(-MAX_MESSAGES);
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError(405, "Method not allowed");
  }

  // Origin allowlist — browsers always send Origin on cross-origin POST,
  // and same-origin POSTs from buildbyhet.me will send it too.
  // Skip the check only when Origin is missing entirely (curl / non-browser).
  const origin = req.headers.get("origin") || "";
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return jsonError(403, "Forbidden");
  }

  // Body size cap BEFORE parsing.
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError(413, "Payload too large");
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return jsonError(500, "AskHet is not configured (missing API key).");
  }

  const ip = getClientIp(req);
  if (!ip) {
    return jsonError(400, "Missing client identifier");
  }
  if (!allowRequest(ip)) {
    return jsonError(
      429,
      "AskHet is getting a lot of questions right now — try again in a few minutes.",
      {
        "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
        "RateLimit-Limit": String(RATE_LIMIT_MAX),
        "RateLimit-Remaining": "0",
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Invalid JSON body.");
  }

  const messages = sanitizeMessages((body as { messages?: unknown })?.messages);
  if (messages.length === 0) {
    return jsonError(400, "No messages provided.");
  }

  const systemPrompt = buildSystemPrompt();
  const groqMessages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: groqMessages,
        temperature: 0.6,
        max_tokens: MAX_TOKENS_OUT,
        stream: true,
      }),
      // Propagate client disconnect to the upstream provider so we don't
      // keep generating tokens nobody will see.
      signal: req.signal,
    });
  } catch (e) {
    console.error("askhet: upstream fetch failed", e);
    return jsonError(502, "Could not reach the AI service.");
  }

  if (!upstream.ok || !upstream.body) {
    // Log upstream details SERVER-SIDE ONLY. Do not pass through — upstream
    // 4xx/5xx bodies can echo Authorization values, internal request IDs, or
    // configuration leak. Always return a generic message to the client.
    let detail = "";
    try {
      detail = (await upstream.text()).slice(0, 1000);
    } catch {
      /* ignore */
    }
    console.error(
      "askhet: upstream non-ok",
      upstream.status,
      upstream.statusText,
      detail
    );
    return jsonError(
      upstream.status === 401 ? 500 : 502,
      "AI service returned an error."
    );
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const onAbort = () => {
        try {
          reader.cancel();
        } catch {
          /* ignore */
        }
      };
      req.signal.addEventListener("abort", onAbort);
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by a blank line.
          let sepIndex: number;
          while ((sepIndex = buffer.indexOf("\n\n")) !== -1) {
            const rawEvent = buffer.slice(0, sepIndex);
            buffer = buffer.slice(sepIndex + 2);

            for (const line of rawEvent.split("\n")) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (!data) continue;
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const parsed = JSON.parse(data);
                const delta: string | undefined =
                  parsed?.choices?.[0]?.delta?.content;
                if (delta) {
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {
                /* malformed chunk — skip silently */
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      } finally {
        req.signal.removeEventListener("abort", onAbort);
        try {
          reader.releaseLock();
        } catch {
          /* ignore */
        }
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      Vary: "Origin",
    },
  });
}
