"use client";

import { useEffect, useRef } from "react";

/** Gentle canvas snowfall that fills its (relative) parent. Pauses off-screen; static when reduced motion is on. */
export default function Snow({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true, t = 0;
    type Flake = { x: number; y: number; r: number; v: number; s: number; p: number };
    let flakes: Flake[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(count * Math.min(1, w / 900 + 0.35));
      flakes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 2.2, v: 0.25 + Math.random() * 0.7, s: 0.3 + Math.random() * 0.8, p: Math.random() * 6.28 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        ctx.globalAlpha = 0.35 + f.r / 4;
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.28); ctx.fill();
        if (!reduce) {
          f.y += f.v; f.x += Math.sin(t / 60 + f.p) * f.s * 0.5;
          if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w; }
        }
      }
      t++;
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible && !reduce) raf = requestAnimationFrame(draw); });
    io.observe(cv);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, [count]);
  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}
