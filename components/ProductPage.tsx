import Link from "next/link";
import type { Product } from "@/data/products";
import { reviews } from "@/data/reviews";
import Banner from "./Banner";
import Divider from "./Divider";
import { heightRange, money, priceFrom, related, urlFor } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import JsonLd from "./JsonLd";
import ProductTile from "./ProductTile";
import Purchase from "./Purchase";

export default function ProductPage({ p }: { p: Product }) {
  const revs = reviews.filter((r) => r.slug === p.slug);
  const avg = revs.length ? revs.reduce((n, r) => n + r.rating, 0) / revs.length : 0;
  const prices = p.sizes.map((s) => s.price).filter((x): x is number => x !== null);
  const rel = related(p);
  const crumbs = p.category === "addon" ? [["Shop", "/shop"], ["Extras", "/shop?type=addon"]] : [["Shop", "/shop"], [p.category === "live" ? "Live-cut" : p.category === "artificial" ? "Artificial" : "Commercial", `/shop?type=${p.category}`]];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    sku: p.slug,
    brand: { "@type": "Brand", name: "Hollis & Pine" },
    image: p.images.map((i) => SITE.url + i.src),
    url: SITE.url + urlFor(p),
    ...(prices.length
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: prices.length,
            availability: p.stock === "low" ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock",
            seller: { "@type": "Organization", name: SITE.name },
          },
        }
      : {}),
    ...(revs.length
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: avg.toFixed(1), reviewCount: revs.length },
          review: revs.map((r) => ({ "@type": "Review", author: { "@type": "Person", name: r.name }, datePublished: r.date, ...(r.title ? { name: r.title } : {}), reviewBody: r.body, reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 } })),
        }
      : {}),
  };

  return (
    <article className="mx-auto max-w-[88rem] px-5 md:px-10 pt-8 md:pt-12">
      <JsonLd data={ld} />
      <nav aria-label="Breadcrumb" className="label text-muted flex flex-wrap gap-2 mb-8">
        {crumbs.map(([l, h]) => (<span key={h}><Link href={h} className="underline underline-offset-4">{l}</Link> <span aria-hidden>/</span></span>))}
        <span aria-current="page" className="text-ink">{p.name}</span>
      </nav>

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
        <div className="lg:col-span-7"><Gallery images={p.images} /></div>
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-wrap gap-2 mb-4">{p.badges.map((b) => (<span key={b} className="label border border-ink/60 px-2 py-1">{b}</span>))}</div>
          <h1 className="serif text-5xl md:text-6xl leading-[.95]">{p.name}</h1>
          <p className="serif-text italic text-xl mt-4 text-ink/85">{p.tagline}</p>
          <p className="text-sm text-muted mt-3">Ships from {p.shipsFrom}{heightRange(p) ? `, ${heightRange(p)}` : ""}{revs.length ? `. ${avg.toFixed(1)} of 5 from ${revs.length} ${revs.length === 1 ? "review" : "reviews"}` : ""}</p>
          <div className="mt-8 border-t-[3px] border-double border-bark/60 pt-8"><Purchase p={p} /></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-16 mt-20 md:mt-28">
        <section className="lg:col-span-6" aria-labelledby="about">
          <h2 id="about" className="label text-bark mb-4">About this {p.category === "addon" ? "item" : "tree"}</h2>
          <p className="serif-text text-xl md:text-2xl leading-snug">{p.description}</p>
        </section>

        {p.facts && (
          <section className="lg:col-span-5 lg:col-start-8" aria-labelledby="facts">
            <h2 id="facts" className="label text-bark mb-4">The facts</h2>
            <dl className="border-t-[3px] border-double border-bark/60">
              {([["Needles", p.facts.needleRetention], ...(p.facts.indoors ? [["Lasts indoors", p.facts.indoors] as const] : []), ["Scent", p.facts.fragrance], ["Branch strength", p.facts.branchStrength], ["Shape", p.facts.shape], ["Best for", p.facts.bestFor]] as const).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)] gap-4 py-3 border-b rule">
                  <dt className="label text-muted pt-1">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="lg:col-span-5" aria-labelledby="box">
          <h2 id="box" className="label text-bark mb-4">What's in the box</h2>
          <ul className="border-t-[3px] border-double border-bark/60">{p.inTheBox.map((x) => (<li key={x} className="py-3 border-b rule flex gap-4"><span className="text-tan label pt-1">+</span>{x}</li>))}</ul>
        </section>

        {p.care && (
          <section className="lg:col-span-6 lg:col-start-7" aria-labelledby="care">
            <h2 id="care" className="label text-bark mb-4">Care</h2>
            <ol className="border-t-[3px] border-double border-bark/60">{p.care.map((x, i) => (<li key={x} className="py-3 border-b rule grid grid-cols-[2.5rem_1fr]"><span className="serif text-2xl text-tan num">{i + 1}</span><span>{x}</span></li>))}</ol>
            <p className="mt-4 text-sm"><Link href="/care" className="underline underline-offset-4 decoration-gold">The full care guide</Link></p>
          </section>
        )}
      </div>

      {p.needlesImage && (
        <section className="mt-24 -mx-5 md:-mx-10" aria-label="Up close">
          <Banner src={p.needlesImage.src} alt={p.needlesImage.alt} caption={`${p.species ?? p.name}, up close`} />
        </section>
      )}

      <Reviews slug={p.slug} heading="Reviews" nested />


      {rel.length > 0 && (
        <section className="mt-24" aria-labelledby="related">
          <h2 id="related" className="serif text-4xl md:text-5xl border-b rule pb-4 mb-8">{p.category === "addon" ? "Goes with" : "To go with it"}</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">{rel.map((x) => (<li key={x.slug}><ProductTile p={x} /></li>))}</ul>
        </section>
      )}
      {priceFrom(p) !== null && <p className="sr-only">From {money(priceFrom(p)!)}</p>}
    </article>
  );
}
