import type { NextConfig } from "next";

const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [420, 640, 750, 828, 1080, 1280, 1600, 1920], qualities: [55, 60, 75] },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/shipping-returns", destination: "/delivery", permanent: true },
      { source: "/shipping", destination: "/delivery", permanent: true },
      { source: "/trees", destination: "/shop", permanent: false },
      { source: "/extras", destination: "/shop?type=addon", permanent: false },
    ];
  },
};

export default config;
