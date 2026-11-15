"use client";

import Link from "next/link";
import { PROMO } from "@/lib/promo";
import { usePromo } from "./usePromo";

/** A price-tag stamp pinned to the hero photo while the offer is on, or about to start. */
export default function PromoStamp() {
  const p = usePromo();
  if (p.state === "off") return null;
  return (
    <Link href="/shop?type=live" className="absolute -top-4 -left-2 md:-left-8 z-10 -rotate-6 bg-cranberry text-paper px-5 py-3 border-2 border-paper outline outline-2 outline-cranberry text-center hover:rotate-0 transition-transform">
      <span className="label block text-paper/90">{PROMO.name}</span>
      <span className="serif text-4xl block leading-none num">{p.percent}% off</span>
      <span className="text-xs block mt-1">{p.state === "live" ? `through ${p.endLabel}` : `from ${p.startLabel}`}</span>
    </Link>
  );
}
