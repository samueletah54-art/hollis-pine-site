"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { US_STATES } from "@/lib/states";

const heights = ["9", "12", "15", "20", "25", "30"];

export default function QuoteForm() {
  const sp = useSearchParams();
  const pre = sp.get("height");
  const preKind = sp.get("product")?.includes("artificial") ? "artificial" : sp.get("product") ? "live" : "";
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  if (state === "done") {
    return (
      <div role="status" className="border border-paper/40 p-8">
        <p className="serif text-4xl">Got it.</p>
        <p className="mt-3 text-paper/85 max-w-[40ch]">A person will email you within one business day with pricing and a date for a site visit if you need one.</p>
      </div>
    );
  }

  const L = ({ id, children, req }: { id: string; children: React.ReactNode; req?: boolean }) => (<label htmlFor={id} className="label block mb-1">{children}{req && <span aria-hidden> *</span>}</label>);

  return (
    <form
      className="grid sm:grid-cols-2 gap-x-8 gap-y-7 on-dark"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending"); setErr("");
        const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
        try {
          const r = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fd) });
          if (r.ok) setState("done");
          else { const j = await r.json().catch(() => ({})); setErr(j.error ?? "Something went wrong."); setState("error"); }
        } catch { setErr("No connection. Try again?"); setState("error"); }
      }}
    >
      <div><L id="company" req>Company or organization</L><input id="company" name="company" required autoComplete="organization" className="field" /></div>
      <div><L id="name" req>Your name</L><input id="name" name="name" required autoComplete="name" className="field" /></div>
      <div><L id="email" req>Email</L><input id="email" name="email" type="email" required autoComplete="email" className="field" /></div>
      <div><L id="phone">Phone</L><input id="phone" name="phone" type="tel" autoComplete="tel" className="field" /></div>
      <div>
        <L id="state" req>State where it goes</L>
        <select id="state" name="state" required defaultValue="" className="field [&>option]:text-ink">
          <option value="" disabled>Select a state</option>
          {US_STATES.map((s) => (<option key={s}>{s}</option>))}
        </select>
      </div>
      <div>
        <L id="height" req>Tree height</L>
        <select id="height" name="height" required defaultValue={pre && heights.includes(pre) ? pre : ""} className="field [&>option]:text-ink">
          <option value="" disabled>Select a height</option>
          {heights.map((h) => (<option key={h} value={h}>{h} ft</option>))}
        </select>
      </div>
      <div><L id="quantity" req>Quantity</L><input id="quantity" name="quantity" type="number" min={1} max={200} defaultValue={1} required className="field num" /></div>
      <div>
        <L id="kind">Live or artificial</L>
        <select id="kind" name="kind" defaultValue={preKind} className="field [&>option]:text-ink">
          <option value="">Not sure yet</option><option value="live">Live-cut</option><option value="artificial">Commercial artificial</option>
        </select>
      </div>
      <div><L id="installDate" req>Install date</L><input id="installDate" name="installDate" type="date" required className="field [color-scheme:dark]" /></div>
      <div>
        <L id="budget">Budget range</L>
        <select id="budget" name="budget" defaultValue="" className="field [&>option]:text-ink">
          <option value="">Not sure yet</option><option>Under $2,500</option><option>$2,500 – $7,500</option><option>$7,500 – $20,000</option><option>$20,000+</option>
        </select>
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="label mb-2">What do you need us to do?</legend>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {[["delivery", "Delivery only"], ["install", "Delivery + install"], ["install-takedown", "Install + takedown"]].map(([v, l]) => (
            <label key={v} className="flex items-center gap-2"><input type="radio" name="service" value={v} defaultChecked={v === "install-takedown"} className="accent-[#b08a3e]" />{l}</label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2"><L id="notes">Notes</L><textarea id="notes" name="notes" rows={3} className="field resize-y" placeholder="Loading dock, lift access, ceiling height, anything that matters." /></div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="sm:col-span-2 flex flex-wrap items-center gap-6">
        <button className="btn btn-brass" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send quote request"}</button>
        {state === "error" && <p role="alert" className="text-brass">{err}</p>}
        <p className="text-sm text-paper/65">We reply within one business day.</p>
      </div>
    </form>
  );
}
