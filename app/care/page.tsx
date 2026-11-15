import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { all } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The care guide: how to pick, cut, water and keep a live tree",
  description: "How to choose a Christmas tree, how to cut and water it, what size stand you need, and how long each species lasts. Plain advice from a tree farm.",
  alternates: { canonical: "/care" },
};

const toc = [["pick", "Picking a tree"], ["unbox", "The first four hours"], ["water", "Watering"], ["stand", "Stand sizing"], ["lasts", "How long each one lasts"], ["after", "After Christmas"], ["fake", "Artificial trees"]];

const lasts = all.filter((p) => p.category === "live" && p.facts && p.slug !== "tabletop-live-tree");

export default function Care() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <header className="grid md:grid-cols-12 gap-6 border-b-[3px] border-double border-bark/60 pb-10">
        <div className="md:col-span-10">
          <h1 className="serif text-5xl md:text-8xl leading-[.92]">Keep it green through New Year.</h1>
          <p className="mt-6 text-xl max-w-[48ch] text-ink/85">A few habits keep a live tree green until New Year. Most of them involve water.</p>
        </div>
      </header>

      <div className="grid md:grid-cols-12 gap-x-12 mt-10">
        <aside className="md:col-span-3 hidden md:block">
          <nav aria-label="On this page" className="sticky top-28">
            <ol className="space-y-2 border-l rule pl-4">
              {toc.map(([id, l]) => (<li key={id}><a href={`#${id}`} className="hover:underline underline-offset-4 decoration-tan">{l}</a></li>))}
            </ol>
          </nav>
        </aside>

        <div className="md:col-span-8 lg:col-span-7 prose-care">
          <h2 id="pick" className="scroll-mt-24 !mt-0">Picking a tree</h2>
          <p className="drop">Start with the room, not the tree. Measure the ceiling and subtract one foot. That leaves room for the stand and a topper. Then measure the floor. A tree is about half as wide as it is tall, so a seven-footer needs a circle about 40 inches across, plus room to walk round it. The <a href="/sizes">size guide</a> has a chart.</p>
          <p>Then decide what matters. If it's smell, buy a Balsam or Grand fir. If it's holding heavy ornaments, Fraser, Noble or blue spruce. If you forget the water, Scotch pine. If someone sneezes at pine, Nordmann. You can filter the shop by each of those.</p>
          <p>If you are buying a tree somewhere else, the check is simple: lift it a few inches and drop the butt on the ground. Green needles should stay on. A few brown ones from the inside are fine. A shower of green means a dry tree.</p>

          <Photo src="/images/care-trimming-trunk.webp" alt="Gloved hands sawing a half inch off the base of a fir trunk" sizes="(min-width:768px) 60vw, 100vw" plate className="aspect-[16/9] my-10" />

          <h2 id="unbox" className="scroll-mt-24">The first four hours</h2>
          <p>When the box arrives, open it right away. The tree will have been in the dark for a day or two and wants air. Cut the net off, but leave the branches alone. They'll drop on their own over the next day.</p>
          <ul>
            <li>Saw a half inch off the trunk, straight across. Not on an angle, not a V. A flat cut sits in the bowl and takes water.</li>
            <li>Put it in the stand within four hours of the cut. After that, the sap can seal the pores.</li>
            <li>Fill the bowl completely. A fresh-cut six-footer drinks a quart or more the first day.</li>
            <li>Let the branches drop for 24 hours before you hang lights and ornaments.</li>
          </ul>

          <h2 id="water" className="scroll-mt-24">Watering</h2>
          <p>This is the part that matters. A tree is a cut plant that's still trying to drink. If the water level falls below the base, the cut seals in a few hours and you can't reopen it without a fresh cut.</p>
          <ul>
            <li>Check the water morning and night the first week. After that, every morning.</li>
            <li>Plain tap water is fine. Preservative helps a little. Sugar, aspirin and soda do not help.</li>
            <li>Keep the tree three feet from a fireplace, radiator, heating vent and television.</li>
            <li>Turn the lights off when you leave and when you go to bed. LED lights run cool; older incandescent strings do not.</li>
          </ul>

          <h2 id="stand" className="scroll-mt-24">Stand sizing</h2>
          <p>The rule: <b>one quart of water for every inch of trunk diameter</b>, and a stand that fits the trunk without whittling it. Never shave the sides of a trunk to make it fit. The outer layer is the part that drinks.</p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left min-w-[28rem] num">
              <caption className="sr-only">Stand size by tree height</caption>
              <thead><tr className="border-b-[3px] border-double border-bark/60 label text-muted"><th scope="col" className="py-3 pr-4">Tree height</th><th scope="col" className="pr-4">Typical trunk</th><th scope="col">Stand holds at least</th></tr></thead>
              <tbody>
                {[["5–6 ft", "2–3 in", "3 qt"], ["6–7 ft", "3–4 in", "4 qt (1 gal)"], ["7–8 ft", "4–5 in", "5 qt"], ["8–9 ft", "5–6 in", "6 qt"], ["12–20 ft", "8–10 in", "3 gal"]].map((r) => (<tr key={r[0]} className="border-b rule"><th scope="row" className="py-3 pr-4 font-normal">{r[0]}</th><td className="pr-4">{r[1]}</td><td>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p>Our <Link href="/extras/water-reservoir-stand">water-reservoir stand</Link> holds a gallon. The <Link href="/extras/heavy-duty-stand">heavy-duty stand</Link> is for trees 12 feet and up.</p>

          <h2 id="lasts" className="scroll-mt-24">How long each one lasts</h2>
          <p>Assuming a fresh cut, a full bowl and a cool room. A warm house takes a week off.</p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left min-w-[28rem]">
              <caption className="sr-only">Needle retention by species</caption>
              <thead><tr className="border-b-[3px] border-double border-bark/60 label text-muted"><th scope="col" className="py-3 pr-4">Species</th><th scope="col">Needle retention</th></tr></thead>
              <tbody>
                {lasts.map((p) => (<tr key={p.slug} className="border-b rule"><th scope="row" className="py-3 pr-4 font-normal"><Link href={`/trees/${p.slug}`}>{p.name}</Link></th><td>{p.facts!.needleRetention}</td></tr>))}
              </tbody>
            </table>
          </div>

          <h2 id="after" className="scroll-mt-24">After Christmas</h2>
          <p>Slide a <Link href="/extras/tree-removal-bags">removal bag</Link> around the tree before you move it. Most municipalities collect trees in the first two weeks of January for chipping into mulch. If yours doesn't, a tree stripped of decorations can go in the back of a yard for birds, or into a brush pile.</p>
          <p>Do not burn it in a fireplace. Resin builds up in the chimney.</p>

          <h2 id="fake" className="scroll-mt-24">Artificial trees</h2>
          <p>Fluff every branch tip, bottom to top, working outward from the trunk. This is the difference between a tree that looks like a tree and one that looks like a bottle brush. Twenty minutes.</p>
          <p>Store it dry. A rolling tree bag keeps the sections together. Pull the lights apart at the connectors if one string goes dark, and check the fuse. We include spares.</p>
        </div>
      </div>
    </div>
  );
}
