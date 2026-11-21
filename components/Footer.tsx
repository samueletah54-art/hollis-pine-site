import Link from "next/link";
import { BIZ } from "@/data/business";
import Divider from "./Divider";
import Newsletter from "./Newsletter";
import Snow from "./SnowLazy";
import Lights from "./Lights";

export default function Footer() {
  return (
    <footer className="dusk text-cream mt-28 on-dark">
      <Snow />
      <Lights />
      <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-16 pb-10">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-12">
          <div className="md:col-span-4">
            <p className="serif text-3xl">Hollis <i>&amp;</i> Pine</p>
            <address className="not-italic mt-6 text-cream/85 text-sm leading-relaxed">
              {BIZ.address.map((l) => (<span key={l} className="block">{l}</span>))}
              <span className="block mt-1"><a href={`tel:${BIZ.phoneHref}`} className="tap underline underline-offset-4">{BIZ.phone}</a></span>
              <span className="block"><a href={`mailto:${BIZ.email}`} className="tap underline underline-offset-4">{BIZ.email}</a></span>
            </address>
            <dl className="mt-5 text-sm text-cream/85 space-y-1">
              {BIZ.hours.map(([k, v]) => (<div key={k}><dt className="label text-straw inline">{k}: </dt><dd className="inline">{v}</dd></div>))}
            </dl>
          </div>

          <nav aria-label="Footer" className="md:col-span-5 grid grid-cols-2 gap-8 text-sm">
            <ul className="space-y-2">
              <li className="label text-straw mb-3">Shop</li>
              <li><Link href="/shop?type=live" className="hover:underline">Live-cut trees</Link></li>
              <li><Link href="/shop?type=artificial" className="hover:underline">Artificial trees</Link></li>
              <li><Link href="/shop?type=addon" className="hover:underline">Stands and wreaths</Link></li>
              <li><Link href="/business" className="hover:underline">For business</Link></li>
              <li><Link href="/sizes" className="hover:underline">Size guide</Link></li>
              <li><Link href="/guide" className="hover:underline">Find your tree</Link></li>
            </ul>
            <ul className="space-y-2">
              <li className="label text-straw mb-3">Help</li>
              <li><Link href="/delivery" className="hover:underline">Shipping</Link></li>
              <li><Link href="/returns" className="hover:underline">Returns and guarantee</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link href="/care" className="hover:underline">Care guide</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>

          <div className="md:col-span-3"><Newsletter dark /></div>
        </div>

        <Divider dark className="mt-14 mb-6" />
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-cream/75">
          <p>© {new Date().getFullYear()} {BIZ.name}. We ship to the 48 contiguous states.</p>
          <p className="flex gap-5"><Link href="/privacy" className="tap underline underline-offset-4">Privacy</Link><Link href="/terms" className="tap underline underline-offset-4">Terms</Link></p>
        </div>
      </div>
    </footer>
  );
}
