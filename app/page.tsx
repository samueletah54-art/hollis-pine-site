import Link from "next/link";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import ProductTile from "@/components/ProductTile";
import Newsletter from "@/components/Newsletter";
import { all, bySlug } from "@/lib/catalog";
import { testimonials } from "@/data/reviews";

const featuredSlugs = ["fraser-fir", "balsam-fir", "noble-fir", "colorado-blue-spruce", "classic-full-prelit", "slim-pencil-prelit"];

const steps = [
  { n: "1", t: "Cut to order", d: "Nothing is cut until you order. We cut it Monday, Tuesday or Wednesday, the same week it ships." },
  { n: "2", t: "Netted and wrapped", d: "Netted so the branches stay tight, wrapped in breathable paper, boxed with a wet trunk." },
  { n: "3", t: "Ships in 1–3 days", d: "Overnight to two days for most of the country. Live trees never sit in a warehouse over a weekend." },
  { n: "4", t: "Fresh-cut it and water it", d: "Saw off a half inch, put it in water within four hours, and keep the bowl full." },
];

export default function Home() {
  const featured = featuredSlugs.map((s) => bySlug(s)!);
  const [big, ...rest] = featured;

  return (
    <>
      {/* HERO */}
      <section className="relative border-b rule">
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch">
          <div className="px-5 md:pl-10 lg:pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] md:pr-12 pt-12 pb-14 md:pt-28 md:pb-24 order-2 md:order-1">
            <p className="label text-berry mb-6">Family-grown · Cut to order · Since 1987</p>
            <h1 className="serif text-[3.1rem] sm:text-6xl lg:text-[5.4rem] leading-[0.95]">
              Real trees, cut for the <i className="text-berry">week</i> you need them.
            </h1>
            <p className="mt-7 text-lg md:text-xl max-w-[34ch] text-ink/85">
              Family-grown Fraser, Balsam and Noble firs, plus pre-lit artificial trees, shipped across the U.S.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/shop" className="btn btn-primary">Shop trees</Link>
              <Link href="/business" className="underline underline-offset-[6px] decoration-berry decoration-2 font-medium">Buying for a business?</Link>
            </div>
          </div>
          <div className="relative order-1 md:order-2 min-h-[22rem] md:min-h-[44rem] md:-mb-px">
            <Photo
              src="/images/hero.jpg"
              alt="A lit Fraser fir in a lived-in living room at dusk, a dog asleep at its base"
              sizes="(min-width:768px) 58vw, 100vw"
              priority
              className="absolute inset-0"
              imgClassName="object-[60%_50%]"
            />
            <div className="absolute left-5 bottom-6 md:-left-10 md:bottom-14 bg-paper border border-ink px-4 py-3 -rotate-3 shadow-none max-w-[15rem]" aria-hidden="true">
              <p className="label text-berry">Tag no. 4418</p>
              <p className="serif-text text-lg leading-tight mt-1">Fraser fir, 7–8 ft. Cut Mon., Nov. 30, Ashe County, NC.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FIND YOUR TREE */}
      <section aria-labelledby="find" className="border-b rule">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-6 grid md:grid-cols-[auto_1fr_1fr_1fr] gap-y-5 md:gap-x-10 items-baseline">
          <h2 id="find" className="label text-berry">Find your tree</h2>
          <p><span className="label text-muted mr-3">By height</span>
            <Link href="/shop?height=under6" className="underline underline-offset-4 mr-3">under 6</Link>
            <Link href="/shop?height=6-7" className="underline underline-offset-4 mr-3">6–7</Link>
            <Link href="/shop?height=7-8" className="underline underline-offset-4 mr-3">7–8</Link>
            <Link href="/shop?height=8plus" className="underline underline-offset-4">8+</Link></p>
          <p><span className="label text-muted mr-3">By type</span>
            <Link href="/shop?type=live" className="underline underline-offset-4 mr-3">Live</Link>
            <Link href="/shop?type=artificial" className="underline underline-offset-4">Artificial</Link></p>
          <p><span className="label text-muted mr-3">By room</span>
            <Link href="/shop?room=living+room" className="underline underline-offset-4 mr-3">Living room</Link>
            <Link href="/shop?room=small+space" className="underline underline-offset-4 mr-3">Small space</Link>
            <Link href="/shop?room=entryway" className="underline underline-offset-4">Entryway</Link></p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-20 md:pt-28" aria-labelledby="featured">
        <Reveal className="flex items-end justify-between gap-6 border-b rule pb-4 mb-10">
          <h2 id="featured" className="serif text-4xl md:text-6xl leading-none">What's on the farm <i>this week</i></h2>
          <Link href="/shop" className="hidden sm:block underline underline-offset-[6px] decoration-berry decoration-2 whitespace-nowrap">All {all.length} products</Link>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-x-6">
          <Reveal className="col-span-2 lg:row-span-2"><ProductTile p={big} size="lg" /></Reveal>
          {rest.slice(0, 4).map((p, i) => (<Reveal key={p.slug} delay={i * 60} className={i % 2 ? "lg:mt-14" : ""}><ProductTile p={p} /></Reveal>))}
        </div>
        <div className="mt-12 border-t border-b rule py-8 grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <p className="serif-text text-2xl md:text-3xl max-w-[32ch]">Twelve kinds of live tree, five artificial, and everything you need to keep them standing.</p>
          <Link href="/shop" className="btn btn-ghost">See everything</Link>
        </div>
      </section>

      {/* HOW IT GETS TO YOU */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28 md:pt-40" aria-labelledby="how">
        <Reveal className="grid md:grid-cols-12 gap-6">
          <p className="label text-berry md:col-span-3">How a live tree gets to you</p>
          <h2 id="how" className="serif text-4xl md:text-6xl leading-[1] md:col-span-8">From the field to your living room in about four days.</h2>
        </Reveal>
        <ol className="mt-14 grid md:grid-cols-4 gap-x-8 gap-y-12 border-t rule pt-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 80} className={i % 2 ? "md:mt-14" : ""}>
              <span className="serif text-[6.5rem] leading-[.8] text-brass block" aria-hidden="true">{s.n}</span>
              <h3 className="serif-text text-2xl mt-3">{s.t}</h3>
              <p className="mt-2 text-ink/80">{s.d}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-14 md:ml-[25%] max-w-[52ch] border-l-2 border-berry pl-5 serif-text text-lg italic">
          Needles settle for the first few days. That's normal. A fir shaking off its inner needles is not a dying fir.
        </p>
      </section>

      {/* PHOTO BREAK */}
      <section className="mt-28 md:mt-40" aria-hidden="true">
        <Photo src="/images/farm-rows.jpg" alt="Rows of Fraser firs on a hillside farm at golden hour, low mist" sizes="100vw" className="h-[46vh] md:h-[68vh]" />
      </section>

      {/* BUSINESS */}
      <section className="bg-fir text-paper on-dark">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-32 grid md:grid-cols-12 gap-10 items-center">
          <Reveal className="md:col-span-5 md:order-2">
            <Photo src="/images/commercial-lobby.jpg" alt="A 20-foot decorated tree in a hotel lobby atrium with guests walking by" sizes="(min-width:768px) 40vw, 100vw" className="aspect-[4/5]" />
          </Reveal>
          <Reveal className="md:col-span-7 md:order-1 md:pr-10">
            <p className="label text-brass mb-5">For lobbies, malls, restaurants, offices and town squares</p>
            <h2 className="serif text-5xl md:text-7xl leading-[.95]">Trees for lobbies, malls and storefronts.</h2>
            <p className="mt-6 text-lg text-paper/85 max-w-[48ch]">Nine to thirty feet, live-cut or commercial-grade artificial, fire-retardant, delivered by a crew that sets it, anchors it, lights it and takes it down on January 2nd.</p>
            <ul className="mt-8 border-t border-paper/25 divide-y divide-paper/25 max-w-xl">
              {["9–30 ft, cut to your ceiling", "Install and takedown, haul-away included", "Net-30 for approved accounts"].map((t) => (
                <li key={t} className="py-3 flex items-baseline gap-4"><span className="label text-brass">+</span>{t}</li>
              ))}
            </ul>
            <Link href="/business" className="btn btn-brass mt-10">Request a quote</Link>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-36" aria-labelledby="says">
        <h2 id="says" className="label text-berry mb-10">What people wrote back</h2>
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-12">
          <Reveal as="article" className="md:col-span-7 border-t-2 border-ink pt-6">
            <blockquote><p className="serif text-3xl md:text-5xl leading-[1.05]">“{testimonials[0].quote}”</p></blockquote>
            <p className="mt-6 text-sm"><b>{testimonials[0].name}</b>, {testimonials[0].where}. <span className="text-muted">Bought: {testimonials[0].bought}</span></p>
          </Reveal>
          <div className="md:col-span-5 space-y-12">
            {testimonials.slice(1).map((t, i) => (
              <Reveal key={t.name} as="article" delay={i * 90} className="border-t rule pt-5">
                <blockquote><p className="serif-text text-xl md:text-2xl leading-snug">“{t.quote}”</p></blockquote>
                <p className="mt-4 text-sm"><b>{t.name}</b>, {t.where}. <span className="text-muted">Bought: {t.bought}</span></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CARE TEASER */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28 md:pt-40">
        <div className="grid md:grid-cols-12 gap-10 border-t border-ink pt-10">
          <div className="md:col-span-5">
            <p className="label text-berry mb-4">The care guide</p>
            <h2 className="serif text-4xl md:text-6xl leading-none">Water it like you mean it.</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="serif-text text-xl md:text-2xl leading-snug">A six-foot fir drinks a quart a day. The single biggest reason a live tree fails is that the bowl ran dry and the cut sealed over.</p>
            <ul className="mt-6 space-y-2 border-t rule pt-5">
              <li>Cut a half inch off the base. Even if we already did.</li>
              <li>In water within four hours.</li>
              <li>Check it twice a day for the first week.</li>
            </ul>
            <Link href="/care" className="inline-block mt-6 underline underline-offset-[6px] decoration-berry decoration-2 font-medium">Read the whole guide</Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24">
        <div className="max-w-xl"><Newsletter /></div>
      </section>
    </>
  );
}
