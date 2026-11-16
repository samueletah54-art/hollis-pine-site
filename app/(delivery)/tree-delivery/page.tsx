import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import DlTreeCard from "@/components/delivery/DlTreeCard";
import DlBookingForm from "@/components/delivery/DlBookingForm";
import DlStickyCta from "@/components/delivery/DlStickyCta";
import DlTimeline from "@/components/delivery/DlTimeline";
import DlHeightPicker from "@/components/delivery/DlHeightPicker";
import DlOrderBy from "@/components/delivery/DlOrderBy";
import Reveal from "@/components/Reveal";
import { bySlug } from "@/lib/catalog";
import { BIZ } from "@/data/business";
import type { Product } from "@/data/products";

export const metadata: Metadata = {
  title: "Fresh-cut Christmas trees delivered to your door | Hollis & Pine",
  description: "Fraser, Balsam and Nordmann firs cut the week they ship, to the 48 contiguous states. See when your tree would arrive, then order.",
  alternates: { canonical: "/tree-delivery" },
};

const featured = ["fraser-fir", "balsam-fir", "nordmann-fir", "colorado-blue-spruce"].map(bySlug).filter((p): p is Product => !!p);

const principles = [
  ["Cut to order", "A tree is cut the week it ships. It doesn't wait in a warehouse, and it doesn't travel over a weekend."],
  ["Honest about size", "Heights are given as a range, with the width at the base, and our ceiling guide tells you what really fits."],
  ["Plain about limits", "We ship to the 48 contiguous states. If your state limits live evergreens, we tell you before you pay."],
];

const faqs: [string, string][] = [
  ["Do I need to cut the trunk when it arrives?", "Yes. Saw a half inch straight across the base, even though we cut it before shipping. Then stand it in water within four hours. After that, the sap seals the cut."],
  ["How much water does a tree need?", "A six-foot tree drinks about a quart a day, and more in the first two days. Check the stand every morning, and never let the water fall below the cut."],
  ["How long will a live tree last indoors?", "Between three and six weeks, depending on the species and the temperature of the room."],
  ["What if it arrives damaged?", "Tell us within 48 hours and we'll put it right. Our returns page has the details."],
];

export default function TreeDelivery() {
  const [fraser, ...rest] = featured;
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[34rem] md:min-h-[42rem] flex items-end text-white">
        <Photo src="/images/delivered-netted-tree-lit.webp" alt="A freshly delivered Christmas tree with warm lights" sizes="100vw" priority motion className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#12281d]/90 via-[#12281d]/45 to-[#12281d]/10 md:bg-gradient-to-r md:from-[#12281d]/85 md:via-[#12281d]/45 md:to-transparent" />
        <div className="dl-wrap w-full pb-12 md:pb-20 pt-32">
          <p className="dl-eyebrow inline-block border border-[var(--dl-gold)]/70 text-[var(--dl-gold)] px-3 py-1"><DlOrderBy /></p>
          <h1 className="serif-dl mt-5 max-w-[15ch] text-[2.75rem] leading-[1.02] md:text-[5rem]">Cut this week. At your door by Christmas.</h1>
          <p className="mt-5 max-w-[44ch] text-lg md:text-xl text-white/90">Fraser, Balsam and Nordmann firs from our farm, cut to order and shipped to the 48 contiguous states.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#order" className="dl-btn dl-btn-gold">Order a tree <span aria-hidden>→</span></a>
            <a href="#week" className="dl-btn border-white/70 text-white hover:bg-white/15">See when it arrives</a>
          </div>
        </div>
      </section>

      {/* THE WEEK */}
      <section id="week" className="dl-dark bg-[var(--dl-deep)] text-[var(--dl-cream)] dl-section">
        <div className="dl-wrap"><DlTimeline /></div>
      </section>

      {/* CEILING */}
      <section id="height" className="dl-section">
        <div className="dl-wrap"><DlHeightPicker trees={featured} /></div>
      </section>

      {/* TREES */}
      <section id="trees" className="dl-section bg-[var(--dl-card)]">
        <div className="dl-wrap">
          <Reveal animate>
            <h2 className="serif-dl text-[2rem] md:text-[3rem] leading-[1.08]">Four trees worth ordering</h2>
            <p className="mt-3 text-[var(--dl-muted)]">Prices are in US dollars. <Link href="/shop" className="underline underline-offset-4 decoration-2 decoration-[var(--dl-gold)]">See every tree in the shop</Link>.</p>
          </Reveal>
          <div className="mt-10 grid lg:grid-cols-12 gap-x-14 gap-y-10 items-start">
            <div className="lg:col-span-5"><DlTreeCard p={fraser} feature /></div>
            <div className="lg:col-span-7 border-t border-[var(--dl-bark)]/40 lg:border-t-0 pt-5 lg:pt-0">
              {rest.map((p) => <DlTreeCard key={p.slug} p={p} />)}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="dl-section">
        <div className="dl-wrap grid lg:grid-cols-12 gap-x-14 gap-y-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="dl-eyebrow text-[var(--dl-bark)]">How we work</p>
            <h2 className="serif-dl mt-3 text-[2rem] md:text-[3rem] leading-[1.08]">A small farm, three promises</h2>
            <ol className="mt-8">
              {principles.map(([h, p], i) => (
                <li key={h} className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[4.5rem_1fr] gap-x-4 border-t border-[var(--dl-bark)]/40 py-5">
                  <span className="serif-dl text-[2.5rem] leading-none text-[var(--dl-bark)] num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                  <div><h3 className="serif-dl text-[1.5rem] leading-snug">{h}</h3><p className="mt-1 text-[var(--dl-muted)] max-w-[46ch]">{p}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="dl-plate"><div className="relative aspect-[4/3] overflow-hidden"><Photo src="/images/farm-dawn-frost.webp" alt="Young firs on the farm at dawn, covered in frost" sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0" /></div></div>
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="dl-dark bg-[var(--dl-deep)] py-10 md:py-20">
        <div className="dl-wrap">
          <div className="bg-[var(--dl-cream)] text-[var(--dl-ink)] px-5 py-10 md:px-14 md:py-14 border-4 border-double border-[var(--dl-bark)]/60">
            <DlBookingForm trees={featured} />
          </div>
        </div>
      </section>

      {/* GOOD TO KNOW + SHIPPING */}
      <section id="faq" className="dl-section">
        <div className="dl-wrap grid lg:grid-cols-12 gap-x-14 gap-y-12">
          <div className="lg:col-span-7">
            <h2 className="serif-dl text-[2rem] md:text-[3rem] leading-[1.08]">Good to know</h2>
            <div className="mt-8 border-t border-[var(--dl-bark)]/40">
              {faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-[var(--dl-bark)]/40">
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
          <aside id="shipping" className="lg:col-span-5 lg:border-l lg:border-[var(--dl-bark)]/40 lg:pl-12">
            <h2 className="serif-dl text-[2rem] md:text-[2.5rem] leading-[1.08]">Where we ship</h2>
            <ul className="mt-6 grid gap-4">
              <li><b>48 contiguous states.</b> No live trees to Alaska, Hawaii, U.S. territories or P.O. boxes.</li>
              <li><b>Some states limit live evergreens.</b> We'll tell you before you pay.</li>
              <li><b>Order by {BIZ.orderBy}</b> for delivery before Christmas.</li>
            </ul>
            <Link href="/delivery" className="dl-btn dl-btn-ghost mt-8">Shipping details</Link>
          </aside>
        </div>
      </section>
      <DlStickyCta />
    </>
  );
}
