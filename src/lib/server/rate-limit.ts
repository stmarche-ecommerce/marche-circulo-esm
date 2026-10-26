// Rate limit em memoria por instancia. Em Cloud Run com varias instancias o
// limite efetivo e por instancia; use Cloud Armor para um limite global.
const buckets = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 10_000;

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    return { ok: false, retryAfterSeconds: Math.ceil((recent[0] + windowMs - now) / 1000) };
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [bucketKey, timestamps] of buckets) {
      if (timestamps.every((timestamp) => now - timestamp >= windowMs)) {
        buckets.delete(bucketKey);
      }
    }
  }

  return { ok: true, retryAfterSeconds: 0 };
}
