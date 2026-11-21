// Small best-effort limiter for the public forms: 5 requests per minute per IP, per server instance.
// It stops casual abuse. For real protection add Vercel's firewall or an edge rate limit.
const hits = new Map<string, number[]>();

export function limited(req: Request, max = 5, windowMs = 60_000): boolean {
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}
