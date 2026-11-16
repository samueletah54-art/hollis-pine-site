import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "@/components/ClearCart";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default async function Success({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  const { demo } = await searchParams;
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-20 md:pt-32 pb-10 grid md:grid-cols-12">
      <ClearCart />
      <div className="md:col-span-7 md:col-start-3">
        <p className="label text-bark mb-4">Order received</p>
        <h1 className="serif text-6xl md:text-8xl leading-[.9]">Thank you.</h1>
        <p className="mt-8 text-xl max-w-[44ch]">We'll email you a receipt now and tracking when your order leaves the farm. Live trees ship Monday through Wednesday. Care instructions will be in the box.</p>
        {demo && <p className="mt-6 border-l-2 border-tan pl-4 text-muted max-w-[50ch]">Demo mode: Stripe isn't connected on this site yet, so no payment was taken and no order was placed.</p>}
        <div className="mt-10 flex gap-6 items-center"><Link href="/care" className="btn btn-primary">Read the care guide</Link><Link href="/shop" className="underline underline-offset-4">Keep shopping</Link></div>
      </div>
    </div>
  );
}
