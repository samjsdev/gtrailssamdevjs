import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  // Ensure data/*/source.json is bundled for serverless reads on Vercel.
  outputFileTracingIncludes: {
    '/*': ['./data/**/*'],
  },
};

export default nextConfig;
