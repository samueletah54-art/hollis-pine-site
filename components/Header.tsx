"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const nav = [
  { href: "/shop", label: "Trees" },
  { href: "/business", label: "For business" },
  { href: "/care", label: "Care guide" },
  { href: "/about", label: "The farm" },
];

export default function Header() {
  const { count, setOpen, ready } = useCart();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);

  return (
    <header className="border-b rule bg-paper sticky top-0 z-40">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10 h-16 md:h-[4.5rem] flex items-center justify-between gap-6">
        <Link href="/" className="leading-none" aria-label="Hollis & Pine Tree Co., home">
          <span className="serif text-[1.6rem] md:text-3xl block">Hollis <i>&amp;</i> Pine</span>
          <span className="label text-muted block mt-0.5 text-[.62rem]">Tree Co. · Est. 1987</span>
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}
              className={`text-[.95rem] underline-offset-[10px] decoration-berry decoration-2 hover:underline ${path.startsWith(n.href) ? "underline" : ""}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="text-[.95rem] border-b border-ink pb-0.5 num" aria-label={`Open cart, ${ready ? count : 0} items`}>
            Cart <span aria-hidden>({ready ? count : 0})</span>
          </button>
          <button className="md:hidden label ml-2" aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu((m) => !m)}>
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menu && (
        <nav id="mobile-nav" aria-label="Mobile" className="md:hidden border-t rule bg-paper px-5 py-4">
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="serif text-3xl block py-1">{n.label}</Link></li>
            ))}
            <li><Link href="/contact" className="serif text-3xl block py-1">Contact</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
