/*
  Black Friday offer. One place to change it.
  Defaults: 15% off live and artificial trees from Black Friday to Cyber Monday, US Eastern time.
  Override without code changes in the hosting dashboard:
    NEXT_PUBLIC_PROMO_PERCENT   e.g. 20   (0 turns the offer off)
    NEXT_PUBLIC_PROMO_START     e.g. 2026-11-27   (first day, Eastern)
    NEXT_PUBLIC_PROMO_END       e.g. 2026-11-30   (last day, Eastern, inclusive)
  Prices are always recalculated on the server at checkout, so the browser cannot change them.
*/
import type { Category } from "@/data/products";

// NOTE: NEXT_PUBLIC_* variables must be read by their exact name (process.env.NEXT_PUBLIC_X) so Next.js can put them in the
// browser bundle. Reading them through a helper that takes the name as a string works on the server only, and the
// browser and the server would then disagree about the price.
const pick = (v: string | undefined, d: string) => (v || "").trim() || d;

export const PROMO = {
  name: "Black Friday",
  percent: Math.max(0, Math.min(90, Number(pick(process.env.NEXT_PUBLIC_PROMO_PERCENT, "15")) || 0)),
  startDate: pick(process.env.NEXT_PUBLIC_PROMO_START, "2026-11-27"),
  endDate: pick(process.env.NEXT_PUBLIC_PROMO_END, "2026-11-30"),
  /** Add-ons are not discounted. Commercial trees are quote-only. */
  appliesTo: ["live", "artificial"] as Category[],
  /** The banner announces the sale this many days before it starts. */
  teaserDays: 14,
};

// Late November is Eastern Standard Time (UTC-5).
const start = () => new Date(`${PROMO.startDate}T00:00:00-05:00`);
const end = () => new Date(`${PROMO.endDate}T23:59:59-05:00`);

export type PromoState = { state: "off" | "soon" | "live"; percent: number; startLabel: string; endLabel: string };

const label = (iso: string) => new Date(`${iso}T12:00:00-05:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "America/New_York" });

export const promoState = (now: Date = new Date()): PromoState => {
  const base = { percent: PROMO.percent, startLabel: label(PROMO.startDate), endLabel: label(PROMO.endDate) };
  if (!PROMO.percent) return { state: "off", ...base };
  if (now >= start() && now <= end()) return { state: "live", ...base };
  const days = (start().getTime() - now.getTime()) / 86400000;
  if (days > 0 && days <= PROMO.teaserDays) return { state: "soon", ...base };
  return { state: "off", ...base };
};

export const promoLive = (now: Date = new Date()) => promoState(now).state === "live";

/** Sale price in whole dollars. Returns the original price when the offer does not apply. */
export const salePrice = (price: number, category: Category, now: Date = new Date()): number =>
  promoLive(now) && PROMO.appliesTo.includes(category) ? Math.round(price * (1 - PROMO.percent / 100)) : price;
