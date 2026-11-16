"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "#trees", label: "Trees" },
  { href: "#how", label: "How it works" },
  { href: "#shipping", label: "Where we ship" },
  { href: "#order", label: "Order" },
  { href: "/shop", label: "Full shop" },
];

export default function DlHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--dl-cream)] border-b border-[#1d2820]/15">
      <div className="dl-wrap flex items-center justify-between h-16 md:h-20">
        <Link href="/tree-delivery" className="serif-dl text-2xl md:text-[1.75rem] text-[var(--dl-green)] min-h-11 inline-flex items-center" aria-label="Hollis & Pine Tree Co., home">
          Hollis <i>&amp;</i> Pine
        </Link>
        <nav aria-label="Main" className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="min-h-11 inline-flex items-center text-[.9375rem] font-medium hover:underline underline-offset-8 decoration-2 decoration-[var(--dl-gold)]">{n.label}</a>
          ))}
        </nav>
        <button
          className="md:hidden min-h-11 min-w-11 px-3 inline-flex items-center justify-center gap-2 font-semibold text-[.9375rem]"
          aria-expanded={open} aria-controls="dl-mobile-nav" onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden className="flex flex-col gap-[5px]">
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </div>
      {open && (
        <nav id="dl-mobile-nav" aria-label="Mobile" className="md:hidden border-t border-[#1d2820]/15 bg-[var(--dl-cream)]">
          <ul className="dl-wrap py-2">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-lg font-medium border-b border-[#1d2820]/10">{n.label}</a></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
