import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = { title: "FAQ", description: "Answers about ordering, shipping, live tree care, artificial trees and business orders from Hollis & Pine Tree Co.", alternates: { canonical: "/faq" } };

const groups: { title: string; items: [string, string][] }[] = [
  { title: "Ordering and shipping", items: [
    ["When do I need to order?", "By December 12 for delivery before Christmas. Earlier is better for the species you want. Fraser and Noble sell out first."],
    ["Why do live trees only ship Monday to Wednesday?", "So a tree never sits in a warehouse or on a truck over the weekend. It's cut early in the week and on your porch before Friday."],
    ["Do you ship to Alaska or Hawaii?", "No. We ship to the 48 contiguous states."],
    ["Can I choose a delivery date?", "Not exactly, but you can choose the week. Add a delivery note at checkout and we'll aim for it."],
  ]},
  { title: "Live trees", items: [
    ["How fresh is the tree when it arrives?", "It was cut the same week it shipped, usually 2 to 4 days before it arrives. The tag tells you the day."],
    ["How much does it drink?", "A six-foot fir drinks about a quart in the first day. Check the bowl twice a day the first week."],
    ["Why is it dropping needles?", "A fir sheds inner needles the first few days, especially after shipping. It's normal. If the outer needles are dropping, the tree is dry. Re-cut and water it."],
    ["Will it fit my room?", "Subtract a foot for the stand and a foot for the topper from your ceiling height. A tree is about half as wide as it is tall."],
    ["Are your trees safe around pets?", "Firs are the gentlest. But no tree is a snack, and the stand water can make a cat or dog sick. Cover it."],
  ]},
  { title: "Artificial trees", items: [
    ["Do I have to string the lights?", "No. Pre-lit trees come with LED lights fixed to the branches. They're fused so one dead bulb doesn't kill the string."],
    ["What if a section goes dark?", "Check the fuse in the plug. We include spares. If that doesn't do it, our replacement bulb kit is cheap."],
    ["How long will it last?", "Ten seasons if you store it dry. We've seen them last longer."],
  ]},
  { title: "Business and bulk", items: [
    ["Do you do installs?", "Yes, from 9 to 30 feet. See the business page for sizes and lead times."],
    ["Can we pay on terms?", "Net-30 for approved business accounts."],
  ]},
];

export default function FAQ() {
  const all = groups.flatMap((g) => g.items);
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: all.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
      <header className="grid md:grid-cols-12 gap-6 border-b border-ink pb-10"><p className="label text-berry md:col-span-3">FAQ</p><h1 className="serif text-5xl md:text-7xl leading-[.95] md:col-span-9">Questions, answered.</h1></header>
      <div className="mt-12 grid md:grid-cols-12 gap-x-12 gap-y-14">
        {groups.map((g) => (
          <section key={g.title} className="md:col-span-8 md:col-start-4" aria-label={g.title}>
            <h2 className="label text-berry mb-3">{g.title}</h2>
            <div className="border-t border-ink">
              {g.items.map(([q, a]) => (
                <details key={q} className="group border-b rule py-4">
                  <summary className="cursor-pointer serif-text text-xl list-none flex justify-between gap-6">{q}<span aria-hidden className="label text-brass group-open:rotate-45 transition-transform">+</span></summary>
                  <p className="mt-3 max-w-[60ch] text-ink/85">{a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
        <p className="md:col-span-8 md:col-start-4">Not here? <Link href="/contact" className="underline underline-offset-4 decoration-berry">Ask us.</Link></p>
      </div>
    </div>
  );
}
