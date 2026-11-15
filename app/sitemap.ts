import type { MetadataRoute } from "next";
import { all, urlFor } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/business", "/care", "/about", "/shipping-returns", "/contact", "/faq"];
  return [
    ...pages.map((p) => ({ url: SITE.url + p, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...all.map((p) => ({ url: SITE.url + urlFor(p), changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
