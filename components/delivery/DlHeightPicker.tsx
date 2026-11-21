"use client";

import Link from "next/link";
import { useId, useState } from "react";
import Photo from "../Photo";
import Price from "../Price";
import { urlFor } from "@/lib/catalog";
import type { Product } from "@/data/products";

/** Ceiling in, trees out. A tree needs about a foot of clearance, so the tallest tree is ceiling minus one. */
export default function DlHeightPicker({ trees }: { trees: Product[] }) {
  const id = useId();
  const [ceiling, setCeiling] = useState(8.5);
  const fit = Math.floor(ceiling - 1);
  const rows = trees
    .map((p) => {
      const ok = p.sizes.filter((s) => (s.heightMax ?? 99) <= fit && s.price != null);
      const best = ok.sort((a, b) => (b.heightMax ?? 0) - (a.heightMax ?? 0))[0];
      return best ? { p, s: best } : null;
    })
    .filter((x): x is { p: Product; s: NonNullable<Product["sizes"][number]> } => !!x);
  return (
    <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10 items-start">
      <div className="lg:col-span-5">
        <p className="dl-eyebrow text-[var(--dl-bark)]">Before you choose</p>
        <h2 className="serif-dl mt-3 text-[2rem] md:text-[3rem] leading-[1.08]">How high is your ceiling?</h2>
        <p className="mt-4 text-lg max-w-[40ch]">A tree needs about a foot of room for the stand and the star. Slide to your ceiling and we'll show what fits.</p>
        <div className="mt-8">
          <label htmlFor={id} className="flex items-baseline justify-between gap-4">
            <span className="font-semibold">Ceiling height</span>
            <span className="serif-dl text-[2.5rem] leading-none num" aria-hidden>{ceiling % 1 ? ceiling.toFixed(1) : ceiling} ft</span>
          </label>
          <input id={id} type="range" min={7} max={12} step={0.5} value={ceiling} onChange={(e) => setCeiling(Number(e.target.value))} aria-valuetext={`${ceiling} feet`} className="dl-range mt-2" />
          <div className="flex justify-between text-[.875rem] text-[var(--dl-muted)] num"><span>7 ft</span><span>12 ft</span></div>
          <p className="mt-6 serif-dl text-[1.5rem]" aria-live="polite">The tallest tree that fits: <b className="text-[var(--dl-green)]">{fit} ft</b></p>
        </div>
      </div>
      <ul className="lg:col-span-7 border-t border-[var(--dl-bark)]/40">
        {rows.length === 0 && <li className="py-6 text-[var(--dl-muted)]">Nothing on this list is short enough. Ask us about a tabletop tree.</li>}
        {rows.map(({ p, s }) => (
          <li key={p.slug} className="border-b border-[var(--dl-bark)]/40">
            <Link href={urlFor(p)} className="group grid grid-cols-[4.5rem_1fr_auto] md:grid-cols-[6rem_1fr_auto] items-center gap-4 md:gap-6 py-4 min-h-[5.5rem]">
              <div className="relative aspect-square bg-[var(--dl-card)] overflow-hidden"><Photo src={`/images/${p.slug}.webp`} alt="" sizes="96px" className="absolute inset-0" zoom /></div>
              <div>
                <h3 className="serif-dl text-[1.375rem] md:text-[1.75rem] leading-tight group-hover:underline underline-offset-4 decoration-2 decoration-[var(--dl-gold)]">{p.name}</h3>
                <p className="text-[var(--dl-muted)] text-[.9375rem]">{s.label}</p>
              </div>
              <span className="text-lg num"><Price value={s.price!} category={p.category} /></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
