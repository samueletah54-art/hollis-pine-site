"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { priceLines, shipping, subtotal, type CartLine, type Priced } from "@/lib/pricing";

type Ctx = {
  lines: CartLine[];
  priced: Priced[];
  count: number;
  subtotal: number;
  shipping: number;
  ready: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: CartLine, openDrawer?: boolean) => void;
  setQty: (slug: string, sizeId: string, option: string | undefined, qty: number) => void;
  remove: (slug: string, sizeId: string, option?: string) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "hollis-pine-cart-v1";
const same = (a: CartLine, slug: string, sizeId: string, option?: string) => a.slug === slug && a.sizeId === sizeId && (a.option ?? "") === (option ?? "");

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, ready]);

  const add = useCallback((line: CartLine, openDrawer = true) => {
    setLines((cur) => {
      const i = cur.findIndex((l) => same(l, line.slug, line.sizeId, line.option));
      if (i === -1) return [...cur, line];
      const next = [...cur];
      next[i] = { ...next[i], qty: Math.min(20, next[i].qty + line.qty) };
      return next;
    });
    if (openDrawer) setOpen(true);
  }, []);

  const setQty = useCallback((slug: string, sizeId: string, option: string | undefined, qty: number) => {
    setLines((cur) => cur.flatMap((l) => (same(l, slug, sizeId, option) ? (qty <= 0 ? [] : [{ ...l, qty: Math.min(20, qty) }]) : [l])));
  }, []);
  const remove = useCallback((slug: string, sizeId: string, option?: string) => setLines((cur) => cur.filter((l) => !same(l, slug, sizeId, option))), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<Ctx>(() => {
    const priced = priceLines(lines);
    return {
      lines, priced, ready, open, setOpen, add, setQty, remove, clear,
      count: priced.reduce((n, x) => n + x.line.qty, 0),
      subtotal: subtotal(priced),
      shipping: shipping(priced),
    };
  }, [lines, ready, open, add, setQty, remove, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
};
