import { products, type Product, type Size } from "@/data/products";

export const all = products;
export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const urlFor = (p: Product) => (p.category === "addon" ? `/extras/${p.slug}` : `/trees/${p.slug}`);

export const priceFrom = (p: Product): number | null => {
  const prices = p.sizes.map((s) => s.price).filter((x): x is number => x !== null);
  return prices.length ? Math.min(...prices) : null;
};

export const heightRange = (p: Product): string | null => {
  const mins = p.sizes.map((s) => s.heightMin).filter((x): x is number => x !== undefined);
  const maxs = p.sizes.map((s) => s.heightMax).filter((x): x is number => x !== undefined);
  if (!mins.length) return null;
  const lo = Math.min(...mins), hi = Math.max(...maxs);
  return lo === hi ? `${lo} ft` : `${lo}–${hi} ft`;
};

export const findSize = (p: Product, id: string): Size | undefined => p.sizes.find((s) => s.id === id);

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0 });

export const categoryLabel: Record<Product["category"], string> = {
  live: "Live-cut",
  artificial: "Artificial",
  commercial: "Commercial",
  addon: "Stands, wreaths & extras",
};

export type HeightBucket = "under6" | "6-7" | "7-8" | "8plus";
export const heightBuckets: { id: HeightBucket; label: string }[] = [
  { id: "under6", label: "Under 6 ft" },
  { id: "6-7", label: "6–7 ft" },
  { id: "7-8", label: "7–8 ft" },
  { id: "8plus", label: "8 ft and taller" },
];

export const inBucket = (s: Size, b: HeightBucket): boolean => {
  if (s.heightMin === undefined || s.heightMax === undefined) return false;
  const mid = (s.heightMin + s.heightMax) / 2;
  if (b === "under6") return mid < 6;
  if (b === "6-7") return mid >= 6 && mid < 7;
  if (b === "7-8") return mid >= 7 && mid < 8;
  return mid >= 8;
};

export const roomLabels = ["living room", "entryway", "small space", "lobby", "kitchen", "porch"] as const;

export const related = (p: Product, n = 4): Product[] => {
  const wanted: Product["addonKind"][] =
    p.category === "live" ? ["stand", "skirt", "care", "bags", "wreath"] : p.category === "artificial" ? ["bulbs", "skirt", "stand", "wreath"] : ["stand", "garland", "wreath"];
  const picks = products.filter((x) => x.category === "addon" && x.slug !== p.slug && wanted.includes(x.addonKind));
  picks.sort((a, b) => wanted.indexOf(a.addonKind) - wanted.indexOf(b.addonKind));
  if (p.category === "addon") {
    return products.filter((x) => x.slug !== p.slug && (x.category === "live" || x.category === "addon") && x.featured).slice(0, n);
  }
  return picks.slice(0, n);
};
