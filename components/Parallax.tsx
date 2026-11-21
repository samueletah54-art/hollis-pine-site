"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Moves its content a few pixels slower than the page as you scroll, so the photo feels like it sits behind the text. */
export default function Parallax({ children, className = "", strength = 0.05 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * strength}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [strength]);
  return <div ref={ref} className={className}>{children}</div>;
}
