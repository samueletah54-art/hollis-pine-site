import type { NextConfig } from "next";

const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920] },
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/shipping-returns", destination: "/delivery", permanent: true }];
  },
};

export default config;
