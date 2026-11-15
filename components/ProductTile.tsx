import Link from "next/link";
import type { Product } from "@/data/products";
import { heightRange, money, priceFrom, urlFor } from "@/lib/catalog";
import Photo from "./Photo";

const tagFor = (p: Product) => (p.category === "commercial" ? "Commercial" : p.prelit && p.category === "artificial" ? "Pre-lit" : p.category === "live" ? "Fresh cut" : p.badges[0]);

export default function ProductTile({ p, size = "md", priority = false }: { p: Product; size?: "md" | "lg"; priority?: boolean }) {
  const from = priceFrom(p);
  const h = heightRange(p);
  return (
    <article className="group relative">
      <Link href={urlFor(p)} className="block focus-visible:outline-offset-4">
        <div className="relative">
          <Photo
            src={p.images[0].src}
            alt={p.images[0].alt}
            sizes={size === "lg" ? "(min-width:1024px) 48vw, 100vw" : "(min-width:1024px) 24vw, (min-width:640px) 45vw, 100vw"}
            priority={priority}
            zoom
            className={size === "lg" ? "aspect-[4/5] md:aspect-[5/6]" : "aspect-[4/5]"}
          />
          {tagFor(p) && <span className="absolute left-3 top-3 bg-paper text-ink label px-2 py-1 border border-ink/80">{tagFor(p)}</span>}
        </div>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 border-t rule pt-2">
          <h3 className={`serif-text leading-tight ${size === "lg" ? "text-2xl md:text-3xl" : "text-xl"}`}>{p.name}</h3>
          <p className="num text-[.95rem] ">{from !== null ? <><span className="text-muted text-xs mr-1">from</span>{money(from)}</> : <span className="text-muted">Quote</span>}</p>
        </div>
        <p className="text-sm text-muted mt-1">{h ?? p.sizes.map((s) => s.label).join(" · ")}</p>
      </Link>
    </article>
  );
}
