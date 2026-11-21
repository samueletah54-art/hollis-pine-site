import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/DocPage";
import { BIZ } from "@/data/business";

export const metadata: Metadata = {
  title: "Returns and guarantee",
  description: "What we do if a live tree arrives damaged, and how to return an artificial tree or an extra within 30 days.",
  alternates: { canonical: "/returns" },
};

export default function Returns() {
  return (
    <DocPage title="If something isn't right, tell us." intro="Live trees are cut for you and cannot be returned for change of mind. If one arrives damaged, we replace it or refund it. Artificial trees and extras can be returned within 30 days.">
      <h2 className="!mt-0">A live tree arrives damaged</h2>
      <ol>
        <li>Photograph the tree and the box within 48 hours of delivery.</li>
        <li>Email <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a> with your order number and the photos.</li>
        <li>We replace it while we have trees, or refund you in full. You do not need to send the tree back.</li>
      </ol>
      <p>Needle drop is not damage. A fir sheds its inner needles in the first few days. See the <Link href="/care">care guide</Link>.</p>

      <h2>Artificial trees and extras</h2>
      <ul>
        <li>Return within 30 days of delivery, unused and in the original packaging.</li>
        <li>Email us for a prepaid label. We will refund the original card within 5 to 7 working days of receiving the parcel.</li>
        <li>A defective tree or bulb set can be returned at any time within the first season. Send photos.</li>
      </ul>

      <h2>Wreaths and garland</h2>
      <p>These are fresh and cannot be returned. If they arrive damaged, the same 48 hour rule as live trees applies.</p>

      <h2>Commercial orders</h2>
      <p>Terms are set in your quote. A cancelled cut date may forfeit the deposit.</p>

      <h2>Refunds</h2>
      <p>Refunds go back to the card used for the order. Shipping is refunded when the item arrived damaged or was wrong. For change-of-mind returns of artificial trees, the return label is paid by us for orders over $250, otherwise it is deducted from the refund.</p>

      <h2>Questions</h2>
      <p>Call {BIZ.phone}, {BIZ.hours[0][1].toLowerCase()}. Or <Link href="/contact">write to us</Link>.</p>
    </DocPage>
  );
}
