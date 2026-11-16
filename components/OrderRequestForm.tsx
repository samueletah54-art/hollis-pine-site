"use client";

import { useState } from "react";

/** A plain order request: for people who would rather write than check out. It arrives as an email to the shop. */
export default function OrderRequestForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  if (state === "done")
    return (
      <div role="status">
        <p className="serif text-4xl">Thanks. We have it.</p>
        <p className="mt-3 max-w-[44ch]">We'll write back, usually the same day, to confirm the tree and the week it ships.</p>
      </div>
    );
  return (
    <form
      className="grid sm:grid-cols-2 gap-x-8 gap-y-7"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
        const message = `ORDER REQUEST\nTree: ${f.tree || "not sure"}\nDelivery ZIP: ${f.zip || "-"}\nPhone: ${f.phone || "-"}\n\n${f.notes || ""}`;
        try {
          const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, email: f.email, topic: "Order request", message, website: f.website }) });
          setState(r.ok ? "done" : "error");
        } catch { setState("error"); }
      }}
    >
      <div><label htmlFor="o-name" className="label block mb-1">Your name *</label><input id="o-name" name="name" required autoComplete="name" className="field" /></div>
      <div><label htmlFor="o-email" className="label block mb-1">Email *</label><input id="o-email" name="email" type="email" required autoComplete="email" className="field" /></div>
      <div><label htmlFor="o-phone" className="label block mb-1">Phone</label><input id="o-phone" name="phone" type="tel" autoComplete="tel" className="field" /></div>
      <div><label htmlFor="o-zip" className="label block mb-1">Delivery ZIP code</label><input id="o-zip" name="zip" inputMode="numeric" maxLength={5} autoComplete="postal-code" className="field num" /></div>
      <div className="sm:col-span-2">
        <label htmlFor="o-tree" className="label block mb-1">Which tree?</label>
        <select id="o-tree" name="tree" defaultValue="" className="field">
          <option value="">Not sure yet. Help me choose.</option>
          <option>5 to 6 ft</option><option>6 to 7 ft</option><option>7 to 8 ft</option><option>8 to 9 ft</option><option>Bigger, for a business</option>
        </select>
      </div>
      <div className="sm:col-span-2"><label htmlFor="o-notes" className="label block mb-1">Anything we should know</label><textarea id="o-notes" name="notes" rows={3} className="field resize-y" placeholder="The kind of tree, the week you want it, your ceiling height." /></div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="sm:col-span-2 flex flex-wrap items-center gap-6">
        <button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send my order request"}</button>
        {state === "error" && <p role="alert" className="text-cranberry">That didn't send. Please call or email us instead.</p>}
      </div>
    </form>
  );
}
