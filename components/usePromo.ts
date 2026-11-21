"use client";

import type { PromoState } from "@/lib/promo";
import { usePromoState } from "./PromoProvider";

/** The current offer state (off, soon or live). Comes from <PromoProvider>, which is seeded by the server. */
export function usePromo(): PromoState {
  return usePromoState();
}
