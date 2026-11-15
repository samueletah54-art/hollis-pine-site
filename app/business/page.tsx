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
  ["Hotels", "A 15 to 25 foot tree in the atrium is the photo every guest takes. We schedule installs overnight and have the lobby clear by 6 a.m."],
  ["Malls and shopping centers", "Courts and concourses, usually 20 to 30 feet, with anchoring and a perimeter barrier plan. We work around your Santa schedule."],
  ["Restaurants and bars", "Patios and entrances in the 9 to 12 foot range, lit for outdoor weather, set so a gust doesn't take it into a booth."],
  ["Offices and lobbies", "Nine to fifteen feet, usually artificial so the facilities team can leave it up through January without watering."],
  ["Municipalities and town squares", "Tall live trees with the lighting ceremony on the calendar. Permits, crane or lift, and a takedown crew booked for January 2nd."],
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
          <p className="label text-berry mb-5">For business</p>
          <h1 className="serif text-[3.2rem] md:text-[6.5rem] leading-[.92]">Big trees, set properly.</h1>
        </div>
        <div className="md:col-span-4 md:pt-24">
          <p className="text-lg">From a 9-foot entrance tree to a 30-foot centerpiece. Cut to order, delivered by our crew, anchored, lit, and gone by the first week of January.</p>
          <a href="#quote" className="btn btn-primary mt-7">Request a quote</a>
        </div>
      </section>

      <section className="mt-14 md:mt-20"><Photo src="/images/commercial-lobby.jpg" alt="A 20-foot decorated tree in a hotel lobby atrium, marble floor, guests walking by" sizes="100vw" priority className="h-[52vh] md:h-[72vh]" /></section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24" aria-labelledby="uses">
        <div className="grid md:grid-cols-12 gap-10">
          <h2 id="uses" className="label text-berry md:col-span-3">Who we set trees for</h2>
          <ul className="md:col-span-9 border-t border-ink">
            {uses.map(([t, d], i) => (
              <Reveal as="li" key={t} className="grid md:grid-cols-[6rem_1fr_2fr] gap-x-6 gap-y-1 py-6 border-b rule">
                <span className="serif text-4xl text-brass num leading-none">0{i + 1}</span>
                <h3 className="serif-text text-2xl">{t}</h3>
                <p className="text-ink/85">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28" aria-labelledby="sizes">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3"><h2 id="sizes" className="label text-berry">Sizes</h2><p className="text-sm text-muted mt-3 max-w-[26ch]">Typical figures. A site visit tightens them.</p></div>
          <div className="md:col-span-9 overflow-x-auto">
            <table className="w-full text-left min-w-[36rem]">
              <caption className="sr-only">Commercial tree sizes, typical uses, install crew and lead time</caption>
              <thead><tr className="border-b border-ink label text-muted"><th scope="col" className="py-3 pr-4">Height</th><th scope="col" className="pr-4">Typical use</th><th scope="col" className="pr-4">Install</th><th scope="col">Lead time</th></tr></thead>
              <tbody>
                {sizes.map(([h, u, i, l]) => (<tr key={h} className="border-b rule align-top"><th scope="row" className="py-4 pr-4 serif-text text-2xl font-normal num">{h}</th><td className="pr-4 py-4">{u}</td><td className="pr-4 py-4">{i}</td><td className="py-4">{l}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-28 bg-ink/[0.04] border-y rule">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="label text-berry mb-4">Install and takedown</p>
            <h2 className="serif text-4xl md:text-6xl leading-[.98]">We show up, set it, and come back to take it away.</h2>
          </div>
          <ol className="md:col-span-6 md:col-start-7 border-t border-ink">
            {[["Site visit", "A photo of the space and the loading path, or we come look. We figure out anchoring, power and where the truck goes."],["Delivery", "Cut and treated, delivered in a covered truck. We carry the tree in and leave nothing behind but a tree."],["Set and anchor", "Water-fed stand, anchor cables, lights tested before the crew leaves. You get a walk-through."],["Takedown", "We come back in the first week of January, take it down, and haul away the tree and the needles."]].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] py-5 border-b rule"><span className="serif text-3xl text-brass num">{i + 1}</span><span><b className="font-semibold">{t}.</b> {d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28" aria-labelledby="fire">
        <div className="grid md:grid-cols-12 gap-10">
          <h2 id="fire" className="label text-berry md:col-span-3">Fire safety</h2>
          <div className="md:col-span-7 serif-text text-xl md:text-2xl leading-snug space-y-5">
            <p>Our commercial artificial trees use flame-retardant foliage and UL-listed lighting. We'll provide the certificates your insurer or building manager asks for.</p>
            <p>Live trees in public buildings are regulated by your local fire code, and some jurisdictions only allow treated trees or ban them indoors. Check with your fire marshal before you order. We treat live trees with an approved retardant and send the paperwork along.</p>
            <p className="text-base text-muted font-sans">Specifications vary by tree and jurisdiction. Ask us for the exact certificate for your order.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28" aria-labelledby="gallery">
        <h2 id="gallery" className="label text-berry mb-6">Recent projects</h2>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          <Photo src="/images/commercial-mall.jpg" alt="A 25-foot tree in a shopping mall concourse, families gathering" sizes="(min-width:768px) 58vw, 100vw" className="col-span-2 md:col-span-7 aspect-[16/10]" />
          <Photo src="/images/commercial-install.jpg" alt="A crew in hi-vis vests raising a 15-foot tree on a restaurant patio at night" sizes="(min-width:768px) 40vw, 50vw" className="col-span-1 md:col-span-5 aspect-[4/5] md:aspect-auto md:mt-14" />
          <Photo src="/images/commercial-lobby.jpg" alt="A 20-foot tree in a hotel lobby atrium" sizes="(min-width:768px) 33vw, 50vw" className="col-span-1 md:col-span-4 aspect-[4/5]" />
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28" aria-labelledby="faq">
        <div className="grid md:grid-cols-12 gap-10">
          <h2 id="faq" className="label text-berry md:col-span-3">Questions we get</h2>
          <div className="md:col-span-8 border-t border-ink">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-b rule py-4">
                <summary className="cursor-pointer serif-text text-xl list-none flex justify-between gap-6">{q}<span aria-hidden className="label text-brass group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-3 max-w-[62ch] text-ink/85">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="bg-fir text-paper on-dark mt-28 scroll-mt-16">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="label text-brass mb-4">Request a quote</p>
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
