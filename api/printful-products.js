// TIJDELIJK HULPBESTAND. Toont per Printful-product de variant-ID's per maat, zodat je ze
// in api/_catalog.js kunt zetten. Open na het publiceren: https://www.drinkvivace.nl/api/printful-products
// (of met ?format=text voor een korte lijst). VERWIJDER DIT BESTAND NA GEBRUIK.
// Het toont alleen namen en ID's, geen prijzen of persoonsgegevens, en je API-sleutel blijft op de server.
import { printful } from "./_lib.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const list = await printful("GET", "/store/products?limit=100");
    if (!list.ok) {
      return res.status(502).json({ error: "Printful gaf een foutmelding", status: list.status, detail: list.data?.error?.message || null });
    }
    const products = [];
    for (const sp of list.data.result || []) {
      const d = await printful("GET", `/store/products/${sp.id}`);
      const variants = (d.data?.result?.sync_variants || []).map((v) => {
        const parts = String(v.name || "").split(" / ");
        return { size: parts.length > 1 ? parts[parts.length - 1].trim() : "One size", sync_variant_id: v.id, external_id: v.external_id, name: v.name };
      });
      products.push({ product: sp.name, sync_product_id: sp.id, external_id: sp.external_id, variants });
    }
    if (req.query?.format === "text") {
      const text = products
        .map((p) => `${p.product}\n  sync_variants: { ${p.variants.map((v) => `${JSON.stringify(v.size)}: ${v.sync_variant_id}`).join(", ")} }`)
        .join("\n\n");
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.status(200).send(text);
    }
    return res.status(200).json({ products });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
}
