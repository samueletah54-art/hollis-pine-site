"use client";

import type { Category } from "@/data/products";
import { money } from "@/lib/catalog";
import { PROMO, salePrice } from "@/lib/promo";
import { usePromo } from "./usePromo";

/** A price that shows the Black Friday price, with the old one struck through, while the offer is on. */
export default function Price({ value, category, className = "", from = false }: { value: number; category: Category; className?: string; from?: boolean }) {
  const promo = usePromo();
  const sale = promo.state === "live" ? salePrice(value, category) : value;
  const on = sale < value;
  return (
    <span className={`num ${className}`}>
      {from && <span className="text-muted text-xs mr-1">from</span>}
      {on ? (
        <>
          <s className="text-muted mr-1.5" aria-label={`was ${money(value)}`}>{money(value)}</s>
          <b className="font-semibold text-sale">{money(sale)}</b>
          <span className="sr-only"> with the {PROMO.name} offer</span>
        </>
      ) : money(value)}
    </span>
  );
}
