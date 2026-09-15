import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the dev overlay out of review screenshots.
  devIndicators: false,
};

export default nextConfig;
