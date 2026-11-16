import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import Divider from "@/components/Divider";
import JsonLd from "@/components/JsonLd";
import { all, urlFor } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "All trees, stands and wreaths",
  description: "Live-cut firs, pines and spruces, pre-lit artificial trees, commercial trees from 9 to 30 feet, plus stands, wreaths and garland. Shipped across the U.S.",
  alternates: { canonical: "/shop" },
};

export default function Shop() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-12 md:pt-16">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: all.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: SITE.url + urlFor(p), name: p.name })) }} />
      <header className="grid md:grid-cols-12 gap-4 pb-8">
        <div className="md:col-span-10">
          <h1 className="serif text-6xl">Every tree we sell.</h1>
          <p className="mt-5 max-w-[54ch] text-lg text-ink/85">Twelve live trees, five artificial, and two sizes of commercial tree. Prices are for one tree. Not sure which height? The <a href="/sizes" className="underline underline-offset-4 decoration-gold decoration-2">size guide</a> shows you how to measure.</p>
        </div>
      </header>
      <Divider className="mb-10" />
      <Suspense fallback={<p className="py-16 text-muted">Loading the trees…</p>}>
        <ShopClient products={all} />
      </Suspense>
    </div>
  );
}
