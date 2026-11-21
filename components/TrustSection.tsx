import Link from "next/link";
import { BIZ } from "@/data/business";
import Photo from "./Photo";
import Todo from "./Todo";

const steps: [string, string][] = [
  ["We cut it.", "Nothing is cut until you order. We cut it the week it ships."],
  ["We wrap it.", `Netted, with the trunk kept wet. It leaves on ${BIZ.liveShipDays}, so it never sits in a depot over a weekend.`],
  ["You stand it in water.", "It reaches most doors in one to four days. Saw a half inch off the base, put it in water within four hours, and keep the stand full."],
];

/** Guarantee, delivery area and how it works. Anything the owner must confirm is tagged TODO (see CLIENT-TO-CONFIRM.md, section 7). */
export default function TrustSection() {
  return (
    <section className="mx-auto max-w-[88rem] px-5 md:px-10 pt-24 md:pt-32" aria-labelledby="trust">
      <h2 id="trust" className="serif text-5xl max-w-[18ch]">What you can count on.</h2>

      <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-10 border-t-[3px] border-double border-bark/60 pt-10">
        <div>
          <h3 className="serif-text text-3xl">Our guarantee</h3>
          <p className="mt-3 max-w-[48ch]">
            <Todo>write the guarantee: what is covered, how long customers have to report a problem, and whether you replace or refund.</Todo>
          </p>
          <p className="mt-3"><Link href="/returns" className="underline underline-offset-[6px] decoration-gold decoration-[3px] font-medium">Returns and guarantee</Link></p>
        </div>
        <div>
          <h3 className="serif-text text-3xl">Where we deliver</h3>
          <p className="mt-3 max-w-[48ch]">The 48 contiguous states. We cannot ship live trees to Alaska, Hawaii or a P.O. box. <Todo>confirm the states and regions you serve, and any state that restricts live evergreens.</Todo></p>
          <p className="mt-3"><Link href="/delivery" className="underline underline-offset-[6px] decoration-gold decoration-[3px] font-medium">Delivery days and cut-off dates</Link></p>
        </div>
      </div>

      <div className="mt-14 grid md:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="md:col-span-7">
          <h3 className="serif text-4xl">How it works</h3>
          <ol className="mt-6 border-t-[3px] border-double border-bark/60">
            {steps.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[3.5rem_1fr] gap-x-4 py-6 border-b rule">
                <span className="serif text-5xl text-tan num leading-none" aria-hidden="true">{i + 1}</span>
                <div><h4 className="serif-text text-2xl">{t}</h4><p className="mt-1 text-ink/90 max-w-[50ch]">{d}</p></div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm"><Todo>confirm these three steps match how you really cut, wrap and ship.</Todo></p>
        </div>
        <div className="md:col-span-5 grid grid-cols-2 gap-5">
          <Photo src="/images/delivered-netted-tree.webp" alt="A netted fir tree standing on a porch beside a front door with a wreath" sizes="(min-width:768px) 20vw, 45vw" plate className="aspect-[3/4]" />
          <Photo src="/images/delivered-netted-tree-snow.webp" alt="A netted fir tree on a snowy step in front of a tan front door with a wreath" sizes="(min-width:768px) 20vw, 45vw" plate className="aspect-[3/4] mt-10" />
        </div>
      </div>
    </section>
  );
}
