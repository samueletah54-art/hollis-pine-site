"use client";

import { useEffect, useState } from "react";
import { promoState, type PromoState } from "@/lib/promo";

const OFF: PromoState = { state: "off", percent: 0, startLabel: "", endLabel: "", singleDay: false };

/** The offer depends on today's date, so it is worked out in the browser after the page loads. */
export function usePromo(): PromoState {
  const [s, setS] = useState<PromoState>(OFF);
  useEffect(() => { setS(promoState(new Date())); }, []);
  return s;
}
