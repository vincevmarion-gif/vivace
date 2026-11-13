// Productfeed voor Google Merchant Center (gratis Shopping-vermeldingen).
// Maakt een RSS 2.0-feed met één regel per product en maat, uit dezelfde lijst als de shop
// (api/_catalog.js). Zodra je een product in de catalogus aanzet, staat het hier ook in.
// Adres na publicatie: https://www.drinkvivace.nl/api/merch-feed
import { PRODUCTS, isLive, SITE_URL, SHIPPING_CENTS, ALLOWED_COUNTRIES } from "./_catalog.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const eur = (cents) => `${(cents / 100).toFixed(2)} EUR`;

const CATEGORY = {
  tshirt: "Apparel & Accessories > Clothing > Shirts & Tops",
  longsleeve: "Apparel & Accessories > Clothing > Shirts & Tops",
  pet: "Apparel & Accessories > Clothing Accessories > Hats",
};

function itemsFor(p) {
  const images = p.images && p.images.length ? p.images : p.image ? [p.image] : [];
  return p.sizes.map((size) => {
    const oneSize = p.sizes.length === 1;
    const id = `${p.id}-${size.toLowerCase().replace(/\s+/g, "-")}`;
    return `    <item>
      <g:id>${esc(id)}</g:id>
      <g:item_group_id>${esc(p.id)}</g:item_group_id>
      <title>${esc(`${p.name.nl} navy${oneSize ? "" : ` (maat ${size})`}`)}</title>
      <description>${esc(p.description.nl)}</description>
      <link>${esc(`${SITE_URL}/merch?product=${p.id}`)}</link>
      ${images[0] ? `<g:image_link>${esc(SITE_URL + images[0])}</g:image_link>` : ""}
      ${images.slice(1, 10).map((i) => `<g:additional_image_link>${esc(SITE_URL + i)}</g:additional_image_link>`).join("\n      ")}
      <g:availability>in_stock</g:availability>
      <g:price>${eur(p.price_cents)}</g:price>
      <g:brand>Vivace</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${esc(CATEGORY[p.id] || "Apparel & Accessories")}</g:google_product_category>
      <g:product_type>Merchandise &gt; Vivace</g:product_type>
      <g:color>Navy</g:color>
      <g:size>${esc(oneSize ? "One size" : size)}</g:size>
      <g:gender>unisex</g:gender>
      <g:age_group>adult</g:age_group>
${ALLOWED_COUNTRIES.map((c) => `      <g:shipping><g:country>${c}</g:country><g:service>Standaard</g:service><g:price>${eur(SHIPPING_CENTS)}</g:price></g:shipping>`).join("\n")}
    </item>`;
  });
}

export default function handler(req, res) {
  const items = PRODUCTS.filter(isLive).flatMap(itemsFor).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Vivace merch</title>
    <link>${esc(SITE_URL)}/merch</link>
    <description>Vivace merch: T-shirt, longsleeve en pet in navy en goud. Op bestelling gemaakt.</description>
${items}
  </channel>
</rss>
`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(xml);
}
