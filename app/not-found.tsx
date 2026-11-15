import type { Metadata } from "next";
import Link from "next/link";
import TreeMark from "@/components/TreeMark";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-20 pb-10 grid md:grid-cols-12 gap-10 items-center">
      <div className="md:col-span-7">
        <p className="label text-bark mb-4">Error 404</p>
        <h1 className="serif text-8xl">That tree isn't on the farm.</h1>
        <p className="mt-6 text-lg max-w-[42ch]">The page you wanted isn't here. It may have moved, or sold out. Try one of these.</p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <li><Link href="/shop" className="btn btn-primary">See the trees</Link></li>
          <li><Link href="/sizes" className="underline underline-offset-4 decoration-tan decoration-2 self-center">Size guide</Link></li>
          <li><Link href="/contact" className="underline underline-offset-4 decoration-tan decoration-2">Contact us</Link></li>
        </ul>
      </div>
      <div className="md:col-span-5 text-spruce flex justify-center" aria-hidden="true">
        <svg viewBox="0 0 200 240" className="w-48 md:w-64">
          <path d="M20 224 Q100 218 180 224" stroke="#5a4130" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M92 200 L92 224 L108 224 L108 200 Z" fill="#5a4130" />
          <g fill="currentColor"><path d="M100 98 L132 150 L68 151 Z" transform="rotate(-8 100 150)" /><path d="M100 128 L142 186 L58 188 Z" /></g>
          <circle cx="146" cy="64" r="22" fill="none" stroke="#5a4130" strokeWidth="3" />
          <path d="M138 56 L154 72 M154 56 L138 72" stroke="#5a4130" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
