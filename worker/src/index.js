const ALLOWED_ORIGIN = "https://guysmileysells.github.io";
const MAX_COMMENT_LENGTH = 3000;
const MODEL = "@cf/meta/llama-3.2-3b-instruct";

function allowedOrigin(value) {
  if (value === ALLOWED_ORIGIN) return true;
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]");
  } catch {
    return false;
  }
}

function headers(origin) {
  const result = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  });
  if (allowedOrigin(origin)) {
    result.set("Access-Control-Allow-Origin", origin);
    result.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    result.set("Access-Control-Allow-Headers", "Content-Type");
    result.set("Access-Control-Max-Age", "86400");
    result.set("Vary", "Origin");
  }
  return result;
}

function json(origin, status, body) {
  return new Response(JSON.stringify(body), {status, headers: headers(origin)});
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (url.pathname !== "/copy-edit") return json(origin, 404, {error: "Not found."});
    if (!allowedOrigin(origin)) return json(origin, 403, {error: "Request denied."});
    if (request.method === "OPTIONS") return new Response(null, {status: 204, headers: headers(origin)});
    if (request.method !== "POST") return json(origin, 405, {error: "Method not allowed."});
    if (request.headers.get("Content-Type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
      return json(origin, 415, {error: "Invalid request."});
    }

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 4096) return json(origin, 400, {error: "Invalid request."});

    let body;
    try {
      body = await request.json();
    } catch {
      return json(origin, 400, {error: "Invalid request."});
    }
    if (!body || typeof body !== "object" || Array.isArray(body) ||
        Object.keys(body).length !== 1 || Object.keys(body)[0] !== "comment" ||
        typeof body.comment !== "string") {
      return json(origin, 400, {error: "Invalid request."});
    }
    const comment = body.comment.trim();
    if (!comment || comment.length > MAX_COMMENT_LENGTH) return json(origin, 400, {error: "Invalid request."});

    const rateKey = request.headers.get("CF-Connecting-IP") || "unknown";
    try {
      const outcome = await env.COPY_EDIT_RATE_LIMIT.limit({key: rateKey});
      if (!outcome.success) return json(origin, 429, {error: "Too many requests."});
    } catch {
      return json(origin, 503, {error: "Copy edit unavailable."});
    }

    try {
      const result = await env.AI.run(MODEL, {
        messages: [
          {role: "system", content: "Copy-edit the supplied feedback for clarity, grammar, and a constructive professional tone. Preserve meaning and return only the revised text."},
          {role: "user", content: comment},
        ],
        max_tokens: 1024,
        temperature: 0.2,
      });
      const suggestion = typeof result?.response === "string" ? result.response.trim() : "";
      if (!suggestion) throw new Error("empty result");
      return json(origin, 200, {suggestion: suggestion.slice(0, MAX_COMMENT_LENGTH)});
    } catch {
      return json(origin, 500, {error: "Copy edit unavailable."});
    }
  },
};
