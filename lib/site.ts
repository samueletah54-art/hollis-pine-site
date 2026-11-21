import { BIZ } from "@/data/business";

// On Vercel the production URL is picked up automatically. Set NEXT_PUBLIC_SITE_URL once the real domain is connected.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "";

export const SITE = {
  name: BIZ.name,
  url: process.env.NEXT_PUBLIC_SITE_URL || vercel || "http://localhost:3000",
  phone: BIZ.phone,
  email: BIZ.email,
};
