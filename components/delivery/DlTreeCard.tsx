import Link from "next/link";
import Photo from "../Photo";
import Price from "../Price";
import { priceFrom, urlFor } from "@/lib/catalog";
import type { Product } from "@/data/products";

/** feature: a tall card for the tree people ask for most. row: a compact horizontal card. */
export default function DlTreeCard({ p, feature }: { p: Product; feature?: boolean }) {
  const from = priceFrom(p);
  if (feature)
    return (
      <Link href={urlFor(p)} className="group block h-full">
        <div className="dl-plate"><div className="relative aspect-[4/5] bg-[var(--dl-card)] overflow-hidden"><Photo src={`/images/${p.slug}.webp`} alt={p.name} sizes="(min-width:1024px) 40vw, 100vw" className="absolute inset-0" zoom /></div></div>
        <p className="dl-eyebrow mt-5 text-[var(--dl-bark)]">The one we're asked for most</p>
        <h3 className="serif-dl text-[2rem] md:text-[2.5rem] leading-tight group-hover:underline underline-offset-4 decoration-2 decoration-[var(--dl-gold)]">{p.name}</h3>
        <p className="mt-2 text-[var(--dl-muted)] max-w-[44ch]">{p.tagline}</p>
        {from !== null && <p className="mt-3 text-lg">From <Price value={from} category={p.category} /></p>}
      </Link>
    );
  return (
    <Link href={urlFor(p)} className="group grid grid-cols-[7.5rem_1fr] sm:grid-cols-[10rem_1fr] gap-5 items-center border-t border-[var(--dl-bark)]/40 py-5 first:border-t-0 first:pt-0">
      <div className="relative aspect-square bg-[var(--dl-card)] overflow-hidden"><Photo src={`/images/${p.slug}.webp`} alt={p.name} sizes="160px" className="absolute inset-0" zoom /></div>
      <div>
        <h3 className="serif-dl text-[1.5rem] md:text-[1.75rem] leading-tight group-hover:underline underline-offset-4 decoration-2 decoration-[var(--dl-gold)]">{p.name}</h3>
        <p className="mt-1 text-[var(--dl-muted)] text-[.9375rem]">{p.tagline}</p>
        {from !== null && <p className="mt-2">From <Price value={from} category={p.category} /></p>}
      </div>
    </Link>
  );
}
