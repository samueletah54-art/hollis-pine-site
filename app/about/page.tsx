import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The farm: two family tree farms, Oregon and North Carolina",
  description: "Hollis & Pine grows Christmas trees on two family farms, one in the Oregon Cascades and one in the North Carolina Blue Ridge, and ships them across the U.S.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-24 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <p className="label text-berry mb-5">The farm</p>
          <h1 className="serif text-5xl md:text-[5.5rem] leading-[.93]">We grow trees. We also have opinions about them.</h1>
        </div>
        <p className="md:col-span-4 md:col-start-9 md:pt-24 text-lg">Hollis &amp; Pine started in 1987 on eleven acres in Ashe County, North Carolina. Today it's two family farms, 600 acres, and about forty people during the season.</p>
      </section>

      <section className="mt-14"><Photo src="/images/about-owners.jpg" alt="An older couple standing in front of rows of trees, mud on boots, squinting in the sun" sizes="100vw" priority className="h-[55vh] md:h-[75vh]" imgClassName="object-[50%_30%]" /></section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 grid md:grid-cols-12 gap-10">
        <h2 className="label text-berry md:col-span-3">How it started</h2>
        <div className="md:col-span-6 serif-text text-xl md:text-2xl leading-snug space-y-6">
          <p>Walt Hollis planted his first two thousand Fraser firs in 1987, on a slope his father said was too steep for anything but trouble. June Pine, who would later marry into the business, kept the books and the opinions.</p>
          <p>For twenty years they sold at the end of the driveway. Then a customer in Denver asked whether a tree could be mailed. It could, if you cut it the week it left, wrapped it wet and shipped it before the weekend. That's still the whole system.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28 grid md:grid-cols-12 gap-10" aria-labelledby="regions">
        <h2 id="regions" className="label text-berry md:col-span-3">Where the trees grow</h2>
        <div className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-12">
          <Reveal className="border-t-2 border-ink pt-5">
            <p className="serif text-5xl">Oregon</p>
            <p className="label text-muted mt-2">Cascade foothills, near Silverton</p>
            <p className="mt-4">Noble, Douglas, Grand and Nordmann fir, Colorado blue spruce, and the commercial giants. Cool, wet winters and volcanic soil grow a stiff, silvery tree with good needle retention.</p>
          </Reveal>
          <Reveal delay={100} className="border-t-2 border-ink pt-5 sm:mt-10">
            <p className="serif text-5xl">North Carolina</p>
            <p className="label text-muted mt-2">Blue Ridge, Ashe and Avery counties</p>
            <p className="mt-4">Fraser, Balsam and Canaan fir and Scotch pine. The altitude is above 4,000 feet and the Fraser fir grows nowhere else in the world. It's the tree most people picture.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          <Photo src="/images/netting.jpg" alt="A worker wrapping a freshly cut tree in netting on a wooden loading dock, breath visible in the cold" sizes="(min-width:768px) 40vw, 50vw" className="col-span-1 md:col-span-4 aspect-[4/5]" />
          <Photo src="/images/cutting.jpg" alt="Gloved hands sawing the base of a Noble fir on a frosty morning" sizes="(min-width:768px) 30vw, 50vw" className="col-span-1 md:col-span-4 aspect-[4/5] md:mt-16" />
          <Photo src="/images/family.jpg" alt="A family of four carrying a tree out of a farm field, kids laughing" sizes="(min-width:768px) 30vw, 100vw" className="col-span-2 md:col-span-4 aspect-[3/2] md:aspect-[4/5]" />
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-28 grid md:grid-cols-12 gap-10">
        <h2 className="label text-berry md:col-span-3">What we do differently</h2>
        <ul className="md:col-span-8 border-t border-ink">
          {[["We cut to order.", "A tree is cut after you order it, not before. No tree sits in a warehouse over a weekend."],["We plant two for every one we cut.", "A Fraser takes ten years. We plant every spring, and the fields you see in the photos were planted when your kids were in preschool."],["We tell you which tree to buy.", "If a Douglas fir is the right tree for your budget and your room, we will say so."],["We take the tree back in January.", "If you're a business, we do. If you're a family, there's a bag for it."]].map(([t, d]) => (
            <li key={t} className="grid md:grid-cols-[1fr_1.4fr] gap-x-8 gap-y-1 py-5 border-b rule"><h3 className="serif-text text-2xl">{t}</h3><p className="text-ink/85">{d}</p></li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24">
        <p className="serif-text text-2xl">Want to talk to a person? <Link href="/contact" className="underline underline-offset-[6px] decoration-berry decoration-2">Here's how.</Link></p>
      </section>
    </>
  );
}
