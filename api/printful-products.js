// TIJDELIJK HULPBESTAND. Toont per Printful-product de variant-ID's per maat, zodat je ze
// in api/_catalog.js kunt zetten. Open na het publiceren: https://www.drinkvivace.nl/api/printful-products?format=text
// VERWIJDER DIT BESTAND (en de tijdelijke variabele PRINTFUL_READ_TOKEN) NA GEBRUIK.
//
// Dit gebruikt een aparte, alleen-lezen sleutel in PRINTFUL_READ_TOKEN. Je gewone PRINTFUL_API_TOKEN
// (voor bestellingen) blijft ongemoeid. Het toont alleen namen en ID's, geen prijzen of klantgegevens.
async function pf(path) {
  const token = process.env.PRINTFUL_READ_TOKEN || process.env.PRINTFUL_API_TOKEN;
  if (!token) throw new Error("Geen sleutel gevonden: zet PRINTFUL_READ_TOKEN in Vercel en deploy opnieuw.");
  const r = await fetch(`https://api.printful.com${path}`, { headers: { Authorization: `Bearer ${token}` } });
  const data = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, data, bron: process.env.PRINTFUL_READ_TOKEN ? "PRINTFUL_READ_TOKEN (de nieuwe sleutel)" : "PRINTFUL_API_TOKEN (de gewone sleutel, de nieuwe is niet gevonden)" };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const list = await pf("/store/products?limit=100");
    if (!list.ok) {
      return res.status(502).json({ error: "Printful gaf een foutmelding", status: list.status, detail: list.data?.error?.message || null, gebruikte_sleutel: list.bron });
    }
    const products = [];
    for (const sp of list.data.result || []) {
      const d = await pf(`/store/products/${sp.id}`);
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
