"use client";

import { useState } from "react";
import { money } from "@/lib/catalog";
import { priceLines, shipping, subtotal } from "@/lib/pricing";
import type { Product } from "@/data/products";

/** Order request with a live summary. It emails the shop through /api/contact; no payment is taken here. */
export default function DlBookingForm({ trees }: { trees: Product[] }) {
  const [slug, setSlug] = useState(trees[0].slug);
  const tree = trees.find((t) => t.slug === slug) ?? trees[0];
  const [sizeId, setSizeId] = useState(tree.sizes[1]?.id ?? tree.sizes[0].id);
  const [stand, setStand] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const size = tree.sizes.find((s) => s.id === sizeId) ?? tree.sizes[0];
  const priced = priceLines([{ slug: tree.slug, sizeId: size.id, qty: 1 }]);
  const item = subtotal(priced);
  const ship = shipping(priced);
  const was = priced[0] ? priced[0].originalUnit : item;

  if (state === "done")
    return (
      <div role="status" className="py-8">
        <h3 className="serif-dl text-4xl">Thank you. We have your request.</h3>
        <p className="mt-4 max-w-[44ch]">We'll email you to confirm the tree and the week it ships. You won't be charged until then.</p>
      </div>
    );

  return (
    <form
      className="grid gap-x-14 gap-y-10 lg:grid-cols-12"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
        const message = `ORDER REQUEST\nTree: ${tree.name}, ${size.label} (${money(item)} + ${money(ship)} shipping)\nDelivery ZIP: ${f.zip}\nPhone: ${f.phone}\nStand: ${stand ? "yes" : "no"}\nMarketing OK: ${f.marketing ? "yes" : "no"}`;
        try {
          const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, email: f.email, topic: "Order request", message, website: f.website }) });
          setState(r.ok ? "done" : "error");
        } catch { setState("error"); }
      }}
    >
      <div className="lg:col-span-5">
        <p className="dl-eyebrow text-[var(--dl-bark)]">Your order</p>
        <h2 className="serif-dl mt-2 text-[2rem] md:text-[2.75rem] leading-[1.08]">Ready to order your tree?</h2>
        <div className="mt-8 grid gap-5">
          <div>
            <label htmlFor="b-tree" className="dl-label">Tree</label>
            <select id="b-tree" value={slug} onChange={(e) => { const t = trees.find((x) => x.slug === e.target.value)!; setSlug(t.slug); setSizeId(t.sizes[1]?.id ?? t.sizes[0].id); }} className="dl-field">
              {trees.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="b-size" className="dl-label">Height</label>
            <select id="b-size" value={sizeId} onChange={(e) => setSizeId(e.target.value)} className="dl-field">
              {tree.sizes.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <label className="flex items-start gap-3 min-h-11"><input type="checkbox" checked={stand} onChange={(e) => setStand(e.target.checked)} className="dl-check" /> <span>Add a stand. We'll quote it in our reply.</span></label>
        </div>
        <dl className="mt-8 border-t-4 border-double border-[var(--dl-bark)]/60 pt-4 num" aria-live="polite">
          <div className="flex justify-between py-1"><dt>{tree.name}, {size.label}</dt><dd>{was > item ? <><s className="text-[var(--dl-muted)] mr-2">{money(was)}</s>{money(item)}</> : money(item)}</dd></div>
          <div className="flex justify-between py-1"><dt>Shipping</dt><dd>{ship === 0 ? "Free" : money(ship)}</dd></div>
          <div className="flex justify-between py-2 mt-1 border-t border-[var(--dl-bark)]/40 serif-dl text-[1.5rem]"><dt>Estimated total</dt><dd>{money(item + ship)}</dd></div>
        </dl>
        <p className="mt-2 text-[.875rem] text-[var(--dl-muted)]">Nothing is charged here. We confirm the price and the ship week by email.</p>
      </div>
      <div className="lg:col-span-7 grid gap-5 content-start">
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label htmlFor="b-name" className="dl-label">Full name *</label><input id="b-name" name="name" required autoComplete="name" className="dl-field" /></div>
          <div><label htmlFor="b-email" className="dl-label">Email *</label><input id="b-email" name="email" type="email" required autoComplete="email" className="dl-field" /></div>
          <div><label htmlFor="b-phone" className="dl-label">Phone *</label><input id="b-phone" name="phone" type="tel" required autoComplete="tel" className="dl-field" /></div>
          <div><label htmlFor="b-zip" className="dl-label">Delivery ZIP code *</label><input id="b-zip" name="zip" required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" placeholder="e.g. 49503" className="dl-field num" /></div>
        </div>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div><button className="dl-btn dl-btn-green w-full sm:w-auto sm:min-w-[16rem]" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send my order request"}</button></div>
        {state === "error" && <p role="alert" className="text-[var(--dl-cran)] font-medium">That didn't send. Please call or email us instead.</p>}
        <label className="flex items-start gap-3 text-[.9375rem] text-[var(--dl-muted)]"><input type="checkbox" name="marketing" className="dl-check" /> <span>Email me order dates and care tips, once a month at most.</span></label>
      </div>
    </form>
  );
}
