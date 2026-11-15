import type { Metadata } from "next";
import CartView from "@/components/CartView";
import DemoBanner from "@/components/DemoBanner";

export const metadata: Metadata = { title: "Your cart", robots: { index: false } };

export default function Cart() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <h1 className="serif text-6xl pb-2">Your cart</h1>
      <DemoBanner />
      <CartView />
    </div>
  );
}
