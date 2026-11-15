import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Call, email or write to Hollis & Pine Tree Co. We answer the phone Monday through Saturday.", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20 grid md:grid-cols-12 gap-x-12 gap-y-12">
      <header className="md:col-span-5">
        <p className="label text-berry mb-4">Contact</p>
        <h1 className="serif text-5xl md:text-7xl leading-[.95]">Talk to a person.</h1>
        <dl className="mt-10 border-t border-ink">
          {[["Phone", <a key="p" href="tel:+15550100142" className="underline underline-offset-4">(555) 010-0142</a>, "Mon–Sat, 8 to 5 Eastern"],
            ["Email", <a key="e" href="mailto:hello@hollisandpine.example" className="underline underline-offset-4">hello@hollisandpine.example</a>, "Usually the same day"],
            ["Oregon farm", "14 Cascade Road, Silverton, OR 97381", "Not open to visitors. We ship."],
            ["North Carolina farm", "220 Laurel Fork Road, Jefferson, NC 28640", "Not open to visitors. We ship."]].map(([k, v, n]) => (
            <div key={String(k)} className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)] gap-4 py-4 border-b rule"><dt className="label text-muted pt-1">{k}</dt><dd className="break-words">{v}<span className="block text-sm text-muted">{n}</span></dd></div>
          ))}
        </dl>
        <p className="mt-6 text-sm">Buying for a business? <Link href="/business#quote" className="underline underline-offset-4 decoration-berry">Use the quote form</Link>.</p>
      </header>
      <div className="md:col-span-6 md:col-start-7 md:pt-16"><ContactForm /></div>
    </div>
  );
}
