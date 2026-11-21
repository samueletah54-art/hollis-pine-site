"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal. Off by default: sections should not all fade up. Pass `animate` for the one place it earns its keep.
 * Content is always visible without JS.
 */
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", animate = false }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "article"; animate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);
  const T = Tag as "div";
  if (!animate) return <T className={className}>{children}</T>;
  return (
    <T ref={ref} data-reveal="" className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </T>
  );
}
