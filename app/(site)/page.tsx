import Snow from "@/components/SnowLazy";
import Link from "next/link";
import AddOnList from "@/components/AddOnList";
import CeilingFinder from "@/components/CeilingFinder";
import Divider from "@/components/Divider";
import Newsletter from "@/components/Newsletter";
import OrderRequestForm from "@/components/OrderRequestForm";
import Photo from "@/components/Photo";
import ProductTile from "@/components/ProductTile";
import HeroPhoto from "@/components/HeroPhoto";
import FactStrip from "@/components/FactStrip";
import TrustSection from "@/components/TrustSection";
import Reviews from "@/components/Reviews";
import SizePriceList from "@/components/SizePriceList";
import { BIZ } from "@/data/business";
import type { Product } from "@/data/products";
import { all, bySlug } from "@/lib/catalog";

const get = (slugs: string[]) => slugs.map((s) => bySlug(s)!);

/** The ceiling finder runs in the browser, so only send it the fields a tile needs, not every product's full description and care text. */
const slim = (p: Product): Product => ({ ...p, description: "", inTheBox: [], care: undefined, facts: undefined, rooms: [], needlesImage: undefined, images: p.images.slice(0, 1) });

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
              <Link href="/business" className="tap underline underline-offset-[6px] decoration-gold decoration-[3px] font-medium">Buying for a business?</Link>
            </div>
          </div>
          <div className="md:col-span-5"><HeroPhoto /></div>
        </div>
      </section>

      <FactStrip />

      {/* SIZES AND PRICES */}
      <section className="mx-auto max-w-[60rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="prices">
        <h2 id="prices" className="serif text-5xl">What a tree costs.</h2>
        <p className="mt-5 text-lg max-w-[52ch]">One price per height. It includes the cutting and the wrapping. Shipping is added at checkout.</p>
        <div className="mt-10"><SizePriceList /></div>
      </section>

      <TrustSection />

      {/* CEILING FINDER */}
      <section aria-label="Find a tree for your ceiling" className="mx-auto max-w-[88rem] px-5 md:px-10 mt-24 md:mt-32">
        <CeilingFinder products={all.filter((p) => p.category === "live" || p.category === "artificial").map(slim)} />
      </section>

      {/* THE TREES */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="trees">
        <h2 id="trees" className="serif text-5xl mb-10 max-w-[18ch]">Live trees, cut the week they ship.</h2>
        <ProductTile p={rowA[0]} feature />
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

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 mt-24 md:mt-32 grid md:grid-cols-12 gap-x-12 gap-y-5 items-end">
        <figure className="md:col-span-8 md:col-start-5 md:order-2">
          <Photo motion src="/images/farm-dawn-frost.webp" alt="A fir tree in a farm field at dawn, its needles white with frost, more trees and hills behind" sizes="(min-width:768px) 62vw, 100vw" plate className="aspect-[16/9]" />
        </figure>
        <div className="md:col-span-4 md:order-1 pb-2">
          <p className="serif text-4xl max-w-[12ch]">Frost on the trees at dawn.</p>
        </div>
      </section>

      <Reviews />

      {/* BUSINESS */}
      <section className="dusk text-cream on-dark mt-24 md:mt-32"><Snow />
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
                <summary className="cursor-pointer serif-text text-xl list-none flex items-center justify-between gap-6 min-h-11">{q}<span aria-hidden className="label text-tan group-open:rotate-45 transition-transform">+</span></summary>
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
