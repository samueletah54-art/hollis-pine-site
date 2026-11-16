import type { Metadata } from "next";
import Link from "next/link";
import Divider from "@/components/Divider";
import JsonLd from "@/components/JsonLd";
import { BIZ } from "@/data/business";

export const metadata: Metadata = {
  title: "Questions: watering, stands, pets, recycling and returns",
  description: "Plain answers about watering a live tree, choosing a stand, keeping pets safe, recycling the tree after Christmas, delivery and returns.",
  alternates: { canonical: "/faq" },
};

const groups: { title: string; items: [string, React.ReactNode, string][] }[] = [
  { title: "Watering", items: [
    ["How much water does a tree need?", <>A six-foot tree drinks about a quart a day, and more in the first two days. Check the stand every morning. Never let the water fall below the cut.</>, "A six-foot tree drinks about a quart a day, and more in the first two days. Check the stand every morning. Never let the water fall below the cut."],
    ["Do I need to cut the trunk when it arrives?", <>Yes. Saw a half inch straight across the base, even though we cut it before shipping. Then stand it in water within four hours. After that, the sap seals the cut.</>, "Yes. Saw a half inch straight across the base. Then stand it in water within four hours. After that, the sap seals the cut."],
    ["Should I add sugar, aspirin or soda to the water?", <>No. Plain water works. Our <Link href="/extras/tree-preservative" className="underline underline-offset-4">preservative</Link> helps a little, but nothing replaces a full stand.</>, "No. Plain water works. Preservative helps a little, but nothing replaces a full stand."],
  ]},
  { title: "Stands and sizes", items: [
    ["What size stand do I need?", <>One quart of water for every inch of trunk. A 7 ft tree has a trunk of about 4 inches, so it needs a stand that holds a gallon. There is a chart in the <Link href="/care#stand" className="underline underline-offset-4">care guide</Link>.</>, "One quart of water for every inch of trunk. A 7 ft tree has a trunk of about 4 inches, so it needs a stand that holds a gallon."],
    ["How tall a tree can I fit?", <>Take your ceiling height and subtract one foot. <Link href="/sizes" className="underline underline-offset-4">The size guide</Link> shows how to measure.</>, "Take your ceiling height and subtract one foot. The size guide shows how to measure."],
    ["How long will a live tree last indoors?", <>Between three and six weeks, depending on the species and the temperature of the room. Scotch pine, Noble and Nordmann firs last longest. Douglas and Norway spruce last the shortest time.</>, "Between three and six weeks, depending on the species and the temperature of the room. Scotch pine, Noble and Nordmann firs last longest."],
  ]},
  { title: "Pets and children", items: [
    ["Are trees safe around pets?", <>Firs are the gentlest, but no tree is a snack. Needles can upset a stomach, and the stand water can make a cat or dog ill, especially with preservative in it. Cover the water, or use a <Link href="/extras/burlap-tree-collar" className="underline underline-offset-4">collar</Link>. Skip blue spruce if your dog chews.</>, "Firs are the gentlest, but no tree is a snack. Needles can upset a stomach, and the stand water can make a cat or dog ill. Cover the water, and skip blue spruce if your dog chews."],
    ["What about small children?", <>Anchor a tall tree to a wall or the ceiling if children or pets climb. Keep glass ornaments and small pieces off the lower branches.</>, "Anchor a tall tree to a wall or the ceiling if children or pets climb. Keep glass ornaments and small pieces off the lower branches."],
  ]},
  { title: "After Christmas", items: [
    ["How do I get rid of the tree?", <>Most towns collect trees in the first two weeks of January and chip them into mulch. Slide a <Link href="/extras/tree-removal-bags" className="underline underline-offset-4">removal bag</Link> around the tree before you move it, and you will catch most of the needles. Do not burn a tree in a fireplace. The resin builds up in the chimney.</>, "Most towns collect trees in the first two weeks of January and chip them into mulch. Use a removal bag to catch needles. Do not burn a tree in a fireplace."],
    ["Can I plant the tabletop tree?", <>Yes. Keep it indoors for no more than ten days, move it outside for a few days, then plant it in spring.</>, "Yes. Keep it indoors for no more than ten days, move it outside for a few days, then plant it in spring."],
  ]},
  { title: "Delivery and returns", items: [
    ["When will my tree arrive?", <>Live trees leave the farm on {BIZ.liveShipDays}. Most addresses receive them in one to four days. Type your ZIP code on the product page for exact dates. See <Link href="/delivery" className="underline underline-offset-4">Delivery</Link>.</>, `Live trees leave the farm on ${BIZ.liveShipDays}. Most addresses receive them in one to four days.`],
    ["What if nobody is home?", <>The carrier leaves the box at the door. A live tree is fine outside for a day in cold weather. Tell us in the delivery note if you will be away.</>, "The carrier leaves the box at the door. A live tree is fine outside for a day in cold weather. Tell us in the delivery note if you will be away."],
    ["What if my tree arrives damaged?", <>Send photos within 48 hours. We replace it or refund it. See <Link href="/returns" className="underline underline-offset-4">Returns and refunds</Link>.</>, "Send photos within 48 hours. We replace it or refund it."],
    ["Can I return a live tree because I changed my mind?", <>No. A live tree is cut for you. Artificial trees and extras can be returned within 30 days.</>, "No. A live tree is cut for you. Artificial trees and extras can be returned within 30 days."],
  ]},
];

export default function FAQ() {
  const all = groups.flatMap((g) => g.items);
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: all.map(([q, , a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
      <header className="grid md:grid-cols-12 gap-6"><h1 className="serif text-6xl md:col-span-10">Things people ask us.</h1></header>
      <Divider className="my-10" />
      <div className="grid md:grid-cols-12 gap-x-12 gap-y-14">
        {groups.map((g) => (
          <section key={g.title} className="md:col-span-8 md:col-start-4" aria-label={g.title}>
            <h2 className="label text-bark mb-3">{g.title}</h2>
            <div className="border-t-[3px] border-double border-bark/60">
              {g.items.map(([q, a]) => (
                <details key={q} className="group border-b rule py-4">
                  <summary className="cursor-pointer serif-text text-xl list-none flex justify-between gap-6">{q}<span aria-hidden className="label text-tan group-open:rotate-45 transition-transform">+</span></summary>
                  <div className="mt-3 max-w-[60ch] text-ink/90">{a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
        <p className="md:col-span-8 md:col-start-4">Not here? <Link href="/contact" className="underline underline-offset-4 decoration-gold decoration-2">Ask us.</Link></p>
      </div>
    </div>
  );
}
