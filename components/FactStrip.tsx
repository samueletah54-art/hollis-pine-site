import { BIZ } from "@/data/business";

const facts: [string, string][] = [
  ["Cut to order", "Never before you order"],
  ["Ships", "Mon, Tue, Wed"],
  ["Arrives", "In 1 to 4 days"],
  ["Order by", BIZ.orderBy],
];

/** Four equal cells: one column on phones, 2 x 2 on tablets, one row on desktop. Same label and value style in every cell. */
export default function FactStrip() {
  return (
    <section aria-label="In short" className="mx-auto max-w-[88rem] px-5 md:px-10 mt-12">
      <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y-[3px] border-double border-bark/60 divide-y md:divide-y-0 divide-bark/30">
        {facts.map(([k, v], i) => (
          <div key={k} className={`px-4 py-5 text-center flex flex-col items-center justify-start gap-1 border-bark/30 ${i % 2 === 1 ? "md:border-l" : ""} ${i > 0 ? "lg:border-l" : ""} ${i >= 2 ? "md:border-t lg:border-t-0" : ""}`}>
            <dt className="label text-bark leading-none">{k}</dt>
            <dd className="serif-text text-xl leading-snug">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
