"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { promoState, type PromoState } from "@/lib/promo";

const Ctx = createContext<PromoState | null>(null);

/**
 * The server works out the offer state when the page is built (and rebuilds hourly), so the promo bar is in the HTML
 * from the first paint with no layout shift. The browser then re-checks the clock, so a stale page hides the offer the
 * moment it ends.
 */
export function PromoProvider({ initial, children }: { initial: PromoState; children: React.ReactNode }) {
  const [s, setS] = useState(initial);
  useEffect(() => {
    const check = () => setS((cur) => { const n = promoState(new Date()); return n.state === cur.state ? cur : n; });
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return <Ctx.Provider value={s}>{children}</Ctx.Provider>;
}

export const usePromoState = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePromo must be used inside <PromoProvider>");
  return v;
};
