import type { Metadata } from "next";
import Photo from "@/components/Photo";
import UkTreeCard from "@/components/uk/UkTreeCard";
import UkBookingForm from "@/components/uk/UkBookingForm";
import { UK } from "@/data/uk";

export const metadata: Metadata = {
  title: "Real Christmas tree delivery in London | Hollis & Pine",
  description: "Fresh Christmas trees delivered to your door across London. Choose a Nordmann Fir or Norway Spruce, add a stand, and book your delivery date.",
  alternates: { canonical: "/london" },
  openGraph: { locale: "en_GB" },
};

const benefits = [
  <>Fresh Christmas tree with <b>free</b> home delivery across London</>,
  <>Next-day Christmas tree delivery</>,
  <>Optional stand, so it's ready to go up when it arrives</>,
  <>Fresh-cut Nordmann Firs and Norway Spruce</>,
  <>Optional post-Christmas collection and removal</>,
  <>Flexible delivery, installation and collection packages</>,
];

const options = [
  { title: "Delivered", text: "A fresh tree at your door, netted and ready to bring inside.", photo: "/images/delivered-netted-tree.webp" },
  { title: "Delivered and set up", text: "We carry it in, fit the stand and leave it standing.", photo: "/images/delivered-netted-tree-lit.webp" },
  { title: "Delivered and collected", text: "We come back in January and take the tree away.", photo: "/images/delivered-netted-tree-snow.webp" },
];

const care = [
  { h: "Responsible sourcing", p: "Our trees are grown on managed farms where new trees are planted to replace those cut. We buy from growers, not from the open market." },
  { h: "Fewer, fuller deliveries", p: "We plan routes by area and day so each van delivers to as many neighbours as it can." },
  { h: "A second life for your tree", p: "Choose collection and your tree is taken away in January, not left on the kerb." },
];

export default function London() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[34rem] md:min-h-[40rem] flex items-end text-white">
        <Photo src="/images/delivered-netted-tree-lit.webp" alt="A freshly delivered Christmas tree with warm lights" sizes="100vw" priority motion className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/70 md:via-black/35 md:to-transparent" />
        <div className="uk-wrap w-full pb-14 md:pb-24 pt-32">
          <p className="text-[.8125rem] tracking-[.22em] uppercase text-[var(--uk-gold)]">A tree to your door</p>
          <h1 className="serif-uk mt-4 max-w-[16ch] text-[2.75rem] leading-[1.05] md:text-[4.75rem]">Real Christmas trees, delivered across London</h1>
          <p className="mt-5 max-w-[42ch] text-lg md:text-xl text-white/90">Fresh trees brought to your door, set up if you like, and collected after Christmas.</p>
          <a href="#trees" className="uk-btn uk-btn-gold mt-8">Choose your tree <span aria-hidden>→</span></a>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="how" className="bg-white overflow-hidden">
        <div className="grid md:grid-cols-2 items-stretch">
          <div className="uk-section px-5 md:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] md:pr-12">
            <h2 className="text-[2rem] md:text-[2.5rem] leading-[1.15] font-bold text-[var(--uk-green)] max-w-[18ch]">Real Christmas tree delivery in London</h2>
            <p className="mt-5 text-lg text-[var(--uk-muted)] max-w-[48ch]">Bring Christmas home with a real tree delivered to your door. Book a stand, set-up and collection for a hassle-free festive season.</p>
            <ul className="mt-8 grid gap-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-3 text-[1.0625rem]">
                  <svg aria-hidden className="mt-1.5 h-4 w-4 flex-none text-[var(--uk-green)]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M2 8.5l4 4 8-9" /></svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#book" className="uk-btn uk-btn-green mt-10">Order a Christmas tree</a>
          </div>
          <div className="relative min-h-[22rem] md:min-h-[34rem] uk-diagonal">
            <Photo src="/images/nordmann-fir.webp" alt="A Nordmann Fir, delivered" sizes="(min-width:768px) 50vw, 100vw" className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="uk-section">
        <div className="uk-wrap">
          <h2 className="serif-uk text-center text-[2rem] md:text-[3rem] leading-[1.1]">How would you like your tree?</h2>
          <ul className="mt-10 md:mt-14 grid gap-8 md:grid-cols-3">
            {options.map((o) => (
              <li key={o.title}>
                <div className="relative aspect-[4/3] bg-[var(--uk-card)] overflow-hidden">
                  <Photo src={o.photo} alt={o.title} sizes="(min-width:768px) 33vw, 100vw" className="absolute inset-0" />
                </div>
                <h3 className="serif-uk text-[1.75rem] mt-5">{o.title}</h3>
                <p className="mt-2 text-[var(--uk-muted)]">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TREES */}
      <section id="trees" className="uk-section bg-[var(--uk-card)]">
        <div className="uk-wrap">
          <h2 className="serif-uk text-[2rem] md:text-[3rem] leading-[1.1]">Choose your tree</h2>
          <p className="mt-3 text-[var(--uk-muted)]">Prices include VAT and delivery across London.</p>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {UK.trees.map((t) => <UkTreeCard key={t.id} tree={t} />)}
          </ul>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="bg-[var(--uk-deep)] py-10 md:py-20">
        <div className="uk-wrap">
          <div className="bg-[var(--uk-card)] px-5 py-10 md:px-16 md:py-16">
            <UkBookingForm />
          </div>
        </div>
      </section>

      {/* CARE */}
      <section className="uk-section bg-[var(--uk-mint)]">
        <div className="uk-wrap">
          <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.15] font-bold text-[var(--uk-green)] text-center max-w-[26ch] mx-auto">Our commitment to sustainable Christmas tree delivery</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 items-center">
            <div className="grid gap-8">
              {care.map((c) => (
                <div key={c.h}>
                  <h3 className="text-[1.375rem] font-bold text-[var(--uk-green)]">{c.h}</h3>
                  <p className="mt-2 text-[var(--uk-muted)]">{c.p}</p>
                </div>
              ))}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-lg rounded-bl-lg">
              <Photo src="/images/farm-dawn-frost.webp" alt="Rows of trees on the farm at dawn" sizes="(min-width:768px) 50vw, 100vw" className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section id="areas" className="uk-section bg-white">
        <div className="uk-wrap">
          <h2 className="serif-uk text-[2rem] md:text-[3rem] leading-[1.1]">Areas we deliver to</h2>
          <p className="mt-3 text-[var(--uk-muted)]">Don't see your area? Put your postcode in the booking form and we'll check.</p>
          <ul className="mt-10 columns-2 md:columns-3 lg:columns-4 gap-8">
            {UK.areas.map((a) => (
              <li key={a} className="break-inside-avoid"><a href="#book" className="inline-flex min-h-11 items-center text-[1.0625rem] text-[#1f4fbf] hover:underline underline-offset-4">{a}</a></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
