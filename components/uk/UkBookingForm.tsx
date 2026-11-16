"use client";

import { useEffect, useState } from "react";
import { UK, gbp } from "@/data/uk";

/** Booking request. It emails the shop through /api/contact; dates are agreed by email afterwards. No payment is taken here. */
export default function UkBookingForm() {
  const [tree, setTree] = useState<string>(UK.trees[1].id);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const on = (e: Event) => setTree(String((e as CustomEvent).detail));
    window.addEventListener("uk-pick-tree", on);
    return () => window.removeEventListener("uk-pick-tree", on);
  }, []);

  if (state === "done")
    return (
      <div role="status" className="py-8">
        <h3 className="serif-uk text-4xl">Thank you. We have your request.</h3>
        <p className="mt-4 max-w-[44ch]">We'll email you to confirm your delivery and collection dates. You won't be charged until then.</p>
      </div>
    );

  return (
    <form
      className="grid gap-x-8 gap-y-5 md:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
        const t = UK.trees.find((x) => x.id === f.tree);
        const message = `LONDON DELIVERY BOOKING\nTree: ${t?.name} (${t ? gbp(t.price) : ""})\nPostcode: ${f.postcode}\nPhone: ${f.phone}\nStand: ${f.stand ? "yes" : "no"}\nMarketing OK: ${f.marketing ? "yes" : "no"}`;
        try {
          const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, email: f.email, topic: "London delivery booking", message, website: f.website }) });
          setState(r.ok ? "done" : "error");
        } catch { setState("error"); }
      }}
    >
      <div className="md:pr-8">
        <h2 className="serif-uk text-[2rem] md:text-[2.75rem] leading-[1.1]">Ready to book your tree delivery?</h2>
        <p className="mt-5 text-lg max-w-[40ch]">Pick your size and tell us where it's going. We'll confirm your delivery and collection dates by email.</p>
        <div className="mt-8">
          <label htmlFor="b-tree" className="uk-label">Pick your tree*</label>
          <select id="b-tree" name="tree" required value={tree} onChange={(e) => setTree(e.target.value)} className="uk-field">
            {UK.trees.map((t) => <option key={t.id} value={t.id}>{t.name} ({gbp(t.price)})</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-5 content-start mt-5 md:mt-0">
        <div><label htmlFor="b-name" className="uk-label">Full name*</label><input id="b-name" name="name" required autoComplete="name" className="uk-field" /></div>
        <div><label htmlFor="b-email" className="uk-label">Email*</label><input id="b-email" name="email" type="email" required autoComplete="email" className="uk-field" /></div>
        <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
          <div><label htmlFor="b-phone" className="uk-label">Phone number*</label><input id="b-phone" name="phone" type="tel" required autoComplete="tel" className="uk-field" /></div>
          <div><label htmlFor="b-post" className="uk-label">Postcode*</label><input id="b-post" name="postcode" required autoComplete="postal-code" placeholder="e.g. W9 2EW" className="uk-field" /></div>
        </div>
        <label className="flex items-start gap-3 min-h-11"><input type="checkbox" name="stand" className="uk-check" /> <span>Include a stand</span></label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button className="uk-btn uk-btn-green w-full" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Book a delivery"}</button>
        {state === "error" && <p role="alert" className="text-[#a32638] font-medium">That didn't send. Please call or email us instead.</p>}
        <label className="flex items-start gap-3 text-[.9375rem]"><input type="checkbox" name="marketing" className="uk-check" /> <span>I agree to receive marketing information from Hollis &amp; Pine by phone and email.</span></label>
      </div>
    </form>
  );
}
