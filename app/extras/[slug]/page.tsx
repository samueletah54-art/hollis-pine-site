import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import { all, bySlug, money, priceFrom } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };
const extras = all.filter((p) => p.category === "addon");

export const generateStaticParams = () => extras.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  const from = priceFrom(p);
  return {
    title: p.name,
    description: `${p.tagline} ${from !== null ? `From ${money(from)}.` : ""}`.trim(),
    alternates: { canonical: `/extras/${p.slug}` },
    openGraph: { title: p.name, description: p.tagline, url: `/extras/${p.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p || p.category !== "addon") notFound();
  return <ProductPage p={p} />;
}
