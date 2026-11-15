import { NextResponse } from "next/server";
import Stripe from "stripe";
import { priceLines, shipping, subtotal, type CartLine } from "@/lib/pricing";
import { SITE } from "@/lib/site";

// Prices are ALWAYS recomputed on the server from /data/products.ts. The browser's cart is never trusted.
export async function POST(req: Request) {
  let b: { lines?: CartLine[]; email?: string; note?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }

  const lines = Array.isArray(b.lines) ? b.lines.slice(0, 40) : [];
  const priced = priceLines(lines);
  if (!priced.length) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  const email = typeof b.email === "string" && /^\S+@\S+\.\S+$/.test(b.email) ? b.email : undefined;
  if (!email) return NextResponse.json({ error: "Please enter a valid email." }, { status: 422 });
  const note = typeof b.note === "string" ? b.note.slice(0, 300) : "";

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    // Demo mode: no key configured, so no payment is taken.
    console.log("[checkout demo]", { email, note, total: subtotal(priced) + shipping(priced) });
    return NextResponse.json({ url: "/checkout/success?demo=1" });
  }

  const stripe = new Stripe(key);
  const ship = shipping(priced);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: priced.map((x) => ({
        quantity: x.line.qty,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(x.unit * 100),
          product_data: { name: x.name, description: [x.sizeLabel, x.optionLabel].filter(Boolean).join(" · ") },
        },
      })),
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [{ shipping_rate_data: { type: "fixed_amount", fixed_amount: { amount: ship * 100, currency: "usd" }, display_name: ship === 0 ? "Free shipping" : "Shipping" } }],
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "1" },
      metadata: { note, cart: JSON.stringify(priced.map((x) => `${x.line.slug}:${x.line.sizeId}:${x.line.option ?? ""}:${x.line.qty}`)).slice(0, 480) },
      success_url: `${SITE.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/cart`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("stripe error", e);
    return NextResponse.json({ error: "We couldn't reach the payment page. Please try again." }, { status: 502 });
  }
}
