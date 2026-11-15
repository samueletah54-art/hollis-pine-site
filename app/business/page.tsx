import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Commercial trees for lobbies, malls and storefronts",
  description: "9 to 30 foot live-cut and commercial-grade artificial trees with install, takedown and haul-away. Fire-retardant, net-30 for approved accounts. Request a quote.",
  alternates: { canonical: "/business" },
};

const uses = [
  ["Hotels", "A 15 to 25 ft tree in the atrium. We install overnight and have the lobby clear by 6 am."],
  ["Shopping centres", "Courts and concourses, usually 20 to 30 ft. We anchor the tree and plan a barrier round it."],
  ["Restaurants and bars", "Patios and entrances, 9 to 12 ft. Lit for outdoor weather and set so a gust cannot move it."],
  ["Offices and lobbies", "9 to 15 ft, usually artificial, so nobody has to water it."],
  ["Town squares", "Tall live trees for a lighting ceremony. We plan the lift, and book the takedown crew."],
];
const sizes = [
  ["9 ft", "Entrances, small lobbies, patios", "2 people, 1 hour", "10–14 days"],
  ["12 ft", "Restaurant entrances, office atriums", "2 people, 1.5 hours", "10–14 days"],
  ["15 ft", "Hotel lobbies, retail entrances", "3 people, 3 hours", "2–3 weeks"],
  ["20 ft", "Large atriums, mall courts", "4 people + lift, 5 hours", "2–3 weeks"],
  ["25 ft", "Malls, civic spaces", "4–5 people + lift, 8 hours", "3–4 weeks"],
  ["30 ft", "Town squares, large mall courts", "5+ people + crane or lift, one day", "4+ weeks"],
];
const faqs = [
  ["Is the tree flame-retardant?", "Our commercial artificial trees are built from flame-retardant foliage and UL-listed lighting. Live trees are treated with an approved retardant before delivery, and we provide the treatment certificate. Many jurisdictions regulate live trees in public-assembly buildings, so check with your fire marshal. We'll help you with the paperwork."],
  ["Who is responsible for water and upkeep?", "A live tree in a water-fed stand needs filling every day or two. Add the maintenance plan and we send someone weekly, or we leave you a fill schedule and a gauge."],
  ["What happens to the tree afterward?", "We take it down and haul it away, usually January 2nd to 6th. Live trees go to a chipper and the mulch goes to a public park. Artificial trees are cased and can be stored with us or collected."],
  ["Can you decorate it too?", "We can light it. For ornaments and designer work, we'll introduce you to a few decorators we trust, and we'll coordinate the schedule."],
  ["How do payments work?", "Net-30 for approved business accounts, with a 25% deposit to reserve the cut date. Government and school accounts can pay on a purchase order."],
  ["How far ahead should I order?", "By Nov 1 for anything 20 ft or taller. By Nov 15 for everything else. After that, call us. We often have a cancelled order we can re-cut."],
];

export default function Business() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-24 grid md:grid-cols-12 gap-x-10 gap-y-10">
        <div className="md:col-span-8">
          <h1 className="serif text-8xl">Big trees, set up properly.</h1>
        </div>
        <div className="md:col-span-4 md:pt-24">
          <p className="text-lg">From a 9 ft tree at the door to a 30 ft tree in the square. We cut it to your height, deliver it, anchor it and light it. We take it down in January.</p>
          <a href="#quote" className="btn btn-primary mt-7">Request a quote</a>
        </div>
      </section>

      <section className="mt-14 md:mt-20"><Photo src="/images/commercial-lobby.webp" alt="A 20-foot decorated tree in a hotel lobby atrium, marble floor, guests walking by" sizes="100vw" priority className="w-full aspect-[16/9] max-h-[75vh]" /></section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24" aria-labelledby="uses">
        <div className="grid md:grid-cols-12 gap-10">
          <h2 id="uses" className="label text-bark md:col-span-3">Who we work with</h2>
          <ul className="md:col-span-9 border-t-[3px] border-double border-bark/60">
            {uses.map(([t, d], i) => (
              <Reveal as="li" key={t} className="grid md:grid-cols-[1fr_2fr] gap-x-6 gap-y-1 py-6 border-b rule">
                <h3 className="serif-text text-2xl">{t}</h3>
                <p className="text-ink/85">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28" aria-labelledby="sizes">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3"><h2 id="sizes" className="label text-bark">Sizes</h2><p className="text-sm text-muted mt-3 max-w-[26ch]">Typical figures. A site visit makes them exact.</p></div>
          <div className="md:col-span-9 overflow-x-auto">
            <table className="w-full text-left min-w-[36rem]">
              <caption className="sr-only">Commercial tree sizes, typical uses, install crew and lead time</caption>
              <thead><tr className="border-b-[3px] border-double border-bark/60 label text-muted"><th scope="col" className="py-3 pr-4">Height</th><th scope="col" className="pr-4">Typical use</th><th scope="col" className="pr-4">Install</th><th scope="col">Lead time</th></tr></thead>
              <tbody>
                {sizes.map(([h, u, i, l]) => (<tr key={h} className="border-b rule align-top"><th scope="row" className="py-4 pr-4 serif-text text-2xl font-normal num">{h}</th><td className="pr-4 py-4">{u}</td><td className="pr-4 py-4">{i}</td><td className="py-4">{l}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-28 bg-paper-deep border-y-[3px] border-double border-bark/50">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h2 className="serif text-4xl md:text-6xl leading-[.98]">We show up, set it, and come back to take it away.</h2>
          </div>
          <ol className="md:col-span-6 md:col-start-7 border-t-[3px] border-double border-bark/60">
            {[["Site visit", "A photo of the space and the loading path, or we come look. We figure out anchoring, power and where the truck goes."],["Delivery", "Cut and treated, delivered in a covered truck. We carry the tree in and leave nothing behind but a tree."],["Set and anchor", "Water-fed stand, anchor cables, lights tested before the crew leaves. You get a walk-through."],["Takedown", "We come back in the first week of January, take it down, and haul away the tree and the needles."]].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] py-5 border-b rule"><span className="serif text-3xl text-tan num">{i + 1}</span><span><b className="font-semibold">{t}.</b> {d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28" aria-labelledby="fire">
        <div className="grid md:grid-cols-12 gap-10">
          <h2 id="fire" className="label text-bark md:col-span-3">Fire safety</h2>
          <div className="md:col-span-7 serif-text text-xl md:text-2xl leading-snug space-y-5">
            <p>Our commercial artificial trees use flame-retardant foliage and UL-listed lights. We provide the certificates your insurer or building manager asks for.</p>
            <p>Local fire codes cover live trees in public buildings. Some places only allow treated trees, and some ban them indoors. Check with your fire marshal before you order. We treat live trees with an approved retardant and send you the paperwork.</p>
            <p className="text-base text-muted font-sans">Rules vary by tree and by town. Ask us for the exact certificate for your order.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28" aria-labelledby="gallery">
        <h2 id="gallery" className="label text-bark mb-6">Recent projects</h2>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          <Photo plate src="/images/commercial-mall.webp" alt="A 25-foot tree in a shopping mall concourse, families gathering" sizes="(min-width:768px) 58vw, 100vw" className="col-span-2 md:col-span-7 aspect-[16/10]" />
          <Photo plate src="/images/commercial-install.webp" alt="A crew in hi-vis vests raising a 15-foot tree on a restaurant patio at night" sizes="(min-width:768px) 40vw, 50vw" className="col-span-1 md:col-span-5 aspect-[4/5] md:aspect-auto md:mt-14" />
          <Photo plate src="/images/commercial-lobby.webp" alt="A 20-foot tree in a hotel lobby atrium" sizes="(min-width:768px) 33vw, 50vw" className="col-span-1 md:col-span-4 aspect-[4/5]" />
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28" aria-labelledby="faq">
        <div className="grid md:grid-cols-12 gap-10">
          <h2 id="faq" className="label text-bark md:col-span-3">Questions</h2>
          <div className="md:col-span-8 border-t-[3px] border-double border-bark/60">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-b rule py-4">
                <summary className="cursor-pointer serif-text text-xl list-none flex justify-between gap-6">{q}<span aria-hidden className="label text-tan group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-3 max-w-[62ch] text-ink/85">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="bg-fir text-paper on-dark mt-28 scroll-mt-16">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="serif text-5xl md:text-6xl leading-[.95]">Tell us about the space.</h2>
            <p className="mt-5 text-paper/80 max-w-[34ch]">Pricing depends on the height, the building, and how much of the work you want us to do. Prefer to talk? <a className="underline underline-offset-4" href="tel:+15550100142">(555) 010-0142</a>.</p>
            <p className="mt-6 text-sm text-paper/65">Looking for a tree for your home? <Link href="/shop" className="underline underline-offset-4">Shop here</Link>.</p>
          </div>
          <div className="md:col-span-8"><Suspense fallback={null}><QuoteForm /></Suspense></div>
        </div>
      </section>
    </>
  );
}
