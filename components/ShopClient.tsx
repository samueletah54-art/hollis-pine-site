"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/data/products";
import { categoryLabel, heightBuckets, inBucket, priceFrom, roomLabels, type HeightBucket } from "@/lib/catalog";
import { earliestArrival } from "@/lib/delivery";
import ProductTile from "./ProductTile";

const priceBands = [
  { id: "u75", label: "Under $75", lo: 0, hi: 75 },
  { id: "75-150", label: "$75–$150", lo: 75, hi: 150 },
  { id: "150-300", label: "$150–$300", lo: 150, hi: 300 },
  { id: "300p", label: "$300 and up", lo: 300, hi: Infinity },
];
const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "tall", label: "Tallest first" },
  { id: "name", label: "Name, A–Z" },
];

export default function ShopClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();

  const types = sp.getAll("type");
  const species = sp.getAll("species");
  const heights = sp.getAll("height") as HeightBucket[];
  const prices = sp.getAll("price");
  const rooms = sp.getAll("room");
  const scent = sp.getAll("scent");
  const flocked = sp.get("flocked") === "1";
  const prelit = sp.get("prelit") === "1";
  const pet = sp.get("pet") === "1";
  const arrive = sp.get("arrive") ?? "";
  const sort = sp.get("sort") ?? "featured";

  const set = useCallback(
    (key: string, values: string[]) => {
      const next = new URLSearchParams(sp.toString());
      next.delete(key);
      values.filter(Boolean).forEach((v) => next.append(key, v));
      const qs = next.toString();
      router.replace(qs ? `${path}?${qs}` : path, { scroll: false });
    },
    [sp, router, path],
  );
  const toggle = (key: string, cur: string[], v: string) => set(key, cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);

  const liveSpecies = useMemo(() => Array.from(new Set(products.filter((p) => p.category === "live" && p.species).map((p) => p.species!))), [products]);

  const shown = useMemo(() => {
    const arriveBy = arrive ? new Date(arrive + "T23:59:59") : null;
    const list = products.filter((p) => {
      if (types.length && !types.includes(p.category)) return false;
      if (species.length && !(p.species && species.includes(p.species))) return false;
      if (heights.length && !p.sizes.some((s) => heights.some((h) => inBucket(s, h)))) return false;
      if (prices.length) {
        const ok = p.sizes.some((s) => s.price !== null && prices.some((id) => { const b = priceBands.find((x) => x.id === id)!; return s.price! >= b.lo && s.price! < b.hi; }));
        if (!ok) return false;
      }
      if (rooms.length && !p.rooms.some((r) => rooms.includes(r))) return false;
      if (flocked && !p.flocked) return false;
      if (prelit && !p.prelit) return false;
      if (pet && !p.petFriendlier) return false;
      if (scent.length) {
        const strong = p.fragrance >= 3, low = p.fragrance <= 1;
        if (!((scent.includes("strong") && strong) || (scent.includes("low") && low))) return false;
      }
      if (arriveBy) {
        const first = earliestArrival(p.category === "live", p.stock === "quote");
        if (first > arriveBy) return false;
      }
      return true;
    });
    const price = (p: Product) => priceFrom(p) ?? Number.MAX_SAFE_INTEGER;
    const top = (p: Product) => Math.max(0, ...p.sizes.map((s) => s.heightMax ?? 0));
    const order = (p: Product) => (p.featured ? 0 : 1);
    list.sort((a, b) => {
      if (sort === "price-asc") return price(a) - price(b);
      if (sort === "price-desc") return (priceFrom(b) ?? -1) - (priceFrom(a) ?? -1);
      if (sort === "tall") return top(b) - top(a);
      if (sort === "name") return a.name.localeCompare(b.name);
      return order(a) - order(b);
    });
    return list;
  }, [products, types, species, heights, prices, rooms, scent, flocked, prelit, pet, arrive, sort]);

  const activeCount = types.length + species.length + heights.length + prices.length + rooms.length + scent.length + (flocked ? 1 : 0) + (prelit ? 1 : 0) + (pet ? 1 : 0) + (arrive ? 1 : 0);

  const Check = ({ id, checked, onChange, children }: { id: string; checked: boolean; onChange: () => void; children: React.ReactNode }) => (
    <label htmlFor={id} className="flex items-start gap-3 py-1 cursor-pointer text-[.95rem]">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="mt-[.35rem] size-4 accent-[#8c2f2b]" />
      <span>{children}</span>
    </label>
  );
  const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <fieldset className="border-t rule pt-4 pb-5">
      <legend className="label text-muted float-left w-full mb-2">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );

  const rail = (
    <div>
      <Group title="Type">
        {(["live", "artificial", "commercial", "addon"] as const).map((c) => (
          <Check key={c} id={`t-${c}`} checked={types.includes(c)} onChange={() => toggle("type", types, c)}>{categoryLabel[c]}</Check>
        ))}
      </Group>
      <Group title="Species">
        {liveSpecies.map((s) => (<Check key={s} id={`s-${s}`} checked={species.includes(s)} onChange={() => toggle("species", species, s)}>{s}</Check>))}
      </Group>
      <Group title="Height">
        {heightBuckets.map((h) => (<Check key={h.id} id={`h-${h.id}`} checked={heights.includes(h.id)} onChange={() => toggle("height", heights, h.id)}>{h.label}</Check>))}
      </Group>
      <Group title="Price">
        {priceBands.map((b) => (<Check key={b.id} id={`p-${b.id}`} checked={prices.includes(b.id)} onChange={() => toggle("price", prices, b.id)}>{b.label}</Check>))}
      </Group>
      <Group title="Room">
        {roomLabels.map((r) => (<Check key={r} id={`r-${r}`} checked={rooms.includes(r)} onChange={() => toggle("room", rooms, r)}><span className="capitalize">{r}</span></Check>))}
      </Group>
      <Group title="Features">
        <Check id="f-prelit" checked={prelit} onChange={() => set("prelit", prelit ? [] : ["1"])}>Pre-lit</Check>
        <Check id="f-flocked" checked={flocked} onChange={() => set("flocked", flocked ? [] : ["1"])}>Flocked</Check>
        <Check id="f-strong" checked={scent.includes("strong")} onChange={() => toggle("scent", scent, "strong")}>Strong fragrance</Check>
        <Check id="f-low" checked={scent.includes("low")} onChange={() => toggle("scent", scent, "low")}>Little or no fragrance</Check>
        <Check id="f-pet" checked={pet} onChange={() => set("pet", pet ? [] : ["1"])}>Pet-friendlier</Check>
        <p className="text-xs text-muted mt-1 pl-7">Easier on pets. No tree is a snack. Keep the stand water covered.</p>
      </Group>
      <Group title="Arrive by">
        <label htmlFor="arrive" className="sr-only">Arrive by date</label>
        <input id="arrive" type="date" value={arrive} onChange={(e) => set("arrive", e.target.value ? [e.target.value] : [])} className="field" />
        <p className="text-xs text-muted mt-2">Live trees ship Mon–Wed. We'll hide anything that can't make it.</p>
      </Group>
      {activeCount > 0 && (
        <button className="mt-2 underline underline-offset-4 decoration-berry" onClick={() => router.replace(path, { scroll: false })}>Clear all filters ({activeCount})</button>
      )}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[15rem_1fr] gap-x-12">
      <aside aria-label="Filters" className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
        <details className="lg:hidden border-y rule py-3 mb-6">
          <summary className="label cursor-pointer">Filters {activeCount ? `(${activeCount})` : ""}</summary>
          <div className="mt-4">{rail}</div>
        </details>
        <div className="hidden lg:block">{rail}</div>
      </aside>

      <section aria-label="Products">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b rule pb-3 mb-8">
          <p className="num" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? "product" : "products"}</p>
          <div className="flex items-baseline gap-3">
            <label htmlFor="sort" className="label text-muted">Sort</label>
            <select id="sort" value={sort} onChange={(e) => set("sort", e.target.value === "featured" ? [] : [e.target.value])} className="field !w-auto min-w-44">
              {sorts.map((s) => (<option key={s.id} value={s.id}>{s.label}</option>))}
            </select>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="py-16 max-w-md">
            <p className="serif text-4xl">Nothing matches that.</p>
            <p className="mt-3 text-muted">Try fewer filters, or a later arrival date. Live trees only ship Monday through Wednesday.</p>
            <button className="btn btn-ghost mt-6" onClick={() => router.replace(path, { scroll: false })}>Clear filters</button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
            {shown.map((p, i) => (<li key={p.slug} className={i % 5 === 1 ? "xl:mt-10" : ""}><ProductTile p={p} priority={i < 3} /></li>))}
          </ul>
        )}
      </section>
    </div>
  );
}
