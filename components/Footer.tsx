import Link from "next/link";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-fir text-paper mt-24 on-dark">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-16 pb-10">
        <div className="grid md:grid-cols-12 gap-12 pb-14 border-b border-paper/20">
          <div className="md:col-span-5">
            <p className="serif text-5xl leading-none">Hollis <i>&amp;</i> Pine</p>
            <p className="mt-5 max-w-[34ch] text-paper/80">Two family farms, one in the Oregon Cascades and one in the North Carolina Blue Ridge. Trees cut to order, shipped across the U.S.</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-4 grid grid-cols-2 gap-8 text-[.95rem]">
            <ul className="space-y-2">
              <li className="label text-paper/60 mb-3">Shop</li>
              <li><Link href="/shop?type=live" className="hover:underline">Live-cut trees</Link></li>
              <li><Link href="/shop?type=artificial" className="hover:underline">Artificial trees</Link></li>
              <li><Link href="/shop?type=addon" className="hover:underline">Stands &amp; wreaths</Link></li>
              <li><Link href="/business" className="hover:underline">For business</Link></li>
            </ul>
            <ul className="space-y-2">
              <li className="label text-paper/60 mb-3">Help</li>
              <li><Link href="/care" className="hover:underline">Care guide</Link></li>
              <li><Link href="/shipping-returns" className="hover:underline">Shipping &amp; returns</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>
          <div className="md:col-span-3"><Newsletter dark /></div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-paper/65">
          <p>© {new Date().getFullYear()} Hollis &amp; Pine Tree Co. Ships to the 48 contiguous states. Sales tax collected where required.</p>
          <p>Questions? <a className="underline underline-offset-4" href="mailto:hello@hollisandpine.example">hello@hollisandpine.example</a> · (555) 010-0142</p>
        </div>
      </div>
    </footer>
  );
}
