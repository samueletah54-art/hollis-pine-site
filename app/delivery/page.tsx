import type { Metadata } from "next";
import Link from "next/link";
import Banner from "@/components/Banner";
import DocPage from "@/components/DocPage";
import Photo from "@/components/Photo";
import { BIZ } from "@/data/business";

export const metadata: Metadata = {
  title: "Delivery: days, cut-off dates and where we ship",
  description: "When live and artificial trees ship, how long delivery takes, the order-by date, which states we serve, and what happens if nobody is home.",
  alternates: { canonical: "/delivery" },
};

export default function Delivery() {
  return (
    <>
      <DocPage title="When it leaves, and when it arrives." intro={`Live trees leave the farm on ${BIZ.liveShipDays}. Most addresses receive them in one to four days. Order by ${BIZ.orderBy} for delivery before Christmas.`}>
        <h2 className="!mt-0">Delivery days</h2>
        <ul>
          <li><b>Live trees, wreaths and garland</b> leave on {BIZ.liveShipDays}. We cut them that week. They never sit in a depot over a weekend.</li>
          <li><b>Artificial trees and extras</b> leave Monday to Friday and take two to five working days.</li>
          <li>An order placed Thursday to Sunday leaves the following Monday.</li>
          <li>On the product page, type your ZIP code to see the dates for your address.</li>
        </ul>

        <h2>Cut-off dates</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left min-w-[24rem]">
            <caption className="sr-only">Order cut-off dates</caption>
            <thead><tr className="border-b-[3px] border-double border-bark/60 label text-bark"><th scope="col" className="py-3 pr-4">If you want it</th><th scope="col">Order by</th></tr></thead>
            <tbody>
              <tr className="border-b rule"><th scope="row" className="py-3 pr-4 font-normal">Before Christmas</th><td className="text-cranberry font-semibold">{BIZ.orderBy}</td></tr>
              <tr className="border-b rule"><th scope="row" className="py-3 pr-4 font-normal">A specific week</th><td>Add a note at checkout. We aim for it.</td></tr>
              <tr className="border-b rule"><th scope="row" className="py-3 pr-4 font-normal">Commercial trees, 20 ft or more</th><td>Early November. Call us.</td></tr>
            </tbody>
          </table>
        </div>
        <p>After {BIZ.orderBy}, call us. We may still be able to help.</p>

        <h2>Where we deliver</h2>
        <p>We deliver to the 48 contiguous states. We cannot ship live trees to Alaska, Hawaii, U.S. territories or P.O. boxes. A few states limit the import of live evergreens. We will tell you at checkout if yours does.</p>

        <h2>What it costs</h2>
        <ul>
          <li>Live trees under 7 ft: $24 each. Live trees 7 ft and taller: $34 each.</li>
          <li>Wreaths and garland ship free with a tree.</li>
          <li>Artificial trees: free over $250, otherwise $19 each.</li>
          <li>Stands, skirts and ornaments on their own: $9. Free with any tree.</li>
        </ul>

        <h2>If nobody is home</h2>
        <p>The carrier will leave the box at your door. Do not worry about a live tree sitting outside for a day in cold weather. It travels wrapped and wet. In warm weather, bring it into a garage or the shade the same day.</p>
        <p>If you will be away, tell us in the delivery note at checkout, and we will ship it later. If the carrier cannot reach your address, the box goes to the nearest depot. The carrier will leave a card telling you where.</p>

        <h2>When it arrives</h2>
        <ol>
          <li>Open the box the same day. Photograph any damage before you unpack.</li>
          <li>Cut a half inch off the trunk and stand it in water within four hours.</li>
          <li>If it is damaged, <Link href="/returns">tell us within 48 hours</Link>.</li>
        </ol>

        <h2>Business deliveries</h2>
        <p>Trees of 9 ft and taller arrive on our own truck or by freight, on a date we agree with you, with a crew to set them up. <Link href="/business">Ask for a quote.</Link></p>
      </DocPage>
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 mt-24 grid md:grid-cols-12 gap-x-12 gap-y-8 items-center" aria-labelledby="box">
        <div className="md:col-span-4 md:col-start-4 md:order-2">
          <h2 id="box" className="serif text-5xl">What arrives at your door.</h2>
          <p className="mt-5 text-lg">A tree in a net, wrapped at the base, with the trunk kept wet. Open it the same day, cut a half inch off the base, and stand it in water.</p>
        </div>
        <Photo src="/images/delivered-netted-tree.webp" alt="A netted fir tree standing on a porch beside a front door with a wreath" sizes="(min-width:768px) 30vw, 90vw" plate className="md:col-span-3 md:order-1 aspect-[3/4] max-w-sm" />
      </section>
      <div className="mt-24"><Banner src="/images/delivery-van-lane.webp" alt="A white delivery van on a snowy country lane between fir trees, early morning" caption="Out for delivery on a snowy lane" /></div>
    </>
  );
}
