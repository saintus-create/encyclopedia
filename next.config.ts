import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "nextjs.org",
      },
    ],
  },
};

export default config;
