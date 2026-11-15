import type { Metadata } from "next";
import CheckoutView from "@/components/CheckoutView";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function Checkout() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <h1 className="serif text-5xl md:text-7xl leading-[.95] border-b border-ink pb-8">Checkout</h1>
      <CheckoutView />
    </div>
  );
}
