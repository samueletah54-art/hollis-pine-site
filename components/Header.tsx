"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

const nav = [
  { href: "/shop", label: "Shop trees" },
  { href: "/guide", label: "Find your tree" },
  { href: "/delivery", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, setOpen, ready } = useCart();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [bump, setBump] = useState(false);
  const prev = useRef(0);

  // The cart button answers an add-to-cart: it fills briefly so you can see something changed.
  useEffect(() => {
    if (!ready) return;
    if (count > prev.current) { setBump(true); const t = setTimeout(() => setBump(false), 900); prev.current = count; return () => clearTimeout(t); }
    prev.current = count;
  }, [count, ready]);
  useEffect(() => setMenu(false), [path]);

  return (
    <header className="bg-paper sticky top-0 z-40 border-b-4 border-double border-bark/60">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10 h-16 md:h-[4.5rem] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 text-spruce" aria-label="Hollis & Pine Tree Company, home">
          <span className="leading-none">
            <span className="serif text-xl md:text-2xl block">Hollis <i>&amp;</i> Pine</span>
            <span className="label text-bark block mt-1 text-sm">Tree Company</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}
              className={`text-sm font-medium underline-offset-[10px] decoration-gold decoration-[3px] hover:underline ${path.startsWith(n.href) ? "underline" : ""}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => setOpen(true)} className={`text-sm font-semibold border-2 border-spruce px-3 py-1.5 num transition-colors duration-300 hover:bg-spruce hover:text-paper ${bump ? "bg-spruce text-paper" : "text-spruce"}`} aria-label={`Open cart, ${ready ? count : 0} items`}>
            Cart <span aria-hidden>({ready ? count : 0})</span>
          </button>
          <button className="lg:hidden label" aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu((m) => !m)}>
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menu && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden border-t rule bg-paper px-5 py-4">
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="serif text-3xl block py-1">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
