"use client";

import { useState } from "react";
import Photo from "./Photo";

type Img = { src: string; alt: string };

export default function Gallery({ images }: { images: Img[] }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const cur = images[i];

  return (
    <div>
      <div
        className={`relative aspect-[4/5] overflow-hidden plate ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        onMouseMove={(e) => {
          if (!zoom) return;
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        onMouseLeave={() => setZoom(false)}
      >
        <button type="button" aria-pressed={zoom} aria-label={zoom ? "Zoom out" : "Zoom in on photo"} onClick={() => setZoom((z) => !z)} className="absolute inset-0 z-10" />
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: zoom ? "scale(2.1)" : "scale(1)", transformOrigin: origin }}>
          <Photo key={cur.src} src={cur.src} alt={cur.alt} sizes="(min-width:1024px) 52vw, 100vw" priority={i === 0} className="absolute inset-0" />
        </div>
        <span className="absolute right-3 bottom-3 z-20 label bg-paper px-2 py-1 border border-ink/70 pointer-events-none">{zoom ? "Click to zoom out" : "Click to zoom"}</span>
      </div>
      {images.length > 1 && (
        <ul className="flex gap-3 mt-3" aria-label="Photos">
          {images.map((im, n) => (
            <li key={im.src} className="w-20 md:w-24">
              <button onClick={() => { setI(n); setZoom(false); }} aria-label={`Show photo ${n + 1}`} aria-current={n === i} className={`block w-full border ${n === i ? "border-spruce border-2" : "border-ink/25"}`}>
                <Photo src={im.src} alt="" sizes="96px" className="aspect-square" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
