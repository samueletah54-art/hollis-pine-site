import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/DocPage";
import { BIZ } from "@/data/business";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "How we build this site to be usable by everyone, and how to tell us when something is hard to use.",
  alternates: { canonical: "/accessibility" },
};

export default function Accessibility() {
  return (
    <DocPage title="Accessibility" intro="Everyone should be able to buy a Christmas tree. This is what we do about it, and what we haven't finished.">
      <h2>What we do</h2>
      <ul>
        <li>Every page can be used with a keyboard alone, and the focus outline is always visible.</li>
        <li>Text and buttons meet WCAG 2.1 AA colour contrast. Body text is never smaller than 14 pixels.</li>
        <li>Photos have descriptions, and forms have visible labels and plain error messages.</li>
        <li>Motion is gentle, and it stops completely if your device is set to reduce motion.</li>
        <li>The site works at phone width and when text is enlarged.</li>
      </ul>
      <h2>What we have not finished</h2>
      <ul>
        <li>We test with automated tools and by keyboard. We have not yet had the site reviewed by people who use screen readers every day.</li>
        <li>Some product photos are still to come and show a plain block meanwhile.</li>
      </ul>
      <h2>Tell us if something is hard</h2>
      <p>Email <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a> or call <a href={`tel:${BIZ.phoneHref}`}>{BIZ.phone}</a>. We'll fix it, or take your order by phone. You can also use the <Link href="/contact">contact form</Link>.</p>
    </DocPage>
  );
}
