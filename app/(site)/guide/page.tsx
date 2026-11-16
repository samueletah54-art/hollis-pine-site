import type { Metadata } from "next";
import TreeQuiz from "@/components/TreeQuiz";
import { all } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Find your tree: a five-question guide",
  description: "Answer five questions about scent, ornaments, ceiling height, budget and pets, and we'll rank our live trees for your home.",
  alternates: { canonical: "/guide" },
};

const live = all.filter((p) => p.category === "live" && p.facts && p.slug !== "tabletop-live-tree");

export default function Guide() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <header className="border-b-[3px] border-double border-bark/60 pb-10">
        <p className="label text-gold">Not sure which one?</p>
        <h1 className="serif text-5xl md:text-8xl leading-[.95] mt-3 max-w-[14ch]">Find your tree in five questions.</h1>
        <p className="mt-6 text-xl max-w-[48ch] text-ink/85">Tell us about your room and we'll rank our live trees for it. Nothing is saved or sent.</p>
      </header>
      <div className="pt-12"><TreeQuiz trees={live} /></div>
    </div>
  );
}
