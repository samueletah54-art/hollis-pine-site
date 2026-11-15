import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Divider from "@/components/Divider";
import { BIZ } from "@/data/business";

export const metadata: Metadata = {
  title: "Contact and opening hours",
  description: "Phone, email, address and opening hours for Hollis & Pine Tree Co. We answer the phone Monday to Saturday.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <header className="grid md:grid-cols-12 gap-6"><h1 className="serif text-6xl md:col-span-10">Talk to a person.</h1></header>
      <Divider className="my-10" />
      <div className="grid md:grid-cols-12 gap-x-12 gap-y-12">
        <div className="md:col-span-5">
          <dl className="border-t-[3px] border-double border-bark/60">
            <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)] gap-4 py-4 border-b rule"><dt className="label text-bark pt-0.5">Phone</dt><dd><a href={`tel:${BIZ.phoneHref}`} className="underline underline-offset-4">{BIZ.phone}</a></dd></div>
            <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)] gap-4 py-4 border-b rule"><dt className="label text-bark pt-0.5">Email</dt><dd className="break-words"><a href={`mailto:${BIZ.email}`} className="underline underline-offset-4">{BIZ.email}</a></dd></div>
            <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)] gap-4 py-4 border-b rule"><dt className="label text-bark pt-0.5">Address</dt><dd>{BIZ.address.map((l) => (<span key={l} className="block">{l}</span>))}</dd></div>
            {BIZ.hours.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)] gap-4 py-4 border-b rule"><dt className="label text-bark pt-0.5">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <p className="mt-6 text-sm">Buying for a business? <Link href="/business#quote" className="underline underline-offset-4 decoration-tan decoration-2">Use the quote form</Link>.</p>
          <p className="mt-2 text-sm">Something wrong with an order? See <Link href="/returns" className="underline underline-offset-4 decoration-tan decoration-2">returns and refunds</Link>.</p>
        </div>
        <div className="md:col-span-6 md:col-start-7"><ContactForm /></div>
      </div>
    </div>
  );
}
