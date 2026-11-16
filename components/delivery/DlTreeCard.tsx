import Link from "next/link";
import Photo from "../Photo";
import Price from "../Price";
import { priceFrom, urlFor } from "@/lib/catalog";
import type { Product } from "@/data/products";

/** A real catalogue tree: photo, name, "from" price, link to its page. */
export default function DlTreeCard({ p }: { p: Product }) {
  const from = priceFrom(p);
  return (
    <li className="flex flex-col">
      <Link href={urlFor(p)} className="group block">
        <div className="relative aspect-[4/5] bg-[var(--dl-card)] overflow-hidden">
          <Photo src={`/images/${p.slug}.webp`} alt={p.name} sizes="(min-width:1024px) 280px, (min-width:640px) 45vw, 90vw" className="absolute inset-0" zoom />
        </div>
        <h3 className="serif-dl text-[1.5rem] leading-snug mt-4">{p.name}</h3>
      </Link>
      <p className="mt-1 text-[var(--dl-muted)] text-[.9375rem]">{p.tagline}</p>
      <div className="mt-auto pt-2">
      {from !== null && <p className="text-lg mt-2">From <Price value={from} category={p.category} /></p>}
      <Link href={urlFor(p)} className="dl-btn dl-btn-green mt-4 w-full">View tree</Link>
      </div>
    </li>
  );
}
