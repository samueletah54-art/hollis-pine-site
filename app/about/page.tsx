import type { Metadata } from "next";
import Link from "next/link";
import Banner from "@/components/Banner";
import Divider from "@/components/Divider";
import Photo from "@/components/Photo";
import { hasImage } from "@/lib/images";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The farm: where the trees grow and how they are packed",
  description: "How Hollis & Pine grows, cuts, wraps and ships Christmas trees from its two farms in Oregon and North Carolina.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20 grid md:grid-cols-12 gap-x-10 gap-y-6">
        <div className="md:col-span-10">
          <h1 className="serif text-7xl">We grow trees, and we know which one to sell you.</h1>
          <p className="mt-6 text-lg max-w-[54ch]">Hollis &amp; Pine is a small family business with two farms, one in Oregon and one in North Carolina. We grow the trees, cut them to order, and pack them ourselves.</p>
        </div>
      </section>

      <section className="mt-14"><Banner src="/images/about-farm-winter.webp" alt="Rows of fir trees on a hillside in winter, a farm barn in the distance" caption="The farm in winter" /></section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 grid md:grid-cols-12 gap-10" aria-labelledby="two">
        <h2 id="two" className="label text-bark md:col-span-3">Two farms</h2>
        <div className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-10">
          <Reveal className="border-t-[3px] border-double border-bark/60 pt-5">
            <p className="serif text-4xl">Oregon</p>
            <p className="mt-3">Noble, Douglas, Grand, Nordmann and Concolor fir, blue spruce, Norway spruce, and the big commercial trees. Cool, wet winters grow a stiff tree that holds its needles.</p>
          </Reveal>
          <Reveal delay={100} className="border-t-[3px] border-double border-bark/60 pt-5">
            <p className="serif text-4xl">North Carolina</p>
            <p className="mt-3">Fraser, Balsam and Canaan fir, and Scotch pine. The farm sits high in the Blue Ridge mountains, where cold nights slow the growth and make the tree dense.</p>
          </Reveal>
        </div>
      </section>


      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 grid md:grid-cols-12 gap-10" aria-labelledby="how">
        <h2 id="how" className="label text-bark md:col-span-3">How we work</h2>
        <ul className="md:col-span-8 border-t-[3px] border-double border-bark/60">
          {[
            ["We cut to order.", "A tree is cut after you order it. It does not sit in a warehouse."],
            ["We ship early in the week.", "Live trees leave on Monday, Tuesday and Wednesday, so they are not stuck in a depot over a weekend."],
            ["We tell you which tree to buy.", "If a Douglas fir suits your room and your budget better than a Noble, we will say so."],
            ["We take big trees back.", "If you are a business, our crew takes the tree down in January and hauls it away."],
          ].map(([t, d]) => (
            <li key={t} className="grid md:grid-cols-[1fr_1.4fr] gap-x-8 gap-y-1 py-5 border-b rule"><h3 className="serif-text text-2xl">{t}</h3><p className="text-ink/90">{d}</p></li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24">
        {(hasImage("/images/packing-barn.webp") || hasImage("/images/worker-carrying-tree.webp")) && <div className="grid grid-cols-2 md:grid-cols-12 gap-5">
          <Photo hideIfMissing src="/images/packing-barn.webp" alt="Netted fir trees laid out on a wooden table inside a barn, window light" sizes="(min-width:768px) 50vw, 100vw" plate className="col-span-2 md:col-span-7 aspect-[16/9]" />
          <Photo hideIfMissing src="/images/worker-carrying-tree.webp" alt="A worker in a canvas coat carrying a freshly cut fir across a frosty field, seen from behind" sizes="(min-width:768px) 40vw, 50vw" plate className="col-span-2 md:col-span-5 aspect-[16/9] md:mt-10" />
        </div>}
        <Divider className="mt-16" />
        <p className="serif-text text-2xl mt-8">Want to talk to a person? <Link href="/contact" className="underline underline-offset-[6px] decoration-gold decoration-[3px]">Here is how.</Link></p>
      </section>
    </>
  );
}
