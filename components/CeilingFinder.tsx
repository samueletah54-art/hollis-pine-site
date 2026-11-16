"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { hasImage } from "@/lib/images";
import ProductTile from "./ProductTile";

/** Tell it your ceiling, see the tallest tree that fits drawn next to a door and a person, then jump to those trees. */
export default function CeilingFinder({ products }: { products: Product[] }) {
  const id = useId();
  const [ceiling, setCeiling] = useState(8);

  const fit = Math.max(4, Math.floor(ceiling - 1));
  const fits = useMemo(
    () => products.filter((p) => (p.category === "live" || p.category === "artificial") && p.sizes.some((s) => (s.heightMax ?? 99) <= fit)),
    [products, fit],
  );
  const buckets = [fit >= 5 ? "under6" : "", fit >= 7 ? "6-7" : "", fit >= 8 ? "7-8" : "", fit >= 9 ? "8plus" : ""].filter(Boolean);
  const href = `/shop?${buckets.map((b) => `height=${b}`).join("&")}`;
  // Show a couple of real trees that fit, preferring ones with a photo.
  const shown = useMemo(() => [...fits].sort((a, b) => Number(hasImage(b.images[0].src)) - Number(hasImage(a.images[0].src))).slice(0, 2), [fits]);

  return (
    <div className="grid md:grid-cols-12 gap-x-12 gap-y-8 items-center">
      <div className="md:col-span-5">
        <h2 className="serif text-5xl">How high is your ceiling?</h2>
        <p className="mt-4 text-lg max-w-[40ch]">Slide to your ceiling height. We'll show the tallest tree that fits, and the trees we have at that size.</p>
        <div className="mt-8">
          <label htmlFor={id} className="flex items-baseline justify-between">
            <span className="font-semibold">Ceiling height</span>
            <span className="serif text-4xl num" aria-hidden="true">{ceiling % 1 ? ceiling.toFixed(1) : ceiling} ft</span>
          </label>
          <input
            id={id} type="range" min={7} max={14} step={0.5} value={ceiling}
            onChange={(e) => setCeiling(Number(e.target.value))}
            aria-valuetext={`${ceiling} feet`}
            className="w-full mt-3 accent-[#d8b76a] h-8 cursor-pointer"
          />
          <div className="flex justify-between text-sm text-muted num"><span>7 ft</span><span>14 ft</span></div>
        </div>
        <p className="mt-6 text-lg" role="status" aria-live="polite">
          {ceiling >= 12
            ? <>Tall room. Trees up to {fit} ft are in the shop, and we cut bigger ones for <Link href="/business" className="underline underline-offset-4 decoration-gold decoration-2">businesses and halls</Link>.</>
            : <>The tallest tree that fits is <b className="num">{fit} ft</b>. We have <b className="num">{fits.length}</b> trees that size or smaller.</>}
        </p>
        <Link href={href} className="btn btn-primary mt-5">Show trees up to {fit} ft</Link>
        <p className="mt-4 text-sm text-muted">We take off one foot for the stand and a topper. <Link href="/sizes" className="underline underline-offset-4 decoration-gold decoration-2">The size guide</Link> shows the working.</p>
      </div>

      <div className="md:col-span-7">
        {shown.length > 0 && (
          <ul className="grid grid-cols-2 gap-5" aria-label={`Trees that fit a ${ceiling} foot ceiling`}>
            {shown.map((p) => (<li key={p.slug}><ProductTile p={p} /></li>))}
          </ul>
        )}
      </div>
    </div>
  );
}
