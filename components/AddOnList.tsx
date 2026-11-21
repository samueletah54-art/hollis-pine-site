"use client";

import Link from "next/link";
import { useState } from "react";
import { bySlug, money, urlFor } from "@/lib/catalog";
import { useCart } from "./CartProvider";

const picks: [string, string, string][] = [
  ["water-reservoir-stand", "up-to-7", "Holds a gallon, so the cut stays under water for two days."],
  ["fraser-fir-wreath", "24", "Wired by hand. Hang it on the door."],
  ["fresh-garland", "9ft", "Fir and cedar. Stairs, mantels, door frames."],
  ["glass-ornament-set", "30", "Thirty plain glass balls, with hooks."],
];

/** Add-ons as a plain list, each with a price and an add button. No cards. */
export default function AddOnList() {
  const { add } = useCart();
  const [done, setDone] = useState<string | null>(null);
  return (
    <ul className="border-t-[3px] border-double border-bark/60">
      {picks.map(([slug, sizeId, line]) => {
        const p = bySlug(slug)!;
        const s = p.sizes.find((x) => x.id === sizeId)!;
        return (
          <li key={slug} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 border-b rule">
            <div>
              <h3 className="serif-text text-2xl"><Link href={urlFor(p)} className="inline-block py-2 hover:underline decoration-gold decoration-[3px] underline-offset-[6px]">{p.name}</Link></h3>
              <p className="text-muted">{line}</p>
            </div>
            <div className="flex items-baseline gap-5 justify-self-end">
              <span className="num text-lg">{money(s.price!)}</span>
              <button className="btn btn-ghost !py-2 !px-4" onClick={() => { add({ slug, sizeId, qty: 1 }); setDone(slug); setTimeout(() => setDone(null), 1500); }} aria-label={`Add ${p.name} to your order`}>
                {done === slug ? "Added" : "Add"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
