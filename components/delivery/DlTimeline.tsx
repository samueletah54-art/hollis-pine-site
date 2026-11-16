"use client";

import { useState } from "react";
import { estimate, fmt } from "@/lib/delivery";

const steps = [
  ["Mon", "Cut", "Cut to order on the days we ship, not weeks before."],
  ["Mon–Wed", "Wrapped and shipped", "Netted, boxed and handed to the carrier the same day."],
  ["1–5 days", "On the road", "Transit depends on how far you are from the farm."],
  ["Door", "At your door", "Saw a half inch off the base and stand it in water."],
];

/** The week a tree goes through, plus a ZIP box that works out when it will reach you. */
export default function DlTimeline() {
  const [zip, setZip] = useState("");
  const est = /^\d{5}$/.test(zip) ? estimate(zip, "North Carolina", true) : null;
  return (
    <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12">
      <div className="lg:col-span-7">
        <p className="dl-eyebrow text-[var(--dl-gold)]">From the farm to your door</p>
        <h2 className="serif-dl mt-3 text-[2rem] md:text-[3rem] leading-[1.08]">Your tree's week</h2>
        <ol className="mt-10 grid gap-0">
          {steps.map(([when, title, text], i) => (
            <li key={title} className="grid grid-cols-[4.5rem_1fr] md:grid-cols-[6rem_1fr] gap-x-5 border-t border-[var(--dl-cream)]/25 py-5">
              <span className="serif-dl text-[2.25rem] md:text-[3rem] leading-none text-[var(--dl-gold)] num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[.8125rem] tracking-[.14em] uppercase text-[var(--dl-cream)]/70">{when}</p>
                <h3 className="serif-dl text-[1.5rem] md:text-[1.75rem] leading-snug">{title}</h3>
                <p className="mt-1 text-[var(--dl-cream)]/85 max-w-[46ch]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="lg:col-span-5 lg:pt-16">
        <div className="border border-[var(--dl-gold)]/60 p-6 md:p-8">
          <label htmlFor="dl-zip" className="dl-label">When would it arrive? Your ZIP code</label>
          <input id="dl-zip" inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder="e.g. 49503" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} className="dl-field mt-2 num text-[1.5rem]" />
          <div className="mt-6 min-h-[7.5rem]" aria-live="polite">
            {est ? (
              <>
                <p className="text-[.9375rem] text-[var(--dl-cream)]/75">If you order today</p>
                <p className="serif-dl text-[1.75rem] leading-tight mt-1">Ships {fmt(est.ships)}</p>
                <p className="serif-dl text-[1.75rem] leading-tight text-[var(--dl-gold)]">Arrives {fmt(est.arriveFrom)}{est.arriveTo.getTime() !== est.arriveFrom.getTime() ? ` to ${fmt(est.arriveTo)}` : ""}</p>
                <p className="mt-3 text-[.875rem] text-[var(--dl-cream)]/70">An estimate. The carrier confirms the date when it ships.</p>
              </>
            ) : (
              <p className="text-[var(--dl-cream)]/80">Enter a five-digit ZIP code and we'll work out the ship day and the arrival window.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
