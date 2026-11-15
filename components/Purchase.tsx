"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { money } from "@/lib/catalog";
import { estimate, fmt, pastOrderBy } from "@/lib/delivery";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";

export default function Purchase({ p }: { p: Product }) {
  const { add } = useCart();
  const quote = p.stock === "quote";
  const [sizeId, setSizeId] = useState(p.sizes[0].id);
  const [optId, setOptId] = useState(p.option?.values[0].id);
  const [qty, setQty] = useState(1);
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState("");
  const [added, setAdded] = useState(false);

  const size = p.sizes.find((s) => s.id === sizeId)!;
  const live = p.category === "live" || (p.category === "addon" && p.addonKind === "wreath") || (p.category === "addon" && p.addonKind === "garland");

  const est = useMemo(() => (checked ? estimate(checked, p.shipsFrom, live) : null), [checked, p.shipsFrom, live]);
  const zipOk = /^\d{5}$/.test(zip);

  if (quote) {
    return (
      <div>
        <p className="label text-muted">Size</p>
        <div role="radiogroup" aria-label="Height" className="mt-2 flex flex-wrap gap-2">
          {p.sizes.map((s) => (
            <button key={s.id} role="radio" aria-checked={s.id === sizeId} onClick={() => setSizeId(s.id)} className={`px-4 py-2 border num ${s.id === sizeId ? "bg-ink text-paper border-ink" : "border-ink/40 hover:border-ink"}`}>{s.label}</button>
          ))}
        </div>
        <p className="serif text-4xl mt-8">Request pricing</p>
        <p className="mt-2 text-ink/80 max-w-[44ch]">Pricing depends on height, delivery location, and whether you want install and takedown. Most quotes come back within one business day.</p>
        <Link href={`/business?height=${size.id}&product=${p.slug}#quote`} className="btn btn-primary mt-6 w-full sm:w-auto">Request a quote for {size.label}</Link>
        <p className="text-sm text-muted mt-4">Net-30 terms for approved business accounts. Delivery 2–3 weeks from order, longer for 25 ft and up.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="serif text-5xl num leading-none">{money(size.price!)}</p>
      <p className="text-sm text-muted mt-2">{size.dims ?? " "}</p>

      <fieldset className="mt-8">
        <legend className="label text-muted">{p.category === "addon" ? "Option" : "Height"}</legend>
        <div role="radiogroup" className="mt-2 flex flex-wrap gap-2">
          {p.sizes.map((s) => (
            <button key={s.id} type="button" role="radio" aria-checked={s.id === sizeId} onClick={() => setSizeId(s.id)}
              className={`px-4 py-2 border text-left ${s.id === sizeId ? "bg-ink text-paper border-ink" : "border-ink/40 hover:border-ink"}`}>
              <span className="block">{s.label}</span>
              <span className="num text-xs opacity-75">{money(s.price!)}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {p.option && (
        <fieldset className="mt-6">
          <legend className="label text-muted">{p.option.name}</legend>
          <div role="radiogroup" className="mt-2 flex flex-wrap gap-2">
            {p.option.values.map((v) => (
              <button key={v.id} type="button" role="radio" aria-checked={v.id === optId} onClick={() => setOptId(v.id)}
                className={`px-4 py-2 border ${v.id === optId ? "bg-ink text-paper border-ink" : "border-ink/40 hover:border-ink"}`}>{v.label}</button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} label={p.name} />
        <button
          className="btn btn-primary flex-1 min-w-48"
          onClick={() => { add({ slug: p.slug, sizeId, option: optId, qty }); setAdded(true); setTimeout(() => setAdded(false), 1800); }}
        >
          {added ? "Added" : `Add to cart · ${money(size.price! * qty)}`}
        </button>
      </div>
      {p.stock === "low" && <p className="text-sm text-berry mt-3">Only a few left this season.</p>}

      <form className="mt-10 border-t rule pt-6" onSubmit={(e) => { e.preventDefault(); if (zipOk) setChecked(zip); }}>
        <label htmlFor="zip" className="label text-muted">When would it get to me?</label>
        <div className="mt-2 flex items-end gap-4">
          <input id="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="ZIP code" value={zip} onChange={(e) => { setZip(e.target.value.replace(/\D/g, "")); setChecked(""); }} className="field max-w-40 num" />
          <button className="btn btn-ghost" disabled={!zipOk}>Check</button>
        </div>
        <div aria-live="polite" className="mt-3 text-[.95rem]">
          {checked && est && (
            <>
              <p>Ships <b>{fmt(est.ships)}</b> from {p.shipsFrom}. Arrives <b>{fmt(est.arriveFrom)}</b>{est.arriveFrom.getTime() !== est.arriveTo.getTime() ? <> to <b>{fmt(est.arriveTo)}</b></> : null}.</p>
              {live && <p className="text-muted text-sm mt-1">Live items only ship Monday to Wednesday.</p>}
              {pastOrderBy() && <p className="text-berry text-sm mt-1">Our Dec 12 order-by date has passed. Call us and we'll tell you if we can still make it.</p>}
            </>
          )}
          {checked && !est && <p className="text-berry">That doesn't look like a U.S. ZIP code.</p>}
        </div>
      </form>
    </div>
  );
}
