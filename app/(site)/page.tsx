import Link from "next/link";
import AddOnList from "@/components/AddOnList";
import CeilingFinder from "@/components/CeilingFinder";
import Divider from "@/components/Divider";
import Newsletter from "@/components/Newsletter";
import OrderRequestForm from "@/components/OrderRequestForm";
import Parallax from "@/components/Parallax";
import Photo from "@/components/Photo";
import ProductTile from "@/components/ProductTile";
import PromoStamp from "@/components/PromoStamp";
import SizePriceList from "@/components/SizePriceList";
import { BIZ } from "@/data/business";
import { testimonials } from "@/data/reviews";
import { all, bySlug } from "@/lib/catalog";
import { SHOW_SAMPLE_REVIEWS } from "@/lib/flags";

const get = (slugs: string[]) => slugs.map((s) => bySlug(s)!);

const steps = [
  ["We cut it.", "Nothing is cut until you order. We cut it the week it ships."],
  ["We wrap it.", `Netted, with the trunk kept wet. It leaves on ${BIZ.liveShipDays}, so it never sits in a depot over a weekend.`],
  ["You stand it in water.", "It reaches most doors in one to four days. Saw a half inch off the base, put it in water within four hours, and keep the stand full."],
];

const faqs: [string, string][] = [
  ["Where do you deliver?", "To the 48 contiguous states. We can't ship live trees to Alaska, Hawaii or a P.O. box."],
  ["How do I look after it?", "Saw a half inch off the base and stand it in water within four hours. A six-foot tree drinks about a quart a day, so check the stand every morning."],
  ["When will it arrive?", `Live trees leave on ${BIZ.liveShipDays} and arrive in one to four days. Order by ${BIZ.orderBy} for delivery before Christmas.`],
  ["What if it arrives damaged?", "Send us photos within 48 hours. We'll replace it or refund it. Live trees can't be returned for a change of mind."],
];

export default function Home() {
  const rowA = get(["fraser-fir", "balsam-fir", "nordmann-fir", "colorado-blue-spruce"]);
  const art = bySlug("classic-full-prelit")!;
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-10 md:pt-16">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-10 items-center">
          <div className="md:col-span-7">
            <h1 className="serif text-8xl">Real trees, cut the week they ship.</h1>
            <p className="mt-7 text-lg max-w-[44ch]">We cut each tree after you order it, wrap it wet, and put it on a truck to your door. Most people have it in a few days.</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/shop" className="btn btn-primary">Shop trees</Link>
              <Link href="/business" className="underline underline-offset-[6px] decoration-gold decoration-[3px] font-medium">Buying for a business?</Link>
            </div>
          </div>
          <Parallax className="md:col-span-5 relative">
            <PromoStamp />
            <Photo motion src="/images/delivered-netted-tree-lit.webp" alt="A netted fir tree standing on a porch in front of a door with a wreath, warm light from inside" sizes="(min-width:768px) 40vw, 100vw" priority plate className="aspect-[4/5]" />
          </Parallax>
        </div>
      </section>

      <section aria-label="In short" className="mx-auto max-w-[88rem] px-5 md:px-10 mt-12">
        <dl className="grid grid-cols-2 md:grid-cols-4 border-y-[3px] border-double border-bark/60 divide-x divide-bark/30">
          {[["Cut to order", "Never cut before you order"], ["Ships", "Mon, Tue, Wed"], ["Arrives", "In 1 to 4 days"], ["Order by", BIZ.orderBy]].map(([k, v], i) => (
            <div key={k} className="px-4 py-5 text-center">
              <dt className="label text-bark">{k}</dt>
              <dd className={`serif-text text-xl mt-1 ${i === 3 ? "text-sale font-semibold" : ""}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* SIZES AND PRICES */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="prices">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-8">
          <div className="md:col-span-4">
            <h2 id="prices" className="serif text-5xl">What a tree costs.</h2>
            <p className="mt-5 text-lg max-w-[34ch]">One price per height. It includes the cutting and the wrapping. Shipping is added at checkout.</p>
          </div>
          <div className="md:col-span-8"><SizePriceList /></div>
        </div>
      </section>

      {/* CEILING FINDER */}
      <section aria-label="Find a tree for your ceiling" className="mx-auto max-w-[88rem] px-5 md:px-10 mt-24 md:mt-32">
        <CeilingFinder products={all} />
      </section>

      {/* THE TREES */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="trees">
        <h2 id="trees" className="serif text-5xl mb-10 max-w-[18ch]">Live trees, cut the week they ship.</h2>
        <ProductTile p={rowA[0]} feature priority />
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 border-t-[3px] border-double border-bark/50 pt-10 mt-12">
          {rowA.slice(1).map((p) => (<li key={p.slug}><ProductTile p={p} /></li>))}
        </ul>

        <Divider className="my-16" />

        <h2 className="serif text-5xl mb-10 max-w-[20ch]">Artificial, if you'd rather not water.</h2>
        <ProductTile p={art} feature flip />
        <p className="mt-10"><Link href="/shop" className="underline underline-offset-[6px] decoration-gold decoration-[3px] font-medium">See all {all.length} products</Link></p>
      </section>

      {/* ADD-ONS */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="addons">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-8">
          <div className="md:col-span-4">
            <h2 id="addons" className="serif text-5xl">A stand, a wreath, and the rest.</h2>
            <p className="mt-5 text-lg max-w-[34ch]">A tree needs somewhere to stand. Most people add one of these.</p>
          </div>
          <div className="md:col-span-8"><AddOnList /></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="how">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-10 items-start">
          <div className="md:col-span-7">
            <h2 id="how" className="serif text-5xl max-w-[16ch]">How it gets to you.</h2>
            <ol className="mt-10 border-t-[3px] border-double border-bark/60">
              {steps.map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[3.5rem_1fr] gap-x-4 py-6 border-b rule">
                  <span className="serif text-5xl text-tan num leading-none" aria-hidden="true">{i + 1}</span>
                  <div><h3 className="serif-text text-2xl">{t}</h3><p className="mt-1 text-ink/90 max-w-[50ch]">{d}</p></div>
                </li>
              ))}
            </ol>
            <p className="mt-6"><Link href="/delivery" className="underline underline-offset-[6px] decoration-gold decoration-[3px] font-medium">Delivery days, cut-off dates and what we cover</Link></p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-5">
            <Photo src="/images/delivered-netted-tree.webp" alt="A netted fir tree standing on a porch beside a front door with a wreath" sizes="(min-width:768px) 20vw, 45vw" plate className="aspect-[3/4]" />
            <Photo src="/images/delivered-netted-tree-snow.webp" alt="A netted fir tree on a snowy step in front of a tan front door with a wreath" sizes="(min-width:768px) 20vw, 45vw" plate className="aspect-[3/4] mt-10" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 mt-24 md:mt-32 grid md:grid-cols-12 gap-x-12 gap-y-5 items-end">
        <figure className="md:col-span-8 md:col-start-5 md:order-2">
          <Photo motion src="/images/farm-dawn-frost.webp" alt="A fir tree in a farm field at dawn, its needles white with frost, more trees and hills behind" sizes="(min-width:768px) 62vw, 100vw" plate className="aspect-[16/9]" />
        </figure>
        <div className="md:col-span-4 md:order-1 pb-2">
          <p className="serif text-4xl max-w-[12ch]">Frost on the trees at dawn.</p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="says">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-8">
          <h2 id="says" className="serif text-5xl md:col-span-4">What people say.</h2>
          <div className="md:col-span-8">
            {SHOW_SAMPLE_REVIEWS ? (
              <>
                <p className="label text-sale mb-4">Sample text. Replace with real reviews before launch.</p>
                <div className="grid sm:grid-cols-3 gap-8">
                  {testimonials.map((t) => (
                    <figure key={t.name} className="border-t-[3px] border-double border-bark/60 pt-4">
                      <blockquote><p className="serif-text text-lg">“{t.quote}”</p></blockquote>
                      <figcaption className="mt-3 text-sm"><b>{t.name}</b>, {t.where}</figcaption>
                    </figure>
                  ))}
                </div>
              </>
            ) : (
              <div className="border-t-[3px] border-double border-bark/60 pt-6 max-w-[52ch]">
                <p className="serif-text text-2xl">No reviews yet.</p>
                <p className="mt-3">We'd rather show you real ones than made-up ones. If you've bought a tree from us, <a href={`mailto:${BIZ.email}?subject=My tree`} className="underline underline-offset-4 decoration-gold decoration-2">tell us how it went</a>.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BUSINESS */}
      <section className="bg-fir text-cream on-dark mt-24 md:mt-32">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-16 md:py-20 grid md:grid-cols-12 gap-x-12 gap-y-6 items-center">
          <h2 className="serif text-5xl md:col-span-7">Need a big one for a lobby, a shop or a square?</h2>
          <div className="md:col-span-5">
            <p className="text-lg text-cream/90">Nine to thirty feet, live or artificial. We deliver it, set it up and take it down.</p>
            <Link href="/business" className="btn btn-straw mt-6">Ask for a quote</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="faq">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-8">
          <h2 id="faq" className="serif text-5xl md:col-span-4">Questions people ask.</h2>
          <div className="md:col-span-8 border-t-[3px] border-double border-bark/60">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-b rule py-4">
                <summary className="cursor-pointer serif-text text-xl list-none flex justify-between gap-6">{q}<span aria-hidden className="label text-tan group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-3 max-w-[58ch] text-ink/90">{a}</p>
              </details>
            ))}
            <p className="mt-6"><Link href="/faq" className="underline underline-offset-[6px] decoration-gold decoration-[3px] font-medium">All the questions</Link></p>
          </div>
        </div>
      </section>

      {/* ORDER REQUEST */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="order">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-8">
          <div className="md:col-span-4">
            <h2 id="order" className="serif text-5xl">Rather write to us?</h2>
            <p className="mt-5 text-lg max-w-[34ch]">Tell us what you're after and we'll write back, usually the same day. Or call {BIZ.phone}.</p>
          </div>
          <div className="md:col-span-8"><OrderRequestForm /></div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-20">
        <div className="max-w-xl"><Newsletter /></div>
      </section>
    </>
  );
}
