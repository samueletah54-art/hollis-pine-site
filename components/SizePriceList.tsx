"use client";

import { useState } from "react";
import { bySlug } from "@/lib/catalog";
import { useCart } from "./CartProvider";
import Price from "./Price";

/** The printed price list: one row per height, with the ceiling it needs and an "Add to order" button. Fraser fir prices. */
export default function SizePriceList() {
  const p = bySlug("fraser-fir")!;
  const { add } = useCart();
  const [done, setDone] = useState<string | null>(null);
  return (
    <div>
      <ul className="border-t-[3px] border-double border-bark/60">
        {p.sizes.map((s) => (
          <li key={s.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[7rem_1fr_auto_auto] items-center gap-x-6 gap-y-1 py-5 border-b rule">
            <span className="serif text-3xl num col-start-1 row-start-1">{s.label}</span>
            <span className="text-muted text-sm sm:text-base col-start-1 row-start-2 sm:col-start-2 sm:row-start-1">Needs a ceiling of {Math.ceil((s.heightMax ?? 0) + 1)} ft or more</span>
            <span className="text-xl justify-self-end col-start-2 row-start-1 sm:col-start-3"><Price value={s.price!} category={p.category} /></span>
            <button
              className="btn btn-ghost !py-2 !px-4 justify-self-end col-start-2 row-start-2 mt-2 sm:mt-0 sm:col-start-4 sm:row-start-1"
              onClick={() => { add({ slug: p.slug, sizeId: s.id, qty: 1 }); setDone(s.id); setTimeout(() => setDone(null), 1500); }}
              aria-label={`Add a ${s.label} Fraser fir to your order`}
            >
              {done === s.id ? "Added" : "Add to order"}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted max-w-[60ch]">These are Fraser fir prices, the tree we're asked for most. Other kinds start at $59. The shop lists every one.</p>
    </div>
  );
}
