import Photo from "./Photo";

/** A full-bleed 16:9 photo band with a printed caption underneath. */
export default function Banner({ src, alt, caption, note, priority, tall }: { src: string; alt: string; caption: string; note?: string; priority?: boolean; tall?: boolean }) {
  return (
    <figure className="w-full">
      <Photo src={src} alt={alt} sizes="100vw" priority={priority} className={`w-full aspect-[16/9] ${tall ? "" : "max-h-[78vh]"}`} />
      <figcaption className="mx-auto max-w-[88rem] px-5 md:px-10 pt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
        <span className="label text-bark">{caption}</span>
        {note && <span className="hand text-xl text-bark">{note}</span>}
      </figcaption>
    </figure>
  );
}
