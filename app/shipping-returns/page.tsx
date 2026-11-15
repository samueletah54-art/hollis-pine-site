import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description: "How and when Hollis & Pine ships live and artificial trees, what it costs, and what we do if a tree arrives damaged. U.S. only (48 contiguous states).",
  alternates: { canonical: "/shipping-returns" },
};

export default function Shipping() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-14 md:pt-20">
      <header className="grid md:grid-cols-12 gap-6 border-b border-ink pb-10">
        <p className="label text-berry md:col-span-3">Shipping &amp; returns</p>
        <h1 className="serif text-5xl md:text-7xl leading-[.95] md:col-span-9">Cut Monday, on your porch by Thursday.</h1>
      </header>
      <div className="grid md:grid-cols-12 gap-x-12 mt-10">
        <div className="md:col-span-7 md:col-start-4 prose-care">
          <h2 className="!mt-0">Where we ship</h2>
          <p>We ship to the 48 contiguous United States. We can't ship live trees to Alaska, Hawaii, U.S. territories, or outside the U.S. A few states restrict the import of live evergreens. We'll tell you at checkout if yours does.</p>

          <h2>Live trees and wreaths</h2>
          <ul>
            <li><b>Order by Dec 12</b> for delivery before Christmas.</li>
            <li>Live items ship <b>Monday through Wednesday</b> only, so they never sit in a depot over a weekend.</li>
            <li>Orders placed Thursday through Sunday ship the following Monday.</li>
            <li>Most addresses are 1–3 days from the farm. The product page estimates your dates from your ZIP.</li>
            <li>Shipping is $24 per tree under 7 ft, $34 per tree 7 ft and taller. Wreaths and garland ship with the tree at no extra charge.</li>
          </ul>

          <h2>Artificial trees and extras</h2>
          <ul>
            <li>Ships Monday through Friday by ground, 2–5 business days.</li>
            <li>Artificial trees ship free over $250, otherwise $19 per tree.</li>
            <li>Stands, skirts and ornaments alone: $9 flat. Free with any tree.</li>
          </ul>

          <h2>Commercial orders</h2>
          <p>Delivered on our schedule, by freight or our own truck, with an install date we agree on. Pricing comes with your <Link href="/business#quote">quote</Link>.</p>

          <h2>Sales tax</h2>
          <p>We collect sales tax in states where we're required to. It's calculated at checkout based on your delivery address. Tax-exempt buyers (schools, municipalities, churches) can email us a certificate before ordering.</p>

          <h2>If your tree arrives damaged</h2>
          <p><b>Live trees:</b> if it arrives broken, badly dried, or crushed, email <a href="mailto:hello@hollisandpine.example">hello@hollisandpine.example</a> with photos of the tree and the box <b>within 48 hours of delivery</b>. We'll ship a replacement while one is available, or refund you in full. You don't need to send the damaged tree back.</p>
          <p>Needle drop is not damage. A fir sheds inner needles the first few days. See the <Link href="/care">care guide</Link>.</p>
          <p><b>Artificial trees and extras:</b> unused, in the original box, within 30 days. We'll email a prepaid label. Refunds go to the original card in 5–7 business days. Opened artificial trees can be returned if they're defective.</p>
          <p><b>Live trees can't be returned for change of mind.</b> They're cut for you.</p>

          <h2>Questions</h2>
          <p>Call (555) 010-0142, Monday through Saturday, 8 to 5 Eastern. Or <Link href="/contact">write to us</Link>.</p>
        </div>
      </div>
    </div>
  );
}
