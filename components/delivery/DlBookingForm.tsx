"use client";

import { useState } from "react";
import { money } from "@/lib/catalog";
import type { Product } from "@/data/products";

/** Order request. It emails the shop through /api/contact; no payment is taken here. Prices shown are before any sale. */
export default function DlBookingForm({ trees }: { trees: Product[] }) {
  const [slug, setSlug] = useState(trees[0].slug);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const tree = trees.find((t) => t.slug === slug) ?? trees[0];

  if (state === "done")
    return (
      <div role="status" className="py-8">
        <h3 className="serif-dl text-4xl">Thank you. We have your request.</h3>
        <p className="mt-4 max-w-[44ch]">We'll email you to confirm the tree and the week it ships. You won't be charged until then.</p>
      </div>
    );

  return (
    <form
      className="grid gap-x-8 gap-y-5 md:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
        const size = tree.sizes.find((s) => s.id === f.size);
        const message = `ORDER REQUEST\nTree: ${tree.name}, ${size?.label ?? "-"} (${size?.price != null ? money(size.price) : "-"})\nDelivery ZIP: ${f.zip}\nPhone: ${f.phone}\nStand: ${f.stand ? "yes" : "no"}\nMarketing OK: ${f.marketing ? "yes" : "no"}`;
        try {
          const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, email: f.email, topic: "Order request", message, website: f.website }) });
          setState(r.ok ? "done" : "error");
        } catch { setState("error"); }
      }}
    >
      <div className="md:pr-8">
        <h2 className="serif-dl text-[2rem] md:text-[2.75rem] leading-[1.1]">Ready to order your tree?</h2>
        <p className="mt-5 text-lg max-w-[40ch]">Pick your tree and size and tell us where it's going. We'll confirm the price and the week it ships by email.</p>
        <div className="mt-8 grid gap-5">
          <div>
            <label htmlFor="b-tree" className="dl-label">Pick your tree*</label>
            <select id="b-tree" required value={slug} onChange={(e) => setSlug(e.target.value)} className="dl-field">
              {trees.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="b-size" className="dl-label">Height*</label>
            <select id="b-size" name="size" required key={tree.slug} defaultValue={tree.sizes[1]?.id ?? tree.sizes[0].id} className="dl-field">
              {tree.sizes.map((s) => <option key={s.id} value={s.id}>{s.label}{s.price != null ? ` (${money(s.price)})` : ""}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="grid gap-5 content-start mt-5 md:mt-0">
        <div><label htmlFor="b-name" className="dl-label">Full name*</label><input id="b-name" name="name" required autoComplete="name" className="dl-field" /></div>
        <div><label htmlFor="b-email" className="dl-label">Email*</label><input id="b-email" name="email" type="email" required autoComplete="email" className="dl-field" /></div>
        <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
          <div><label htmlFor="b-phone" className="dl-label">Phone number*</label><input id="b-phone" name="phone" type="tel" required autoComplete="tel" className="dl-field" /></div>
          <div><label htmlFor="b-zip" className="dl-label">ZIP code*</label><input id="b-zip" name="zip" required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" placeholder="e.g. 49503" className="dl-field" /></div>
        </div>
        <label className="flex items-start gap-3 min-h-11"><input type="checkbox" name="stand" className="dl-check" /> <span>Include a stand</span></label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button className="dl-btn dl-btn-green w-full" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send my order request"}</button>
        {state === "error" && <p role="alert" className="text-[#a32638] font-medium">That didn't send. Please call or email us instead.</p>}
        <label className="flex items-start gap-3 text-[.9375rem]"><input type="checkbox" name="marketing" className="dl-check" /> <span>I agree to receive marketing information from Hollis &amp; Pine by phone and email.</span></label>
      </div>
    </form>
  );
}
