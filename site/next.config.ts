import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Limit concurrent static page generation to avoid overwhelming Strapi Cloud
    staticGenerationMaxConcurrency: 1,
    'workerThreads': false
  },
  images: {
    remotePatterns: [
      {
        // Local Strapi dev server
        // TODO: Add production hostname here before deploying
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.crossoverglobal.org",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
