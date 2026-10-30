// Vivace merch: de enige plek waar producten, prijzen en leveranciers-ID's staan.
// Een product staat pas in de shop zodra "enabled" aan staat EN elke maat een
// variant-ID heeft EN alle printbestanden bestaan. Tot die tijd blijft de pagina op "Binnenkort".

export const SITE_URL = (process.env.SITE_URL || "https://www.drinkvivace.nl").replace(/\/$/, "");

// Vaste verzendkosten voor de klant, in eurocent (pas aan na de samples).
export const SHIPPING_CENTS = 595;

// Landen waarheen de leverancier vanuit de EU kan leveren.
export const ALLOWED_COUNTRIES = ["NL", "BE", "DE", "FR", "LU", "AT", "IT", "ES", "PT", "IE", "DK", "SE", "FI", "PL", "CZ"];

export const PRODUCTS = [
  {
    id: "tshirt",
    enabled: false, // zet op true als de varianten hieronder zijn ingevuld
    name: { nl: "Vivace T-shirt", en: "Vivace T-shirt" },
    description: {
      nl: "Navy T-shirt met het Colosseum en het Vivace-woordmerk in goud op de rug. Op bestelling gemaakt.",
      en: "Navy T-shirt with the Colosseum and the Vivace wordmark in gold on the back. Made to order.",
    },
    price_cents: 3495, // inclusief btw, aan te passen na de samples
    art: "shirt", // tekening zolang er geen foto is
    image: null, // bijvoorbeeld "/merch/tshirt.jpg" (zet het bestand in public/merch/)
    sizes: ["S", "M", "L", "XL", "XXL"],
    supplier: {
      provider: "printful",
      // Printful variant-ID per maat (zie SETUP-MERCH.md, stap 4). null = nog niet ingevuld.
      // Product ontworpen in Printful (borst, rug en label): vul hier de sync-variant-ID's in
      // (te vinden via /api/printful-products). Zodra ingevuld gebruikt de shop die.
      sync_variants: { S: null, M: null, L: null, XL: null, XXL: null },
      // Reserve: losse catalogus-varianten met printbestanden uit /public/merch/print/
      variants: { S: 4111, M: 4112, L: 4113, XL: 4114, XXL: 4115 }, // Bella + Canvas 3001, kleur Navy
      // Printbestanden: PNG met transparante achtergrond, ruim 3000 px breed, in public/merch/print/.
      files: [
        { type: "back", path: "/merch/print/shirt-back.png" },
        { type: "default", path: "/merch/print/shirt-front.png" },
      ],
      options: [],
    },
  },
  {
    id: "pet",
    enabled: false,
    name: { nl: "Vivace pet", en: "Vivace cap" },
    description: {
      nl: "Geborduurde pet met het Vivace-woordmerk in goud op navy. Eén maat, verstelbaar.",
      en: "Embroidered cap with the Vivace wordmark in gold on navy. One size, adjustable.",
    },
    price_cents: 3495,
    art: "cap",
    image: public/merch/print/cap.jpg
    sizes: ["One size"],
    supplier: {
      provider: "printful",
      variants: { "One size": null },
      files: [{ type: "embroidery_front", path: "/merch/print/cap-front.png" }],
      options: [], // borduurgaren-instellingen, zie SETUP-MERCH.md
    },
  },
];

export function syncVariantFor(p, size) {
  return p.supplier.sync_variants?.[size];
}

export function isLive(p) {
  if (!p.enabled) return false;
  return p.sizes.every((s) => Number.isInteger(syncVariantFor(p, s)) || Number.isInteger(p.supplier.variants[s]));
}

export function publicProducts() {
  return PRODUCTS.filter(isLive).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price_cents: p.price_cents,
    art: p.art,
    image: p.image,
    sizes: p.sizes,
  }));
}

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id && isLive(p));
}
