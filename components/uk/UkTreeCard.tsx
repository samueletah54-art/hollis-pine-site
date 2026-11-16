"use client";

import Photo from "../Photo";
import { gbp, type UkTree } from "@/data/uk";

/** A tree card. "Book this tree" preselects it in the booking form and scrolls there. */
export default function UkTreeCard({ tree }: { tree: UkTree }) {
  return (
    <li className="flex flex-col">
      <div className="relative aspect-[4/5] bg-[var(--uk-card)] overflow-hidden">
        <Photo src={tree.photo} alt={`${tree.name}, netted for delivery`} sizes="(min-width:1024px) 280px, (min-width:640px) 45vw, 90vw" className="absolute inset-0" />
        <span className="absolute left-3 top-3 bg-[#dfeadd] text-[var(--uk-green)] text-[.8125rem] font-medium px-2.5 py-1">Free delivery</span>
      </div>
      <h3 className="serif-uk text-[1.375rem] leading-snug mt-4">{tree.name}</h3>
      <p className="text-lg mt-1">{gbp(tree.price)}</p>
      <button
        type="button"
        className="uk-btn uk-btn-green mt-4 w-full"
        onClick={() => {
          window.dispatchEvent(new CustomEvent("uk-pick-tree", { detail: tree.id }));
          document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Book this tree
      </button>
    </li>
  );
}
