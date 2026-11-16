"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "#trees", label: "Trees" },
  { href: "#how", label: "How it works" },
  { href: "#areas", label: "Areas we deliver" },
  { href: "#book", label: "Book delivery" },
];

export default function UkHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--uk-cream)] border-b border-[#1d2820]/15">
      <div className="uk-wrap flex items-center justify-between h-16 md:h-20">
        <Link href="/london" className="serif-uk text-2xl md:text-[1.75rem] text-[var(--uk-green)] min-h-11 inline-flex items-center" aria-label="Hollis & Pine London, home">
          Hollis <i>&amp;</i> Pine <span className="ml-3 text-[.75rem] font-[family-name:var(--font-inter)] tracking-[.18em] uppercase text-[var(--uk-muted)] hidden sm:inline">London</span>
        </Link>
        <nav aria-label="Main" className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="min-h-11 inline-flex items-center text-[.9375rem] font-medium hover:underline underline-offset-8 decoration-2 decoration-[var(--uk-gold)]">{n.label}</a>
          ))}
        </nav>
        <button
          className="md:hidden min-h-11 min-w-11 px-3 inline-flex items-center justify-center gap-2 font-semibold text-[.9375rem]"
          aria-expanded={open} aria-controls="uk-mobile-nav" onClick={() => setOpen((o) => !o)}
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
        <nav id="uk-mobile-nav" aria-label="Mobile" className="md:hidden border-t border-[#1d2820]/15 bg-[var(--uk-cream)]">
          <ul className="uk-wrap py-2">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-lg font-medium border-b border-[#1d2820]/10">{n.label}</a></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
