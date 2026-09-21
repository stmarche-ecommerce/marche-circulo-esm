import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d9hhrg4mnvzow.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;