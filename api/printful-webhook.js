// Ontvangt berichten van Printful (verzonden, mislukt, geannuleerd, retour) en mailt de klant of jou.
import crypto from "node:crypto";
import { sendEmail, notify } from "./_lib.js";

const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function tokenOk(given) {
  const expected = process.env.PRINTFUL_WEBHOOK_SECRET || "";
  const g = String(given || "");
  return expected.length >= 16 && g.length === expected.length && crypto.timingSafeEqual(Buffer.from(g), Buffer.from(expected));
}

export function shippedMail(order, shipment) {
  const first = String(order?.recipient?.name || "").trim().split(/\s+/)[0] || "";
  const url = shipment?.tracking_url || "";
  const nr = shipment?.tracking_number || "";
  const carrier = shipment?.carrier || "";
  const hello = first ? `Hoi ${first},` : "Hoi,";
  const text = [
    hello,
    "",
    "Je Vivace-bestelling is onderweg.",
    carrier || nr ? `Vervoerder: ${[carrier, nr].filter(Boolean).join(" · ")}` : null,
    url ? `Volg je pakket: ${url}` : "Een trackinglink volgt zodra de vervoerder die activeert.",
    "",
    "Vragen? Mail ons via drinkvivace@gmail.com.",
    "",
    "Drink anders. Geniet anders.",
    "VIVACE",
  ].filter((l) => l !== null).join("\n");
  const html = `<div style="background:#0a1628;padding:32px 16px;font-family:Georgia,serif;color:#f5eede">
<div style="max-width:520px;margin:0 auto;text-align:center">
<p style="letter-spacing:6px;color:#d4af37;font-size:24px;margin:0 0 28px">VIVACE</p>
<p style="font-size:20px;margin:0 0 16px">${esc(hello)}</p>
<p style="font-size:16px;line-height:1.6;margin:0 0 20px">Je bestelling is onderweg.</p>
${carrier || nr ? `<p style="font-size:14px;color:#c9d2df;margin:0 0 20px">${esc([carrier, nr].filter(Boolean).join(" · "))}</p>` : ""}
${url ? `<p style="margin:0 0 28px"><a href="${esc(url)}" style="display:inline-block;border:1px solid #d4af37;color:#d4af37;padding:12px 28px;text-decoration:none;letter-spacing:3px;font-size:12px">VOLG JE PAKKET</a></p>` : ""}
<p style="font-size:13px;color:#9fb0c6;margin:0 0 6px">Vragen? Mail ons via drinkvivace@gmail.com.</p>
<p style="font-size:13px;color:#d4af37;font-style:italic;margin:24px 0 0">Drink anders. Geniet anders.</p>
</div></div>`;
  return { subject: "Je Vivace-bestelling is onderweg", text, html };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!tokenOk(req.query?.token)) return res.status(404).json({ error: "Not found" });
  let body = req.body;
  try {
    if (typeof body === "string") body = JSON.parse(body || "{}");
  } catch {
    return res.status(400).json({ error: "Ongeldige payload" });
  }
  const type = body?.type;
  const order = body?.data?.order || {};
  const ref = `Printful ${order.id ?? "?"} (extern ${order.external_id ?? "?"})`;
  try {
    if (type === "package_shipped") {
      const shipment = body?.data?.shipment || {};
      const email = order?.recipient?.email;
      const mail = shippedMail(order, shipment);
      if (!email) {
        await notify("Vivace merch: verzonden, maar geen klant-e-mail", `${ref}\nTracking: ${shipment.tracking_url || shipment.tracking_number || "onbekend"}`);
      } else {
        const r = await sendEmail({ to: email, replyTo: process.env.OWNER_EMAIL, ...mail });
        if (!r.ok) {
          await notify(
            "Vivace merch: verzendmail naar klant niet verstuurd",
            `${ref}\nKlant: ${email}\nTracking: ${shipment.tracking_url || shipment.tracking_number || "onbekend"}\nReden: ${r.status} ${JSON.stringify(r.data)}\nStuur de tracking zelf door of verifieer je domein bij Resend.`
          );
        }
      }
    } else if (["order_failed", "order_canceled", "package_returned"].includes(type)) {
      await notify(`Vivace merch: ${type}`, `${ref}\nStatus: ${order.status || "-"}\nFout: ${order.error || "-"}\nControleer de bestelling in Printful.`);
    }
  } catch (e) {
    console.error("printful-webhook", e);
    await notify("Vivace merch: fout bij verwerken Printful-bericht", `${type}\n${e.message}`);
  }
  return res.status(200).json({ received: true });
}
