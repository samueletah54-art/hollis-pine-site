import { reviews as all, type Review } from "@/data/reviews";

/**
 * Customer reviews, read from data/reviews.ts. Renders NOTHING when there are none (no heading, no empty-state message).
 * Pass `slug` to show only the reviews for one product.
 */
export default function Reviews({ slug, heading = "What people say.", nested }: { slug?: string; heading?: string; nested?: boolean }) {
  const list: Review[] = slug ? all.filter((r) => r.slug === slug) : all;
  if (list.length === 0) return null;
  return (
    <section className={nested ? "mt-24" : "mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32"} aria-labelledby="reviews-h">
      <div className="grid md:grid-cols-12 gap-x-12 gap-y-8">
        <h2 id="reviews-h" className="serif text-5xl md:col-span-4">{heading}</h2>
        <ul className="md:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((r) => (
            <li key={`${r.name}-${r.date}`} className="border-t-[3px] border-double border-bark/60 pt-4">
              <figure>
                <p className="label text-tan"><span className="sr-only">Rated </span>{r.rating} of 5</p>
                {r.title && <p className="serif-text text-xl mt-1">{r.title}</p>}
                <blockquote className="mt-2"><p>“{r.body}”</p></blockquote>
                <figcaption className="mt-3 text-sm"><b>{r.name}</b>{r.where ? `, ${r.where}` : ""}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
