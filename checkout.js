import { SITE_URL, SHIPPING_CENTS, ALLOWED_COUNTRIES, findProduct } from "./_catalog.js";
import { stripeRequest } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length < 1 || items.length > 10) return res.status(400).json({ error: "Ongeldige bestelling" });

    const lineItems = [];
    const meta = [];
    for (const it of items) {
      const p = findProduct(String(it.id));
      const qty = Number(it.qty);
      if (!p || !p.sizes.includes(String(it.size)) || !Number.isInteger(qty) || qty < 1 || qty > 10) {
        return res.status(400).json({ error: "Product niet beschikbaar" });
      }
      lineItems.push({
        quantity: qty,
        price_data: {
          currency: "eur",
          unit_amount: p.price_cents, // de prijs komt altijd van de server, nooit van de browser
          product_data: {
            name: `${p.name.nl}${p.sizes.length > 1 ? ` (${it.size})` : ""}`,
            description: p.description.nl,
            ...(p.image ? { images: [`${SITE_URL}${p.image}`] } : {}),
          },
        },
      });
      meta.push(`${p.id}:${it.size}:${qty}`);
    }

    const session = await stripeRequest("checkout/sessions", {
      mode: "payment",
      locale: "nl",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Verzending",
            fixed_amount: { amount: SHIPPING_CENTS, currency: "eur" },
            delivery_estimate: { minimum: { unit: "business_day", value: 5 }, maximum: { unit: "business_day", value: 10 } },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      custom_text: { submit: { message: "Op bestelling gemaakt. Je kunt binnen 14 dagen na ontvangst retourneren." } },
      metadata: { items: meta.join(",") },
      success_url: `${SITE_URL}/merch/bedankt`,
      cancel_url: `${SITE_URL}/merch`,
    });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("checkout mislukt", e);
    return res.status(500).json({ error: "Er ging iets mis" });
  }
}
