import type { Metadata } from "next";
import DocPage from "@/components/DocPage";
import { BIZ } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What personal information Hollis & Pine collects when you order, how we use it, and who we share it with.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <DocPage title="Your information, plainly." intro="We collect what we need to ship your order and answer your questions. We do not sell it.">

      <h2>What we collect</h2>
      <ul>
        <li><b>Your order.</b> Name, email, delivery address, phone number if you give one, and what you bought.</li>
        <li><b>Your messages.</b> Anything you send through the contact, quote or newsletter forms.</li>
        <li><b>Your cart.</b> Saved in your own browser so it is still there when you come back. It does not leave your device until you check out.</li>
      </ul>
      <p>We do not collect your card number. Payment is taken on Stripe's page.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To pack, ship and deliver your order, and to email you a receipt and tracking.</li>
        <li>To answer your questions and handle returns.</li>
        <li>To send the newsletter, only if you signed up. Every email has an unsubscribe link.</li>
      </ul>

      <h2>Who we share it with</h2>
      <ul>
        <li>Stripe, to take payment.</li>
        <li>The carrier, to deliver the box. They need your name, address and phone number.</li>
        <li>Our email provider, to send receipts and the newsletter.</li>
      </ul>
      <p>We do not sell your information or share it for advertising.</p>

      <h2>Cookies</h2>
      <p>This site uses your browser's local storage for your cart. It does not use advertising cookies.</p>

      <h2>Your choices</h2>
      <p>You can ask us to show you, correct or delete what we hold about you. Email <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>. We keep order records for as long as the law requires for tax.</p>

      <h2>Contact</h2>
      <p>{BIZ.name}, {BIZ.address.join(", ")}. <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>.</p>
      <p className="text-sm text-muted">Last updated: when the client approves this text.</p>
    </DocPage>
  );
}
