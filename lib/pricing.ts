import { bySlug, findSize } from "./catalog";

export type CartLine = { slug: string; sizeId: string; option?: string; qty: number };

export type Priced = {
  line: CartLine;
  name: string;
  sizeLabel: string;
  optionLabel?: string;
  unit: number;
  total: number;
  category: string;
  image?: string;
};

export const FREE_SHIPPING_ARTIFICIAL = 250;

export const priceLines = (lines: CartLine[]): Priced[] =>
  lines.flatMap((line) => {
    const p = bySlug(line.slug);
    const s = p && findSize(p, line.sizeId);
    if (!p || !s || s.price === null) return [];
    const qty = Math.max(1, Math.min(20, Math.floor(line.qty)));
    const opt = p.option?.values.find((v) => v.id === line.option);
    return [{ line: { ...line, qty }, name: p.name, sizeLabel: s.label, optionLabel: opt?.label, unit: s.price, total: s.price * qty, category: p.category, image: p.images[0]?.src }];
  });

export const subtotal = (priced: Priced[]) => priced.reduce((n, x) => n + x.total, 0);

/** Shipping estimate in dollars. Stripe Checkout charges exactly this. */
export const shipping = (priced: Priced[]): number => {
  if (!priced.length) return 0;
  const sub = subtotal(priced);
  let total = 0;
  const hasTree = priced.some((x) => x.category === "live" || x.category === "artificial");
  for (const x of priced) {
    const p = bySlug(x.line.slug)!;
    const s = findSize(p, x.line.sizeId)!;
    if (x.category === "live") total += ((s.heightMax ?? 0) >= 7 ? 34 : 24) * x.line.qty;
    else if (x.category === "artificial") total += sub >= FREE_SHIPPING_ARTIFICIAL ? 0 : 19 * x.line.qty;
  }
  if (!hasTree) total += 9; // add-ons only
  return total;
};
