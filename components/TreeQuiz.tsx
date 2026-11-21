"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Photo from "./Photo";
import Price from "./Price";
import type { Product } from "@/data/products";
import { priceFrom, urlFor, money } from "@/lib/catalog";

type Answers = { scent: string; ornaments: string; ceiling: string; budget: string; pets: string };
const start: Answers = { scent: "", ornaments: "", ceiling: "", budget: "", pets: "" };

const questions: { key: keyof Answers; title: string; options: [string, string][] }[] = [
  { key: "scent", title: "How much should the tree smell like Christmas?", options: [["strong", "As much as possible"], ["some", "A gentle scent"], ["low", "Barely any, I'm sensitive"]] },
  { key: "ornaments", title: "What are you hanging on it?", options: [["heavy", "Heavy glass and keepsake ornaments"], ["mixed", "A mix"], ["light", "Light ornaments and ribbon"]] },
  { key: "ceiling", title: "How high is the ceiling?", options: [["7", "About 8 ft"], ["8", "About 9 ft"], ["9", "10 ft or higher"]] },
  { key: "budget", title: "What do you want to spend?", options: [["low", "Keep it under $100"], ["mid", "$100 to $200"], ["high", "Whatever the right tree costs"]] },
  { key: "pets", title: "Pets or small children at home?", options: [["yes", "Yes"], ["no", "No"]] },
];

const strongBranches = (p: Product) => /strong/i.test(p.facts?.branchStrength ?? "");

/** Scores the live trees against five answers and shows the best three, with the reasons. */
function score(p: Product, a: Answers) {
  let n = 0; const why: string[] = [];
  if (a.scent === "strong") { n += p.fragrance * 2; if (p.fragrance >= 3) why.push("Strong, resinous scent"); }
  if (a.scent === "some") { n += p.fragrance === 2 ? 4 : p.fragrance === 1 || p.fragrance === 3 ? 2 : 0; if (p.fragrance === 2) why.push("A gentle, balanced scent"); }
  if (a.scent === "low") { n += (3 - p.fragrance) * 2; if (p.fragrance <= 1) why.push("Little scent"); }
  if (a.ornaments === "heavy") { if (strongBranches(p)) { n += 5; why.push("Strong branches for heavy ornaments"); } }
  if (a.ornaments === "mixed" && strongBranches(p)) n += 2;
  const fit = a.ceiling ? Number(a.ceiling) : 0;
  if (fit) {
    const ok = p.sizes.some((s) => (s.heightMax ?? 99) >= fit && (s.heightMax ?? 99) <= fit + 2);
    if (ok) { n += 4; why.push(`Comes in the right height for your room`); } else if (!p.sizes.some((s) => (s.heightMax ?? 99) <= fit + 1)) n -= 6;
  }
  const from = priceFrom(p) ?? 999;
  if (a.budget === "low") { if (from < 100) { n += 4; why.push(`From ${money(from)}`); } else n -= 3; }
  if (a.budget === "mid" && from <= 200) n += 2;
  if (a.pets === "yes" && p.petFriendlier) { n += 4; why.push("One of the gentler trees around pets"); }
  return { n, why };
}

export default function TreeQuiz({ trees }: { trees: Product[] }) {
  const [a, setA] = useState<Answers>(start);
  const done = Object.values(a).every(Boolean);
  const results = useMemo(() => (done ? trees.map((p) => ({ p, ...score(p, a) })).sort((x, y) => y.n - x.n).slice(0, 3) : []), [a, done, trees]);
  return (
    <div className="grid lg:grid-cols-12 gap-x-14 gap-y-12">
      <form className="lg:col-span-6 grid gap-8" onSubmit={(e) => e.preventDefault()}>
        {questions.map((q, i) => (
          <fieldset key={q.key}>
            <legend className="serif text-3xl"><span className="num text-gold mr-3" aria-hidden>{String(i + 1).padStart(2, "0")}</span>{q.title}</legend>
            <div className="mt-4 grid gap-2">
              {q.options.map(([v, label]) => (
                <label key={v} className={`flex min-h-12 items-center gap-3 border-2 px-4 py-2 cursor-pointer ${a[q.key] === v ? "border-gold bg-paper-deep" : "border-bark/50 hover:border-gold"}`}>
                  <input type="radio" name={q.key} value={v} checked={a[q.key] === v} onChange={() => setA({ ...a, [q.key]: v })} className="size-4 accent-[#d8b76a]" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        {Object.values(a).some(Boolean) && <button type="button" className="underline underline-offset-4 decoration-gold justify-self-start" onClick={() => setA(start)}>Start again</button>}
      </form>
      <div className="lg:col-span-6" aria-live="polite">
        <div className="lg:sticky lg:top-28">
          {!done ? (
            <div className="border-2 border-dashed border-bark/60 p-8">
              <p className="serif text-3xl">Your three trees appear here.</p>
              <p className="mt-3 text-muted max-w-[40ch]">Answer all five questions and we'll rank our live trees for you, with the reason for each.</p>
            </div>
          ) : (
            <>
              <p className="label text-gold">Your best three</p>
              <ol className="mt-4 grid gap-0 border-t rule">
                {results.map(({ p, why }, i) => (
                  <li key={p.slug} className="border-b rule">
                    <Link href={urlFor(p)} className="group grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-5 py-5">
                      <div className="relative aspect-square bg-paper-deep overflow-hidden"><Photo src={`/images/${p.slug}.webp`} alt="" sizes="128px" className="absolute inset-0" zoom /></div>
                      <div>
                        <p className="label text-muted">{i === 0 ? "Best match" : `Number ${i + 1}`}</p>
                        <h3 className="serif text-3xl leading-tight group-hover:underline underline-offset-4 decoration-gold decoration-2">{p.name}</h3>
                        <p className="mt-1 text-sm text-muted">{why.length ? why.slice(0, 3).join(" · ") : p.tagline}</p>
                        {priceFrom(p) !== null && <p className="mt-2">From <Price value={priceFrom(p)!} category={p.category} /></p>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link href="/shop?type=live" className="btn btn-ghost mt-6">See every live tree</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
