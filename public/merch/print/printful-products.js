// TIJDELIJK HULPBESTAND: toont de sync-variant-ID's van je Printful-producten.
// Beveiligd met ADMIN_KEY. Gebruik het één keer en verwijder het bestand daarna.
import crypto from "node:crypto";
import { printful } from "./_lib.js";

export default async function handler(req, res) {
  const expected = process.env.ADMIN_KEY;
  const given = String(req.query?.key || "");
  const ok = expected && given.length === expected.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return res.status(404).json({ error: "Not found" });

  const list = await printful("GET", "/store/products?limit=100");
  if (!list.ok) return res.status(502).json({ error: "Printful", status: list.status, detail: list.data?.error?.message });
  const out = [];
  for (const sp of list.data.result || []) {
    const det = await printful("GET", `/store/products/${sp.id}`);
    const variants = (det.data?.result?.sync_variants || []).map((v) => ({
      sync_variant_id: v.id,
      name: v.name,
      catalog_variant_id: v.variant_id,
    }));
    out.push({ product: sp.name, sync_product_id: sp.id, variants });
  }
  return res.status(200).json(out);
}
