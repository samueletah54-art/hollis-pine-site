import { UK } from "@/data/uk";

export default function UkFooter() {
  return (
    <footer className="bg-[var(--uk-deep)] text-[#f6f3ec]">
      <div className="uk-wrap py-14 md:py-16 grid gap-10 md:grid-cols-3">
        <div>
          <p className="serif-uk text-3xl">Hollis <i>&amp;</i> Pine</p>
          <p className="mt-2 text-[.8125rem] tracking-[.18em] uppercase text-[var(--uk-gold)]">{UK.city}</p>
        </div>
        <address className="not-italic text-[.9375rem] leading-relaxed">
          {UK.address.map((l) => <span key={l} className="block">{l}</span>)}
          <a href={`tel:${UK.phoneHref}`} className="block mt-3 min-h-11 leading-[2.75rem] underline underline-offset-4">{UK.phone}</a>
          <a href={`mailto:${UK.email}`} className="block min-h-11 leading-[2.75rem] underline underline-offset-4">{UK.email}</a>
        </address>
        <ul className="text-[.9375rem]">
          <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="#trees">Trees</a></li>
          <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="#areas">Areas we deliver</a></li>
          <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="#book">Book delivery</a></li>
          <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="/">Hollis &amp; Pine USA</a></li>
        </ul>
      </div>
      <p className="uk-wrap pb-8 text-[.8125rem] text-[#f6f3ec]/70">© {new Date().getFullYear()} Hollis &amp; Pine. Prices include VAT.</p>
    </footer>
  );
}
