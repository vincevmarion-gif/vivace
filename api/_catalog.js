// Vivace merch: de enige plek waar producten, prijzen en leveranciers-ID's staan.
// Een product staat pas in de shop zodra "enabled" aan staat EN elke maat een
// variant-ID heeft EN alle printbestanden bestaan. Tot die tijd blijft de pagina op "Binnenkort".

export const SITE_URL = (process.env.SITE_URL || "https://www.drinkvivace.nl").replace(/\/$/, "");

// Vaste verzendkosten voor de klant, in eurocent (pas aan na de samples).
export const SHIPPING_CENTS = 595;

// Landen waarheen je levert. De verzendkosten van Printful lopen per land op tot ruim 10 euro,
// dus begin dicht bij huis en voeg later landen toe als je de kosten per land kent.
export const ALLOWED_COUNTRIES = ["NL", "BE", "DE", "LU", "FR", "AT"];

export const PRODUCTS = [
  {
    id: "tshirt",
    enabled: true, // zet op true als de varianten hieronder zijn ingevuld
    name: { nl: "Vivace T-shirt", en: "Vivace T-shirt" },
    description: {
      nl: "Navy T-shirt met het Colosseum en het Vivace-woordmerk in goud op de rug. Op bestelling gemaakt.",
      en: "Navy T-shirt with the Colosseum and the Vivace wordmark in gold on the back. Made to order.",
    },
    price_cents: 3495, // inclusief btw, aan te passen na de samples
    art: "shirt", // tekening zolang er geen foto is
    image: "/merch/tshirt-front.webp",
    images: ["/merch/tshirt-front.webp", "/merch/tshirt-back.webp"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    supplier: {
      provider: "printful",
      // Printful variant-ID per maat (zie SETUP-MERCH.md, stap 4). null = nog niet ingevuld.
      // Product ontworpen in Printful (borst, rug en label): vul hier de sync-variant-ID's in
      // (te vinden via /api/printful-products). Zodra ingevuld gebruikt de shop die.
      sync_variants: { S: 5606913052, M: 5606913065, L: 5606913074, XL: 5606913080, XXL: 5606913087 },
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
    enabled: true,
    name: { nl: "Vivace pet", en: "Vivace cap" },
    description: {
      nl: "Geborduurde pet met het Vivace-woordmerk in goud op navy. Eén maat, verstelbaar.",
      en: "Embroidered cap with the Vivace wordmark in gold on navy. One size, adjustable.",
    },
    price_cents: 3495,
    art: "cap",
    image: "/merch/pet-front.webp",
    images: ["/merch/pet-front.webp", "/merch/pet-back.webp"],
    sizes: ["One size"],
    supplier: {
      provider: "printful",
      sync_variants: { "One size": 5606925536 }, // door jou in Printful ontworpen
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
  if (!p.enabled) return true;
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
    images: p.images || (p.image ? [p.image] : []),
    sizes: p.sizes,
  }));
}

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id && isLive(p));
}
