import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/DocPage";
import { BIZ } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms of sale",
  description: "The terms that apply when you buy trees, wreaths and other products from Hollis & Pine Tree Co.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <DocPage title="Terms of sale." intro="The short version of how buying from us works.">
      <p className="text-sm text-muted">Draft text. Have it reviewed before launch. See CLIENT-TO-CONFIRM.md.</p>

      <h2>Orders and prices</h2>
      <p>Prices are in U.S. dollars, per item, and do not include shipping or sales tax. Both are added at checkout. We may cancel an order if a price is wrong or a tree is no longer available, and we will refund you in full.</p>

      <h2>Live trees are natural products</h2>
      <p>Trees vary in shape, colour and fullness. Height is approximate, and a tree may be an inch or two either side of the size you chose. Photos show a typical tree.</p>

      <h2>Delivery</h2>
      <p>Dates are estimates. See <Link href="/delivery">Delivery</Link>. We cannot control carrier delays, but if a delay spoils a live tree, tell us and we will make it right.</p>

      <h2>Returns</h2>
      <p>See <Link href="/returns">Returns and refunds</Link>.</p>

      <h2>Care</h2>
      <p>A live tree is a fire risk if it dries out. Follow the <Link href="/care">care guide</Link>, keep the stand full, and keep the tree away from heat and open flame. We are not responsible for damage caused by a dry tree or by lights that are not rated for use on a tree.</p>

      <h2>Commercial orders</h2>
      <p>Commercial orders are governed by the written quote, which takes priority over these terms.</p>

      <h2>Law</h2>
      <p>These terms are governed by the laws of the state where {BIZ.name} is based.</p>

      <h2>Contact</h2>
      <p><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>, {BIZ.phone}</p>
    </DocPage>
  );
}
