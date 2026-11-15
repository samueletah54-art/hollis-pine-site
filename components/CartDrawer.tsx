"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { money } from "@/lib/catalog";
import { savings as savingsOf } from "@/lib/pricing";
import { FREE_SHIPPING_ARTIFICIAL } from "@/lib/pricing";
import QtyStepper from "./QtyStepper";

export default function CartDrawer() {
  const { open, setOpen, priced, subtotal, shipping, setQty, remove, count } = useCart();
  const panel = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input,select");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, [open, setOpen]);

  const needsForFree = Math.max(0, FREE_SHIPPING_ARTIFICIAL - subtotal);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-fir/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        inert={!open}
        className={`absolute right-0 top-0 h-full w-full max-w-[26rem] bg-paper border-l border-ink flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-baseline justify-between px-6 pt-6 pb-4 border-b rule">
          <h2 className="serif text-3xl">Your cart <span className="num text-muted text-xl">({count})</span></h2>
          <button ref={closeBtn} onClick={() => setOpen(false)} className="label underline underline-offset-4 decoration-tan">Close</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {priced.length === 0 ? (
            <div className="py-12">
              <p className="serif-text text-xl">Nothing in here yet.</p>
              <p className="text-muted mt-2">Live trees ship Monday through Wednesday, so there's time.</p>
              <Link href="/shop" onClick={() => setOpen(false)} className="btn btn-ghost mt-6">Browse the trees</Link>
            </div>
          ) : (
            <ul className="divide-y rule border-b-0">
              {priced.map((x) => (
                <li key={`${x.line.slug}-${x.line.sizeId}-${x.line.option ?? ""}`} className="py-5 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2">
                  <div>
                    <p className="serif-text text-lg leading-tight">{x.name}</p>
                    <p className="text-sm text-muted">{x.sizeLabel}{x.optionLabel ? `, ${x.optionLabel}` : ""}</p>
                  </div>
                  <p className="num font-medium text-right">{x.originalUnit > x.unit && <s className="block text-sm text-muted font-normal">{money(x.originalUnit * x.line.qty)}</s>}{money(x.total)}</p>
                  <QtyStepper value={x.line.qty} onChange={(q) => setQty(x.line.slug, x.line.sizeId, x.line.option, q)} label={x.name} />
                  <button onClick={() => remove(x.line.slug, x.line.sizeId, x.line.option)} className="text-sm underline underline-offset-4 decoration-tan justify-self-end">Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {priced.length > 0 && (
          <div className="px-6 py-5 border-t-[3px] border-double border-bark/60 bg-paper">
            <dl className="text-sm space-y-1 num">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
              {savingsOf(priced) > 0 && <div className="flex justify-between text-cranberry font-semibold"><dt>Black Friday savings</dt><dd>−{money(savingsOf(priced))}</dd></div>}
              <div className="flex justify-between"><dt>Shipping (estimate)</dt><dd>{shipping === 0 ? "Free" : money(shipping)}</dd></div>
            </dl>
            {priced.some((x) => x.category === "artificial") && needsForFree > 0 && (
              <p className="text-sm text-muted mt-2">Add {money(needsForFree)} and artificial trees ship free.</p>
            )}
            <p className="text-xs text-muted mt-2">Sales tax is added at checkout where it applies.</p>
            <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-primary w-full mt-4">Check out</Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="block text-center text-sm underline underline-offset-4 mt-3">View full cart</Link>
          </div>
        )}
      </aside>
    </div>
  );
}
