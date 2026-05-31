import { createMDX } from 'fumadocs-mdx/next';
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

const withMDX = createMDX({
  configPath: "./source.config.ts"
});

export default withMDX(config);