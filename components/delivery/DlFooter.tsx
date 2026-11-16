import { BIZ } from "@/data/business";

export default function DlFooter() {
  return (
    <footer className="bg-[var(--dl-deep)] text-[#f6f3ec]">
      <div className="dl-wrap py-14 md:py-16 grid gap-10 md:grid-cols-3">
        <p className="serif-dl text-3xl">Hollis <i>&amp;</i> Pine</p>
        <address className="not-italic text-[.9375rem] leading-relaxed">
          {BIZ.address.map((l) => <span key={l} className="block">{l}</span>)}
          <a href={`tel:${BIZ.phoneHref}`} className="block mt-3 min-h-11 leading-[2.75rem] underline underline-offset-4">{BIZ.phone}</a>
          <a href={`mailto:${BIZ.email}`} className="block min-h-11 leading-[2.75rem] underline underline-offset-4">{BIZ.email}</a>
        </address>
        <ul className="text-[.9375rem]">
          <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="#trees">Trees</a></li>
          <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="#shipping">Where we ship</a></li>
          <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="/shop">Full shop</a></li>
          <li><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="/delivery">Shipping details</a></li>
        </ul>
      </div>
      <p className="dl-wrap pb-24 md:pb-8 text-[.8125rem] text-[#f6f3ec]/70">© {new Date().getFullYear()} Hollis &amp; Pine Tree Co.</p>
    </footer>
  );
}
