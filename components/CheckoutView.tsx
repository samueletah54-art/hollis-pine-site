"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { money } from "@/lib/catalog";
import { pastOrderBy } from "@/lib/delivery";

export default function CheckoutView() {
  const { priced, lines, subtotal, shipping, ready } = useCart();
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!ready) return <p className="py-16 text-muted">One moment…</p>;
  if (!priced.length) return (
    <div className="py-16 max-w-md"><p className="serif text-4xl">Nothing to check out.</p><Link href="/shop" className="btn btn-primary mt-6">Browse the trees</Link></div>
  );

  const hasLive = priced.some((x) => x.category === "live" || x.category === "addon");

  return (
    <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10 mt-8">
      <form className="lg:col-span-7 grid gap-8" onSubmit={async (e) => {
        e.preventDefault(); setBusy(true); setErr("");
        try {
          const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lines, email, note }) });
          const j = await r.json();
          if (!r.ok || !j.url) throw new Error(j.error || "Checkout failed");
          window.location.href = j.url;
        } catch (e2) { setErr(e2 instanceof Error ? e2.message : "Checkout failed"); setBusy(false); }
      }}>
        <div>
          <h2 className="label text-berry mb-3">1. Contact</h2>
          <label htmlFor="co-email" className="label block mb-1">Email for your receipt and tracking</label>
          <input id="co-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
        </div>
        <div>
          <h2 className="label text-berry mb-3">2. Delivery</h2>
          <p className="text-[.95rem] text-ink/85 max-w-[52ch]">You'll enter your shipping address on the next screen. We ship to the 48 contiguous states. Live items ship Monday through Wednesday.</p>
          {pastOrderBy() && <p className="text-berry mt-3">Our Dec 12 order-by date has passed. Call (555) 010-0142 before ordering and we'll tell you if it can still arrive by Christmas.</p>}
          <label htmlFor="co-note" className="label block mt-6 mb-1">Delivery note or gift message (optional)</label>
          <textarea id="co-note" rows={3} maxLength={300} value={note} onChange={(e) => setNote(e.target.value)} className="field resize-y" placeholder={hasLive ? "Preferred week, gate code, a message for the card." : "Anything we should know."} />
        </div>
        <div>
          <h2 className="label text-berry mb-3">3. Pay</h2>
          <p className="text-[.95rem] text-ink/85 max-w-[52ch]">Payment happens on Stripe's secure page. We never see your card number. Sales tax is added there where it applies.</p>
          <button className="btn btn-primary mt-6 w-full sm:w-auto" disabled={busy}>{busy ? "Taking you to Stripe…" : `Continue to payment · ${money(subtotal + shipping)}`}</button>
          {err && <p role="alert" className="mt-4 text-berry">{err}</p>}
        </div>
      </form>

      <aside className="lg:col-span-5 border border-ink p-6 lg:sticky lg:top-28 lg:self-start" aria-label="Order summary">
        <h2 className="label text-berry">Your order</h2>
        <ul className="mt-4 divide-y rule">
          {priced.map((x) => (
            <li key={`${x.line.slug}-${x.line.sizeId}-${x.line.option ?? ""}`} className="py-3 flex justify-between gap-4">
              <span>{x.name} <span className="text-muted">· {x.sizeLabel}{x.optionLabel ? ` · ${x.optionLabel}` : ""} × {x.line.qty}</span></span>
              <span className="num">{money(x.total)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 num space-y-1 border-t border-ink pt-4">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : money(shipping)}</dd></div>
          <div className="flex justify-between text-sm text-muted"><dt>Sales tax</dt><dd>On the next screen</dd></div>
        </dl>
        <p className="text-sm mt-4"><Link href="/cart" className="underline underline-offset-4">Back to cart</Link></p>
      </aside>
    </div>
  );
}
