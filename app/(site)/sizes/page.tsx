import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Size guide: how tall a tree fits your room",
  description: "How to measure your ceiling and choose the right height of Christmas tree. A drawn height chart, a ceiling table, and tree widths.",
  alternates: { canonical: "/sizes" },
};

export default function Sizes() {
  return (
    <DocPage title="How tall a tree fits?" intro="Measure the ceiling, take off one foot, and that is your tree. The chart shows what 5, 7 and 9 feet look like next to a door and a person." wide>
      <h2 className="!mt-6">Measure your ceiling</h2>
      <ol>
        <li><b>Pick the spot.</b> Stand where the tree will go. Keep it three feet from a radiator, a heating vent or a fireplace.</li>
        <li><b>Measure up.</b> Put a tape measure on the floor and run it to the ceiling. Write the number down. If the ceiling slopes, measure at the highest point the tree will touch.</li>
        <li><b>Take off one foot.</b> A stand adds about 4 inches, a topper another 10. A tree that touches the ceiling looks squashed and bends at the top.</li>
        <li><b>Check the width.</b> A tree is about half as wide as it is tall. A 7 ft tree wants a circle about 40 inches across, plus room to walk round it.</li>
        <li><b>Check the way in.</b> Our trees arrive netted, which makes them about a third narrower than they will be. Check doors, stairs and hallways between the front door and the room.</li>
      </ol>

      <h2>What fits under your ceiling</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left min-w-[26rem] num">
          <caption className="sr-only">Ceiling height and the tallest tree that fits</caption>
          <thead><tr className="border-b-[3px] border-double border-bark/60 label text-bark"><th scope="col" className="py-3 pr-4">Ceiling</th><th scope="col" className="pr-4">Tallest tree</th><th scope="col">Width needed</th></tr></thead>
          <tbody>
            {[["7 ft", "5 to 6 ft", "About 34 in"], ["8 ft", "6 to 7 ft", "About 40 in"], ["9 ft", "7 to 8 ft", "About 46 in"], ["10 ft", "8 to 9 ft", "About 52 in"], ["12 ft or more", "9 to 11 ft", "About 60 in"]].map((r) => (
              <tr key={r[0]} className="border-b rule"><th scope="row" className="py-3 pr-4 font-normal">{r[0]}</th><td className="pr-4">{r[1]}</td><td>{r[2]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Which stand?</h2>
      <p>The stand should hold one quart of water for every inch of trunk. A 7 ft tree has a trunk of about 4 inches, so it wants a stand that holds at least a gallon. See the <Link href="/care#stand">stand chart</Link> in the care guide.</p>

      <h2>Big spaces</h2>
      <p>Lobbies, shop floors and town squares need trees from 9 to 30 feet. We cut those to your height. <Link href="/business">Ask for a quote.</Link></p>

      <h2>Shop by height</h2>
      <ul>
        <li><Link href="/shop?height=under6">Under 6 ft</Link></li>
        <li><Link href="/shop?height=6-7">6 to 7 ft</Link></li>
        <li><Link href="/shop?height=7-8">7 to 8 ft</Link></li>
        <li><Link href="/shop?height=8plus">8 ft and taller</Link></li>
      </ul>
    </DocPage>
  );
}
