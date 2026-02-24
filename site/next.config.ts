import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
