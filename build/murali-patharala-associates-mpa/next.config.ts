import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
