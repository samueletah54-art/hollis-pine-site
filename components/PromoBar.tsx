"use client";

import { promoMessage } from "@/lib/promo";
import { usePromo } from "./usePromo";

/** The strip above the header. Cranberry is for sale and urgency. Renders nothing when there is no offer, so it disappears by itself after the end date. */
export default function PromoBar() {
  const msg = promoMessage(usePromo());
  if (!msg) return null;
  return (
    <div className="bg-cranberry text-cream" role="region" aria-label="Offer">
      <p className="mx-auto max-w-[88rem] px-5 md:px-10 py-2 text-sm leading-snug font-semibold">{msg}</p>
    </div>
  );
}
