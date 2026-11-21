"use client";

import Image from "next/image";
import { useState } from "react";
import manifest from "@/lib/image-manifest.json";

// A tiny blurred cream-and-bark placeholder shown while the real photo loads.
const BLUR =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'><filter id='b' x='0' y='0' width='100%' height='100%'><feGaussianBlur stdDeviation='1.1'/></filter><rect width='8' height='5' fill='#e3d6b8'/><rect x='1' y='1' width='6' height='3' fill='#c9b58c' filter='url(#b)'/></svg>",
  );

type Props = {
  src: string; // always /images/<name>.webp
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  zoom?: boolean;
  plate?: boolean;
  /** Render nothing at all when the photo file has not been added yet (for large decorative photos). */
  hideIfMissing?: boolean;
  /** Slow push-in and breathing light (see .motion-photo in globals.css). For the one or two best photos. */
  motion?: boolean;
};

/**
 * An image slot. It loads /public/images/<name>.webp with a blurred placeholder.
 * If the file hasn't been added yet, the slot shows a quiet paper block with a small spruce mark,
 * and the site makes no request for the missing file.
 */
export default function Photo({ src, alt, sizes, priority, className = "", imgClassName = "", zoom, plate, hideIfMissing, motion }: Props) {
  const present = (manifest as string[]).includes(src);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (hideIfMissing && !present) return null;
  const pos = className.includes("absolute") ? "" : "relative";

  const inner = (
    <div className={`${plate ? "relative h-full w-full" : `${pos} ${className}`} overflow-hidden bg-paper-deep`}>
      {(!present || failed) && (
        <div className="absolute inset-0" role="img" aria-label={alt} />
      )}
      {present && !failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-[opacity,transform] duration-700 ease-out ${loaded || priority ? "opacity-100" : "opacity-0"} ${zoom ? "group-hover:scale-[1.03]" : ""} ${motion ? "motion-photo" : ""} ${imgClassName}`}
        />
      )}
    </div>
  );

  return plate ? <div className={`plate ${className}`}>{inner}</div> : inner;
}
