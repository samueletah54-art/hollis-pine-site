"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** The one orchestrated moment on the home page: the farm map's fields come in one after another when it scrolls into view. */
export default function DrawOnView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} data-draw="" className={className}>{children}</div>;
}
