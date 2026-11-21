import type { Metadata } from "next";
import CheckoutView from "@/components/CheckoutView";
import DemoBanner from "@/components/DemoBanner";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function Checkout() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <h1 className="serif text-6xl pb-2">Checkout</h1>
      <DemoBanner />
      <CheckoutView />
    </div>
  );
}
