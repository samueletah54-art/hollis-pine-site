import Link from "next/link";
import type { Product } from "@/data/products";
import { heightRange, money, priceFrom, urlFor } from "@/lib/catalog";
import Note from "./Note";
import Photo from "./Photo";

const tagFor = (p: Product) => (p.category === "commercial" ? "Commercial" : p.prelit && p.category === "artificial" ? "Pre-lit" : p.category === "live" ? "Fresh cut" : p.badges[0]);

export default function ProductTile({ p, feature = false, flip = false, priority = false }: { p: Product; feature?: boolean; flip?: boolean; priority?: boolean }) {
  const from = priceFrom(p);
  const h = heightRange(p);
  const low = p.stock === "low";

  if (feature) {
    return (
      <article className="group relative grid md:grid-cols-2 gap-x-10 gap-y-5 items-center">
        <Link href={urlFor(p)} className={`block ${flip ? "md:order-2" : ""}`} tabIndex={-1} aria-hidden="true">
          <Photo src={p.images[0].src} alt="" sizes="(min-width:768px) 40vw, 100vw" priority={priority} plate className="aspect-[4/5]" />
        </Link>
        <div>
          <p className="label text-bark">{tagFor(p)}{h ? `, ${h}` : ""}</p>
          <h3 className="serif text-4xl mt-2"><Link href={urlFor(p)} className="hover:underline decoration-tan decoration-[3px] underline-offset-[6px]">{p.name}</Link></h3>
          <p className="serif-text italic text-lg mt-3 text-ink/85">{p.tagline}</p>
          <p className="mt-4 max-w-[46ch]">{p.description}</p>
          {p.note && <Note className="mt-4">{p.note}</Note>}
          <p className="mt-5 num text-lg">{from !== null ? <>From <b className="font-semibold">{money(from)}</b></> : "Ask for a quote"}{low && <span className="ml-3 text-cranberry text-sm font-semibold">Only a few left</span>}</p>
          <Link href={urlFor(p)} className="btn btn-ghost mt-5">See this tree</Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative">
      <Link href={urlFor(p)} className="block">
        <div className="relative">
          <Photo src={p.images[0].src} alt={p.images[0].alt} sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 50vw" priority={priority} plate className="aspect-[4/5]" />
          {tagFor(p) && <span className="absolute left-3 top-3 bg-paper text-bark label px-2 py-0.5 border border-bark/60">{tagFor(p)}</span>}
        </div>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 border-t-[3px] border-double border-bark/50 pt-2">
          <h3 className="serif-text text-xl leading-tight">{p.name}</h3>
          <p className="num text-sm">{from !== null ? <><span className="text-muted mr-1">from</span>{money(from)}</> : <span className="text-muted">Quote</span>}</p>
        </div>
        <p className="text-sm text-muted mt-0.5">{h ?? p.sizes.map((s) => s.label).join(", ")}{low && <span className="ml-2 text-cranberry font-semibold">Few left</span>}</p>
      </Link>
      {p.note && <Note className="mt-2 !text-lg" tilt={-1.5}>{p.note}</Note>}
    </article>
  );
}
