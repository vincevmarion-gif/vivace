import { SITE_URL, findProduct } from "./_catalog.js";
import { readRawBody, verifyStripeSignature, printful, externalIdFor, notify } from "./_lib.js";

const STATE_COUNTRIES = ["US", "CA", "AU"]; // alleen hier wil Printful een state_code

export async function fulfill(session) {
  const externalId = externalIdFor(session.id);

  // Dubbele webhooks (Stripe probeert opnieuw) mogen nooit een tweede order maken.
  const existing = await printful("GET", `/orders/@${externalId}`);
  if (existing.ok) return { skipped: true, externalId };

  const lines = String(session.metadata?.items || "").split(",").filter(Boolean);
  const items = [];
  for (const line of lines) {
    const [id, size, qtyRaw] = line.split(":");
    const p = findProduct(id);
    const variant = p?.supplier.variants[size];
    if (!p || !Number.isInteger(variant)) throw new Error(`Onbekend product of maat in bestelling: ${line}`);
    items.push({
      variant_id: variant,
      quantity: Number(qtyRaw),
      name: `${p.name.nl}${p.sizes.length > 1 ? ` ${size}` : ""}`,
      files: p.supplier.files.map((f) => ({ type: f.type, url: `${SITE_URL}${f.path}` })),
      ...(p.supplier.options?.length ? { options: p.supplier.options } : {}),
    });
  }
  if (items.length === 0) throw new Error("Bestelling zonder regels");

  const ship = session.shipping_details || session.collected_information?.shipping_details || {};
  const addr = ship.address || {};
  const cust = session.customer_details || {};
  const recipient = {
    name: ship.name || cust.name || "Klant",
    address1: addr.line1,
    ...(addr.line2 ? { address2: addr.line2 } : {}),
    city: addr.city,
    country_code: addr.country,
    zip: addr.postal_code,
    ...(STATE_COUNTRIES.includes(addr.country) && addr.state ? { state_code: addr.state } : {}),
    ...(cust.phone ? { phone: cust.phone } : {}),
    ...(cust.email ? { email: cust.email } : {}),
  };

  const confirm = process.env.PRINTFUL_AUTO_CONFIRM === "true";
  const created = await printful("POST", `/orders?confirm=${confirm ? "true" : "false"}`, { external_id: externalId, recipient, items });
  if (!created.ok) throw new Error(`Printful order mislukt (${created.status}): ${JSON.stringify(created.data).slice(0, 500)}`);

  await notify(
    confirm ? "Nieuwe Vivace merch-bestelling" : "Nieuwe Vivace merch-bestelling (concept, nog bevestigen in Printful)",
    `${recipient.name}, ${recipient.city} (${recipient.country_code})\n${lines.join(", ")}\nStripe: ${session.id}\nPrintful: ${externalId}`
  );
  return { created: true, externalId };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const raw = await readRawBody(req);
  if (!verifyStripeSignature(raw, req.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET)) {
    return res.status(400).json({ error: "Ongeldige handtekening" });
  }
  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return res.status(400).json({ error: "Ongeldige payload" });
  }
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    if (session.payment_status !== "paid") return res.status(200).json({ received: true, waiting: true });
    try {
      const result = await fulfill(session);
      return res.status(200).json({ received: true, ...result });
    } catch (e) {
      // 500 = Stripe probeert het automatisch opnieuw; jij krijgt een melding.
      await notify("Vivace merch: bestelling NIET doorgezet", `Sessie ${session.id}\n${e.message}\nBetaald, maar nog niet bij de leverancier. Stripe probeert het opnieuw.`);
      return res.status(500).json({ error: "Fulfillment mislukt" });
    }
  }
  return res.status(200).json({ received: true });
}
