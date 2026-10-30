import crypto from "node:crypto";

// ---------- Stripe (zonder SDK, gewoon de REST API) ----------
export function toForm(value, prefix = "", out = []) {
  if (Array.isArray(value)) value.forEach((v, i) => toForm(v, `${prefix}[${i}]`, out));
  else if (value && typeof value === "object") Object.entries(value).forEach(([k, v]) => toForm(v, prefix ? `${prefix}[${k}]` : k, out));
  else if (value !== undefined && value !== null) out.push([prefix, String(value)]);
  return out;
}

export async function stripeRequest(path, params) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY ontbreekt");
  const body = new URLSearchParams(toForm(params)).toString();
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Stripe: ${data?.error?.message || res.status}`);
  return data;
}

export function verifyStripeSignature(rawBody, header, secret, toleranceSec = 300, now = Date.now()) {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=")));
  const t = parts.t;
  const sigs = header.split(",").filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  if (!t || sigs.length === 0) return false;
  if (Math.abs(now / 1000 - Number(t)) > toleranceSec) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");
  return sigs.some((s) => s.length === expected.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected)));
}

export async function readRawBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(typeof c === "string" ? Buffer.from(c) : c);
  return Buffer.concat(chunks).toString("utf8");
}

// ---------- Printful ----------
export async function printful(method, path, body) {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) throw new Error("PRINTFUL_API_TOKEN ontbreekt");
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  if (process.env.PRINTFUL_STORE_ID) headers["X-PF-Store-Id"] = process.env.PRINTFUL_STORE_ID;
  const res = await fetch(`https://api.printful.com${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

// Printful accepteert maximaal 32 tekens als external_id.
export function externalIdFor(sessionId) {
  return "viv" + crypto.createHash("sha1").update(sessionId).digest("hex").slice(0, 24);
}

// ---------- Meldingen aan jou (alleen als er iets aandacht nodig heeft) ----------
export async function notify(subject, text) {
  console.log(`[merch] ${subject}\n${text}`);
  const key = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL;
  if (!key || !to) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.RESEND_FROM || "Vivace Merch <onboarding@resend.dev>", to: [to], subject, text }),
    });
  } catch (e) {
    console.error("notify mislukt", e);
  }
}
