import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import { all } from "@/lib/catalog";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { urlFor } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All trees, stands and wreaths",
  description: "Live-cut firs, pines and spruces, pre-lit artificial trees, commercial trees from 9 to 30 feet, plus stands, wreaths and garland. Shipped across the U.S.",
  alternates: { canonical: "/shop" },
};

export default function Shop() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-12 md:pt-16">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: all.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: SITE.url + urlFor(p), name: p.name })) }} />
      <header className="grid md:grid-cols-12 gap-4 border-b border-ink pb-8 mb-10">
        <p className="label text-berry md:col-span-3">The shop</p>
        <div className="md:col-span-9">
          <h1 className="serif text-5xl md:text-7xl leading-[.95]">Every tree on the farm.</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-ink/80">Twelve live-cut varieties, five artificial, two commercial sizes, and everything it takes to keep them upright. Prices are per tree. Shipping is figured at checkout.</p>
        </div>
      </header>
      <Suspense fallback={<p className="py-16 text-muted">Loading the trees…</p>}>
        <ShopClient products={all} />
      </Suspense>
    </div>
  );
}
