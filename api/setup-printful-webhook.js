// TIJDELIJK HULPBESTAND (met ADMIN_KEY): registreert de Printful-webhook en stuurt een testmail.
// Gebruik: ?key=...&action=register | list | testmail (&to=adres). Verwijder dit bestand daarna.
import crypto from "node:crypto";
import { SITE_URL } from "./_catalog.js";
import { printful, sendEmail } from "./_lib.js";

const TYPES = ["package_shipped", "order_failed", "order_canceled", "package_returned"];

export default async function handler(req, res) {
  const expected = process.env.ADMIN_KEY || "";
  const given = String(req.query?.key || "");
  const ok = expected.length >= 16 && given.length === expected.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return res.status(404).json({ error: "Not found" });

  const action = String(req.query?.action || "list");
  if (action === "testmail") {
    const to = String(req.query?.to || process.env.OWNER_EMAIL || "");
    if (!to) return res.status(400).json({ error: "Geen ontvanger (OWNER_EMAIL of ?to=)" });
    const r = await sendEmail({ to, subject: "Testmail Vivace merch", text: "Als je dit leest, werkt het versturen van e-mail.\n\nVIVACE" });
    return res.status(r.ok ? 200 : 502).json({ from: process.env.RESEND_FROM || "onboarding@resend.dev", to, ok: r.ok, status: r.status, detail: r.data });
  }
  if (action === "register") {
    const secret = process.env.PRINTFUL_WEBHOOK_SECRET || "";
    if (secret.length < 16) return res.status(400).json({ error: "Zet PRINTFUL_WEBHOOK_SECRET (minstens 16 tekens) in Vercel" });
    const url = `${SITE_URL}/api/printful-webhook?token=${encodeURIComponent(secret)}`;
    const r = await printful("POST", "/webhooks", { url, types: TYPES });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status, types: TYPES, detail: r.data?.error || r.data?.result?.types || null });
  }
  const r = await printful("GET", "/webhooks");
  const out = r.data?.result ? { ...r.data.result, url: String(r.data.result.url || "").replace(/token=[^&]+/, "token=***") } : r.data;
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status, webhook: out });
}
