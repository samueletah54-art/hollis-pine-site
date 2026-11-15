import Divider from "./Divider";

/** Shared layout for prose pages: label, big title, short intro, then a readable column. */
export default function DocPage({ title, intro, children, wide }: { label?: string; title: string; intro?: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <header className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-10">
          <h1 className="serif text-6xl">{title}</h1>
          {intro && <p className="mt-6 text-lg max-w-[56ch] text-ink/90">{intro}</p>}
        </div>
      </header>
      <Divider className="my-10" />
      <div className="grid md:grid-cols-12 gap-x-12">
        <div className={`${wide ? "md:col-span-9 md:col-start-4" : "md:col-span-7 md:col-start-4"} prose-care`}>{children}</div>
      </div>
    </div>
  );
}
