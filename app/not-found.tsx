import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <SiteChrome>
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-20 pb-10 ">
      <div className="max-w-3xl">
        <p className="label text-bark mb-4">Error 404</p>
        <h1 className="serif text-8xl">That tree isn't on the farm.</h1>
        <p className="mt-6 text-lg max-w-[42ch]">The page you wanted isn't here. It may have moved, or sold out. Try one of these.</p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <li><Link href="/shop" className="btn btn-primary">See the trees</Link></li>
          <li><Link href="/sizes" className="underline underline-offset-4 decoration-gold decoration-2 self-center">Size guide</Link></li>
          <li><Link href="/contact" className="underline underline-offset-4 decoration-gold decoration-2">Contact us</Link></li>
        </ul>
      </div>

    </div>
    </SiteChrome>
  );
}
