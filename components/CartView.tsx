"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";
import { money } from "@/lib/catalog";
import { FREE_SHIPPING_ARTIFICIAL } from "@/lib/pricing";

export default function CartView() {
  const { priced, subtotal, shipping, setQty, remove, ready } = useCart();
  if (!ready) return <p className="py-16 text-muted">One moment…</p>;
  if (!priced.length)
    return (
      <div className="py-16 max-w-md">
        <p className="serif text-4xl">Your cart is empty.</p>
        <p className="mt-3 text-muted">Live trees ship Monday through Wednesday. There's time.</p>
        <Link href="/shop" className="btn btn-primary mt-6">Browse the trees</Link>
      </div>
    );
  const needs = Math.max(0, FREE_SHIPPING_ARTIFICIAL - subtotal);
  return (
    <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 mt-8">
      <ul className="lg:col-span-8 divide-y rule border-b rule">
        {priced.map((x) => (
          <li key={`${x.line.slug}-${x.line.sizeId}-${x.line.option ?? ""}`} className="py-6 grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_6rem] gap-x-6 gap-y-3 items-center">
            <div>
              <Link href={x.category === "addon" ? `/extras/${x.line.slug}` : `/trees/${x.line.slug}`} className="serif-text text-2xl leading-tight underline-offset-4 hover:underline">{x.name}</Link>
              <p className="text-sm text-muted">{x.sizeLabel}{x.optionLabel ? `, ${x.optionLabel}` : ""}. <span className="num">{money(x.unit)}</span> each</p>
              <button onClick={() => remove(x.line.slug, x.line.sizeId, x.line.option)} className="text-sm underline underline-offset-4 decoration-tan mt-2">Remove</button>
            </div>
            <QtyStepper value={x.line.qty} onChange={(q) => setQty(x.line.slug, x.line.sizeId, x.line.option, q)} label={x.name} />
            <p className="num text-right font-medium col-span-2 sm:col-span-1">{money(x.total)}</p>
          </li>
        ))}
      </ul>
      <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start border border-ink p-6" aria-label="Order summary">
        <h2 className="label text-bark">Summary</h2>
        <dl className="mt-4 space-y-2 num">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : money(shipping)}</dd></div>
          <div className="flex justify-between text-muted text-sm"><dt>Sales tax</dt><dd>At checkout</dd></div>
          <div className="flex justify-between border-t-[3px] border-double border-bark/60 pt-3 mt-3 serif-text text-xl"><dt>Total before tax</dt><dd>{money(subtotal + shipping)}</dd></div>
        </dl>
        {priced.some((x) => x.category === "artificial") && needs > 0 && <p className="text-sm text-muted mt-3">Add {money(needs)} and artificial trees ship free.</p>}
        <Link href="/checkout" className="btn btn-primary w-full mt-6">Check out</Link>
        <p className="text-xs text-muted mt-4">Order by Dec 12 for delivery before Christmas. U.S. shipping only (48 contiguous states).</p>
      </aside>
    </div>
  );
}
