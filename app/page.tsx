import Link from "next/link";
import Banner from "@/components/Banner";
import CeilingFinder from "@/components/CeilingFinder";
import DrawOnView from "@/components/DrawOnView";
import Divider from "@/components/Divider";
import FarmMap from "@/components/FarmMap";
import Newsletter from "@/components/Newsletter";
import Note from "@/components/Note";
import Photo from "@/components/Photo";
import ProductTile from "@/components/ProductTile";
import Reveal from "@/components/Reveal";
import { BIZ } from "@/data/business";
import { testimonials } from "@/data/reviews";
import { all, bySlug } from "@/lib/catalog";
import { SHOW_SAMPLE_REVIEWS } from "@/lib/flags";

const get = (slugs: string[]) => slugs.map((s) => bySlug(s)!);

const steps = [
  ["We cut it", "Nothing is cut until you order. We cut it the same week it ships."],
  ["We wrap it", "Netted so the branches stay tight. Wrapped in paper. Boxed with a wet trunk."],
  ["It travels", `It leaves the farm ${BIZ.liveShipDays}. Most addresses get it in one to four days.`],
  ["You water it", "Saw off a half inch. Stand it in water within four hours. Keep the stand full."],
];

export default function Home() {
  const rowA = get(["fraser-fir", "balsam-fir", "noble-fir", "scotch-pine"]);
  const rowB = get(["classic-full-prelit", "slim-pencil-prelit", "flocked-frosted-tree", "colorado-blue-spruce"]);

  return (
    <>
      {/* MASTHEAD */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-12 md:pt-20">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="md:col-span-8">
            <h1 className="serif text-8xl">Real trees, cut the week they ship.</h1>
          </div>
          <div className="md:col-span-4 md:pb-3">
            <p className="text-lg">We cut each tree after you order it, wrap it wet, and send it to your door. Fraser, Balsam and Noble firs. Pre-lit artificial trees. Big trees for lobbies and shops.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link href="/shop" className="btn btn-primary">See the trees</Link>
              <Link href="/business" className="underline underline-offset-[6px] decoration-tan decoration-[3px] font-medium">Buying for a business?</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 md:mt-14">
        <Banner src="/images/hero-lit-tree.webp" alt="A lit Fraser fir in the corner of a cream-walled room, evening light from a window" caption="A Fraser fir, seven feet, lit and decorated" note="Same tree you'll find in the shop." priority />
      </section>

      {/* FACTS */}
      <section aria-label="How it works, in short" className="mx-auto max-w-[88rem] px-5 md:px-10 mt-12">
        <dl className="grid grid-cols-2 md:grid-cols-4 border-y-[3px] border-double border-bark/60 divide-x divide-bark/30">
          {[["Cut to order", "Never cut before you order"], ["Ships", BIZ.liveShipDays.replace("Monday, Tuesday and Wednesday", "Mon, Tue, Wed")], ["Arrives", "In 1 to 4 days"], ["Order by", BIZ.orderBy]].map(([k, v], i) => (
            <div key={k} className="px-4 py-5 text-center">
              <dt className="label text-bark">{k}</dt>
              <dd className={`serif-text text-xl mt-1 ${i === 3 ? "text-cranberry font-semibold" : ""}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CEILING FINDER: the one interactive moment */}
      <section aria-label="Find a tree for your ceiling" className="mx-auto max-w-[88rem] px-5 md:px-10 mt-20 md:mt-28">
        <CeilingFinder products={all} />
        <p className="mt-10 text-sm text-muted">Or browse by type: <Link href="/shop?type=live" className="underline underline-offset-4 decoration-tan decoration-2 text-ink">live trees</Link>, <Link href="/shop?type=artificial" className="underline underline-offset-4 decoration-tan decoration-2 text-ink">artificial trees</Link>, <Link href="/shop?room=small+space" className="underline underline-offset-4 decoration-tan decoration-2 text-ink">small spaces</Link>, <Link href="/shop?type=addon" className="underline underline-offset-4 decoration-tan decoration-2 text-ink">stands and wreaths</Link>.</p>
      </section>

      {/* FEATURED: one large tree per row, three small beside it below */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-20 md:pt-28" aria-labelledby="featured">
        <h2 id="featured" className="serif text-5xl mb-10 max-w-[18ch]">Live trees, cut the week they ship.</h2>
        <Reveal><ProductTile p={rowA[0]} feature priority /></Reveal>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 border-t-[3px] border-double border-bark/50 pt-10 mt-12">
          {rowA.slice(1).map((p) => (<li key={p.slug}><Reveal><ProductTile p={p} /></Reveal></li>))}
        </ul>

        <Divider className="my-16" />

        <h2 className="serif text-5xl mb-10 max-w-[18ch]">Artificial trees, if you'd rather not water.</h2>
        <Reveal><ProductTile p={rowB[0]} feature flip /></Reveal>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 border-t-[3px] border-double border-bark/50 pt-10 mt-12">
          {rowB.slice(1).map((p) => (<li key={p.slug}><Reveal><ProductTile p={p} /></Reveal></li>))}
        </ul>
        <p className="mt-10"><Link href="/shop" className="underline underline-offset-[6px] decoration-tan decoration-[3px] font-medium">All 30 products</Link></p>
      </section>

      <section className="mt-24 md:mt-32">
        <Banner src="/images/farm-dawn-frost.webp" alt="A fir tree in a farm field at dawn, its needles white with frost, more trees and hills behind" caption="The farm at dawn, after a hard frost" note="Cold nights make a tighter tree." />
      </section>

      {/* HOW IT GETS TO YOU */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="how">
        <h2 id="how" className="serif text-5xl max-w-[20ch]">From the field to your front door in four steps.</h2>
        <ol className="mt-14 grid md:grid-cols-4 gap-x-8 gap-y-10">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 80} className="border-t-[3px] border-double border-bark/60 pt-5">
              <span className="serif text-6xl text-tan num leading-none block" aria-hidden="true">{i + 1}</span>
              <h3 className="serif-text text-2xl mt-3">{t}</h3>
              <p className="mt-2 text-ink/85">{d}</p>
            </Reveal>
          ))}
        </ol>
        <Note className="mt-10 md:ml-[25%]">Needles settle in the first few days. That's normal. A fir shedding its inner needles is not a dying fir.</Note>
      </section>

      {/* FARM MAP */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28 md:pt-36" aria-labelledby="map">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-8 items-center">
          <div className="md:col-span-4">
            <h2 id="map" className="serif text-5xl">A walk round the farm.</h2>
            <p className="mt-5">Fraser on the cold slope. Noble up the hill. Balsam in the hollow by the creek. The barn at the bottom is where trees are cut to length, netted, wrapped and boxed.</p>
            <p className="mt-4"><Link href="/about" className="underline underline-offset-4 decoration-tan decoration-2 font-medium">More about the farm</Link></p>
          </div>
          <DrawOnView className="md:col-span-8"><FarmMap /></DrawOnView>
        </div>
      </section>

      <section className="mt-24 md:mt-32">
        <Banner src="/images/worker-carrying-tree.webp" alt="A worker in a canvas coat carrying a freshly cut fir across a frosty field, seen from behind" caption="A cut Fraser fir on its way to the barn" />
      </section>

      {/* BUSINESS */}
      <section className="bg-fir text-paper on-dark">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
          <Reveal className="md:col-span-5 md:order-2">
            <Photo src="/images/commercial-lobby.webp" alt="A twenty-foot decorated tree in a hotel lobby, marble floor, evening light" sizes="(min-width:768px) 40vw, 100vw" plate className="aspect-[4/5] !bg-paper" />
          </Reveal>
          <Reveal className="md:col-span-7 md:order-1 md:pr-8">
            <h2 className="serif text-6xl">Big trees for hotels, shops and town squares, set up and taken down for you.</h2>
            <p className="mt-6 text-lg text-paper/90 max-w-[48ch]">Nine to thirty feet. Live or artificial. We deliver, set it in a water-fed stand, anchor it and light it. After the holidays we take it down and haul it away.</p>
            <ul className="mt-8 max-w-xl divide-y divide-paper/25 border-y-[3px] border-double border-paper/40">
              {["Cut to your ceiling height", "Fire-retardant. Certificates on request", "Terms for business accounts"].map((t) => (<li key={t} className="py-3">{t}</li>))}
            </ul>
            <Link href="/business" className="btn btn-straw mt-9">Ask for a quote</Link>
          </Reveal>
        </div>
      </section>

      <section>
        <Banner src="/images/delivery-van-lane.webp" alt="A white delivery van on a snowy country lane between fir trees, early morning" caption="Out for delivery on a snowy lane" note="Live trees travel one to four days." />
      </section>

      {SHOW_SAMPLE_REVIEWS && (
        <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24" aria-labelledby="says">
          <h2 id="says" className="label text-bark mb-8">What people wrote back</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <figure key={t.name} className="border-t-[3px] border-double border-bark/60 pt-5">
                <blockquote><p className="serif-text text-xl">“{t.quote}”</p></blockquote>
                <figcaption className="mt-4 text-sm"><b>{t.name}</b>, {t.where}. <span className="text-muted">Bought: {t.bought}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* CARE */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32">
        <div className="grid md:grid-cols-12 gap-10 border-t-[3px] border-double border-bark/60 pt-10">
          <div className="md:col-span-5">
            <h2 className="serif text-5xl">Water it like you mean it.</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="serif-text text-xl">A six-foot fir drinks about a quart a day. The main reason a live tree fails is that the stand ran dry and the cut sealed over.</p>
            <ul className="mt-6 space-y-2">
              <li>Saw a half inch off the base, even if we already did.</li>
              <li>Get it into water within four hours.</li>
              <li>Check the stand every morning.</li>
            </ul>
            <Link href="/care" className="inline-block mt-6 underline underline-offset-[6px] decoration-tan decoration-[3px] font-medium">Read the care guide</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-20">
        <div className="max-w-xl"><Newsletter /></div>
      </section>
    </>
  );
}
