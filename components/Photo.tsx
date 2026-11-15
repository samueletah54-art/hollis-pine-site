"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import manifest from "@/lib/image-manifest.json";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** extra classes on the <img>, e.g. object-position */
  imgClassName?: string;
  zoom?: boolean;
  grain?: boolean;
};

/**
 * A photo with a quiet paper-toned block behind it. If the file isn't in /public/images yet,
 * the block stays and its alt text is printed as a small caption. No gray boxes, no placeholder services.
 */
export default function Photo({ src, alt, sizes, priority, className = "", imgClassName = "", zoom, grain = true }: Props) {
  const present = (manifest as string[]).includes(src);
  const [failed, setFailed] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = wrap.current?.querySelector("img");
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div ref={wrap} className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden bg-ink/[0.06] ${grain && present && !failed ? "grain" : ""} ${className}`}>
      <div className="absolute inset-0 flex items-end p-4 border border-ink/10" aria-hidden={present && !failed}>
        <span className="label text-muted max-w-[28ch] leading-snug">{alt}</span>
      </div>
      {present && !failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={`object-cover ${zoom ? "transition-transform duration-700 ease-out group-hover:scale-[1.03]" : ""} ${imgClassName}`}
        />
      )}
    </div>
  );
}
