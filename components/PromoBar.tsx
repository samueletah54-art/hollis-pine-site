"use client";

import { BIZ } from "@/data/business";
import { PROMO } from "@/lib/promo";
import { usePromo } from "./usePromo";

/** The strip above the header. Cranberry is for sale and urgency, and this is both. */
export default function PromoBar() {
  const p = usePromo();
  return (
    <div className="bg-cranberry text-cream">
      <p className="mx-auto max-w-[88rem] px-5 md:px-10 py-2 text-sm leading-snug">
        {p.state === "live" ? (
          <>
            <b className="font-semibold">{PROMO.name}: {p.percent}% off every tree, {p.singleDay ? "today only" : `through ${p.endLabel}`}.</b>{" "}
            Order by {BIZ.orderBy} for delivery before Christmas.
          </>
        ) : p.state === "soon" ? (
          <>
            <b className="font-semibold">{PROMO.name}: {p.percent}% off every tree, {p.singleDay ? `${p.startLabel} only` : `from ${p.startLabel}`}.</b>{" "}
            Order by {BIZ.orderBy} for delivery before Christmas.
          </>
        ) : (
          <>
            <b className="font-semibold">Order by {BIZ.orderBy} for delivery before Christmas.</b>{" "}
            Live trees ship {BIZ.liveShipDays}, so they never wait in a warehouse over a weekend.
          </>
        )}
      </p>
    </div>
  );
}
