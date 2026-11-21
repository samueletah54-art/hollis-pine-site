"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { all, money } from "@/lib/catalog";

/** "Most people add these": a stand and a few small things, picked by what is already in the cart. Add-ons only. */
export default function CartUpsell() {
  const { lines, add } = useCart();
  const hasLive = lines.some((l) => all.find((p) => p.slug === l.slug)?.category === "live");
  const inCart = new Set(lines.map((l) => l.slug));
  const wanted: string[] = hasLive ? ["stand", "care", "skirt", "bags"] : ["stand", "skirt"];
  const picks = wanted
    .map((kind) => all.find((p) => p.category === "addon" && p.addonKind === kind && !inCart.has(p.slug) && p.sizes.some((s) => s.price != null)))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .slice(0, 3);
  if (!picks.length) return null;
  return (
    <section aria-labelledby="upsell" className="mt-10">
      <h2 id="upsell" className="label text-gold">Most people add these</h2>
      <ul className="mt-3 grid sm:grid-cols-3 gap-4">
        {picks.map((p) => {
          const s = p.sizes.find((x) => x.price != null)!;
          return (
            <li key={p.slug} className="border border-bark/50 p-4 flex flex-col">
              <Link href={`/extras/${p.slug}`} className="serif-text text-xl leading-tight hover:underline underline-offset-4">{p.name}</Link>
              <p className="text-sm text-muted mt-1 flex-1">{p.tagline}</p>
              <p className="num mt-3">{money(s.price!)}</p>
              <button type="button" className="btn btn-ghost mt-3 !py-2" onClick={() => add({ slug: p.slug, sizeId: s.id, qty: 1 }, false)} aria-label={`Add ${p.name} to your cart`}>Add</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
