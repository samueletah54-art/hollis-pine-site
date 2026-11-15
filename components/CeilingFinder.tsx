"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { Product } from "@/data/products";

const PX = 19; // pixels per foot
const FLOOR = 300;
const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) - 0.5; };

const tree = (cx: number, ft: number) => {
  const h = ft * PX, top = FLOOR - h, trunk = 12, bottom = FLOOR - trunk;
  const tiers = ft < 6 ? 3 : ft < 8 ? 4 : 5, maxW = Math.max(40, h * 0.5), seg = (bottom - top) / tiers;
  return {
    top,
    trunk: `M${cx - 5} ${bottom} L${cx - 5} ${FLOOR} L${cx + 5} ${FLOOR} L${cx + 5} ${bottom} Z`,
    tiers: Array.from({ length: tiers }, (_, i) => {
      const t0 = top + seg * i - (i ? seg / 3 : 0), t1 = top + seg * (i + 1), w = (maxW * (i + 1.3)) / (tiers + 0.3), j = (k: number) => rnd(i * 7 + k + ft) * 3;
      return `M${cx + j(1)} ${t0} L${cx + w / 2 + j(2)} ${t1 + j(3)} Q${cx} ${t1 + 4} ${cx - w / 2 + j(4)} ${t1} Z`;
    }),
  };
};

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
  const t = tree(330, Math.min(fit, 11));
  const ceilY = FLOOR - ceiling * PX;

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
            className="w-full mt-3 accent-[#1f3a2d] h-8 cursor-pointer"
          />
          <div className="flex justify-between text-sm text-muted num"><span>7 ft</span><span>14 ft</span></div>
        </div>
        <p className="mt-6 text-lg" role="status" aria-live="polite">
          {ceiling >= 12
            ? <>Tall room. Trees up to {fit} ft are in the shop, and we cut bigger ones for <Link href="/business" className="underline underline-offset-4 decoration-tan decoration-2">businesses and halls</Link>.</>
            : <>The tallest tree that fits is <b className="num">{fit} ft</b>. We have <b className="num">{fits.length}</b> trees that size or smaller.</>}
        </p>
        <Link href={href} className="btn btn-primary mt-5">Show trees up to {fit} ft</Link>
        <p className="mt-4 text-sm text-muted">We take off one foot for the stand and a topper. <Link href="/sizes" className="underline underline-offset-4 decoration-tan decoration-2">The size guide</Link> shows the working.</p>
      </div>

      <div className="md:col-span-7">
        <svg viewBox="0 0 560 330" role="img" aria-label={`A room with a ${ceiling} foot ceiling, a door, a person, and a ${fit} foot tree`} className="w-full h-auto text-ink">
          <rect x="30" y={Math.max(8, ceilY)} width="500" height={FLOOR - Math.max(8, ceilY)} fill="#e8ddc5" />
          <path d={`M30 ${ceilY} L530 ${ceilY}`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d={`M30 ${ceilY} L30 ${FLOOR} M530 ${ceilY} L530 ${FLOOR}`} stroke="currentColor" strokeWidth="2" opacity=".4" />
          <text x="520" y={ceilY + 24} textAnchor="end" className="hand" fontSize="24" fill="currentColor">ceiling</text>
          <path d={`M24 ${FLOOR + 1} L536 ${FLOOR + 1}`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* door */}
          <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round">
            <path d={`M70 ${FLOOR} L70 ${FLOOR - 6.67 * PX} L128 ${FLOOR - 6.67 * PX} L128 ${FLOOR}`} />
            <path d={`M80 ${FLOOR - 8} L80 ${FLOOR - 3.2 * PX} L118 ${FLOOR - 3.2 * PX} L118 ${FLOOR - 8} Z M80 ${FLOOR - 3.2 * PX - 10} L80 ${FLOOR - 6.67 * PX + 10} L118 ${FLOOR - 6.67 * PX + 10} L118 ${FLOOR - 3.2 * PX - 10} Z`} strokeWidth="1.5" />
          </g>
          <circle cx="120" cy={FLOOR - 3.3 * PX} r="3.5" fill="currentColor" />
          {/* person */}
          <g fill="currentColor" opacity=".85">
            <circle cx="190" cy={FLOOR - 5.67 * PX + 9} r="9" />
            <path d={`M179 ${FLOOR - 5.67 * PX + 21} Q190 ${FLOOR - 5.67 * PX + 17} 201 ${FLOOR - 5.67 * PX + 21} L204 ${FLOOR - 50} L198 ${FLOOR - 50} L197 ${FLOOR} L191 ${FLOOR} L190 ${FLOOR - 46} L189 ${FLOOR} L183 ${FLOOR} L182 ${FLOOR - 50} L176 ${FLOOR - 50} Z`} />
          </g>
          {/* tree */}
          <path d={t.trunk} fill="#5a4130" />
          {t.tiers.map((d, i) => (<path key={i} d={d} fill="#1f3a2d" stroke="#12281d" strokeWidth="2" strokeLinejoin="round" />))}
          <path d={`M330 ${t.top - 10} l3.5 8 l8 1 l-6.5 5.5 l2.5 8 l-7.5 -5 l-7.5 5 l2.5 -8 l-6.5 -5.5 l8 -1 z`} fill="#dcc48f" stroke="#7e5f36" strokeWidth="1" />
          <text x="330" y={FLOOR + 26} textAnchor="middle" className="hand" fontSize="28" fill="currentColor" fontWeight="600">{fit} ft tree</text>
          <text x="99" y={FLOOR + 26} textAnchor="middle" className="hand" fontSize="20" fill="currentColor">door</text>
          <text x="190" y={FLOOR + 26} textAnchor="middle" className="hand" fontSize="20" fill="currentColor">you</text>
        </svg>
      </div>
    </div>
  );
}
