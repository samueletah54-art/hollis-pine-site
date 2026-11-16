import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import DlTreeCard from "@/components/delivery/DlTreeCard";
import DlBookingForm from "@/components/delivery/DlBookingForm";
import DlStickyCta from "@/components/delivery/DlStickyCta";
import Reveal from "@/components/Reveal";
import { bySlug } from "@/lib/catalog";
import { BIZ } from "@/data/business";
import type { Product } from "@/data/products";

export const metadata: Metadata = {
  title: "Fresh-cut Christmas trees delivered to your door | Hollis & Pine",
  description: "Fraser, Balsam and Nordmann firs cut to order and shipped fresh to the 48 contiguous states. Choose your tree and order online.",
  alternates: { canonical: "/tree-delivery" },
};

const featured = ["fraser-fir", "balsam-fir", "nordmann-fir", "colorado-blue-spruce"].map(bySlug).filter((p): p is Product => !!p);

const benefits = [
  <>Fresh-cut firs, <b>cut the week they ship</b></>,
  <>Live trees ship Monday to Wednesday, so they never sit in a warehouse over a weekend</>,
  <>Shipping from <b>$24</b> on live trees, and <b>free</b> on artificial trees over $250</>,
  <>Optional water-reservoir stand, so it's ready to go up when it arrives</>,
  <>Delivered to the 48 contiguous states</>,
  <>Pre-lit artificial trees too</>,
];

const facts = [
  ["Cut to order", "The week it ships"],
  ["Ships Mon to Wed", "Never held over a weekend"],
  ["48 states", "Lower 48 delivery"],
  ["From $24", "Live tree shipping"],
];

const faqs: [string, string][] = [
  ["Do I need to cut the trunk when it arrives?", "Yes. Saw a half inch straight across the base, even though we cut it before shipping. Then stand it in water within four hours. After that, the sap seals the cut."],
  ["How much water does a tree need?", "A six-foot tree drinks about a quart a day, and more in the first two days. Check the stand every morning, and never let the water fall below the cut."],
  ["How tall a tree can I fit?", "Take your ceiling height and subtract one foot. The size guide shows how to measure."],
  ["How long will a live tree last indoors?", "Between three and six weeks, depending on the species and the temperature of the room."],
];

const options = [
  { title: "Netted and boxed", text: "Your tree arrives netted, ready to bring inside and unwrap.", photo: "/images/delivered-netted-tree.webp" },
  { title: "Ready to light", text: "Give it a day to drop, then it's ready for lights and ornaments.", photo: "/images/delivered-netted-tree-lit.webp" },
  { title: "Winter-ready", text: "Cut and wrapped to travel in cold weather without losing needles.", photo: "/images/delivered-netted-tree-snow.webp" },
];

const care = [
  { h: "Grown, then cut to order", p: "We cut trees the week they ship, so what arrives is fresh, not stored." },
  { h: "Ship days that protect the tree", p: "Live trees go out Monday to Wednesday so they're never held over a weekend in transit." },
  { h: "Care that lasts", p: "Every order comes with a simple care guide, and our care page covers watering and placement." },
];

export default function TreeDelivery() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[34rem] md:min-h-[40rem] flex items-end text-white">
        <Photo src="/images/delivered-netted-tree-lit.webp" alt="A freshly delivered Christmas tree with warm lights" sizes="100vw" priority motion className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/70 md:via-black/35 md:to-transparent" />
        <div className="dl-wrap w-full pb-14 md:pb-24 pt-32">
          <p className="text-[.8125rem] tracking-[.22em] uppercase text-[var(--dl-gold)]">A tree to your door</p>
          <h1 className="serif-dl mt-4 max-w-[16ch] text-[2.75rem] leading-[1.05] md:text-[4.75rem]">Fresh-cut Christmas trees, delivered to your door</h1>
          <p className="mt-5 max-w-[42ch] text-lg md:text-xl text-white/90">Real trees cut the week they ship, to the 48 contiguous states.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#trees" className="dl-btn dl-btn-gold">Choose your tree <span aria-hidden>→</span></a>
            <a href="#shipping" className="dl-btn border-white/70 text-white hover:bg-white/15">How shipping works</a>
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section aria-label="At a glance" className="bg-[var(--dl-deep)] text-[#f6f3ec]">
        <ul className="dl-wrap grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 py-4 md:py-5 text-[.9375rem]">
          {facts.map((f) => (
            <li key={f[0]} className="py-2 md:py-0 md:text-center"><b className="block text-[var(--dl-gold)] font-semibold">{f[0]}</b><span className="text-[#f6f3ec]/85">{f[1]}</span></li>
          ))}
        </ul>
      </section>

      {/* BENEFITS */}
      <section id="how" className="bg-white overflow-hidden">
        <div className="grid md:grid-cols-2 items-stretch">
          <div className="dl-section px-5 md:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] md:pr-12">
            <h2 className="text-[2rem] md:text-[2.5rem] leading-[1.15] font-bold text-[var(--dl-green)] max-w-[18ch]">Real Christmas tree delivery, made simple</h2>
            <p className="mt-5 text-lg text-[var(--dl-muted)] max-w-[48ch]">Bring Christmas home with a real tree delivered to your door. Choose a size, add a stand if you like, and we do the rest.</p>
            <ul className="mt-8 grid gap-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-3 text-[1.0625rem]">
                  <svg aria-hidden className="mt-1.5 h-4 w-4 flex-none text-[var(--dl-green)]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M2 8.5l4 4 8-9" /></svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#order" className="dl-btn dl-btn-green mt-10">Order a Christmas tree</a>
          </div>
          <div className="relative min-h-[22rem] md:min-h-[34rem] dl-diagonal">
            <Photo src="/images/fraser-fir.webp" alt="A Fraser fir, delivered" sizes="(min-width:768px) 50vw, 100vw" className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="dl-section">
        <div className="dl-wrap">
          <Reveal animate><h2 className="serif-dl text-center text-[2rem] md:text-[3rem] leading-[1.1]">How your tree arrives</h2></Reveal>
          <ul className="mt-10 md:mt-14 grid gap-8 md:grid-cols-3">
            {options.map((o) => (
              <li key={o.title}>
                <div className="relative aspect-[4/3] bg-[var(--dl-card)] overflow-hidden">
                  <Photo src={o.photo} alt={o.title} sizes="(min-width:768px) 33vw, 100vw" className="absolute inset-0" />
                </div>
                <h3 className="serif-dl text-[1.75rem] mt-5">{o.title}</h3>
                <p className="mt-2 text-[var(--dl-muted)]">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TREES */}
      <section id="trees" className="dl-section bg-[var(--dl-card)]">
        <div className="dl-wrap">
          <h2 className="serif-dl text-[2rem] md:text-[3rem] leading-[1.1]">Choose your tree</h2>
          <p className="mt-3 text-[var(--dl-muted)]">Prices are in US dollars. <Link href="/shop" className="underline underline-offset-4">See every tree in the shop</Link>.</p>
          <Reveal animate><ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => <DlTreeCard key={p.slug} p={p} />)}
          </ul></Reveal>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="bg-[var(--dl-deep)] py-10 md:py-20">
        <div className="dl-wrap">
          <div className="bg-[var(--dl-card)] px-5 py-10 md:px-16 md:py-16">
            <DlBookingForm trees={featured} />
          </div>
        </div>
      </section>

      {/* CARE */}
      <section className="dl-section bg-[var(--dl-mint)]">
        <div className="dl-wrap">
          <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.15] font-bold text-[var(--dl-green)] text-center max-w-[26ch] mx-auto">Trees cut fresh, shipped with care</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 items-center">
            <div className="grid gap-8">
              {care.map((c) => (
                <div key={c.h}>
                  <h3 className="text-[1.375rem] font-bold text-[var(--dl-green)]">{c.h}</h3>
                  <p className="mt-2 text-[var(--dl-muted)]">{c.p}</p>
                </div>
              ))}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-lg rounded-bl-lg">
              <Photo src="/images/farm-dawn-frost.webp" alt="Rows of trees on the farm at dawn" sizes="(min-width:768px) 50vw, 100vw" className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="dl-section">
        <div className="dl-wrap max-w-[52rem]">
          <h2 className="serif-dl text-[2rem] md:text-[3rem] leading-[1.1]">Good to know</h2>
          <div className="mt-8 border-t border-[#1d2820]/20">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-b border-[#1d2820]/20">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[1.125rem] font-medium">
                  {q}
                  <span aria-hidden className="text-2xl leading-none text-[var(--dl-green)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-[var(--dl-muted)] max-w-[60ch]">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6"><Link href="/faq" className="underline underline-offset-4 decoration-2 decoration-[var(--dl-gold)]">More questions and care tips</Link></p>
        </div>
      </section>

      {/* SHIPPING */}
      <section id="shipping" className="dl-section bg-white">
        <div className="dl-wrap">
          <h2 className="serif-dl text-[2rem] md:text-[3rem] leading-[1.1]">Where we ship</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3 text-[1.0625rem]">
            <p><b>48 contiguous states.</b> We can't ship live trees to Alaska, Hawaii, U.S. territories or P.O. boxes.</p>
            <p><b>Some states limit live evergreens.</b> We'll tell you at checkout if yours does.</p>
            <p><b>Order by {BIZ.orderBy}</b> for delivery before Christmas.</p>
          </div>
          <Link href="/delivery" className="dl-btn dl-btn-green mt-10">Shipping details</Link>
        </div>
      </section>
      <DlStickyCta />
    </>
  );
}
