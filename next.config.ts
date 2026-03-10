import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverExternalPackages: ["stripe"],
  },
  output: "standalone",
};

export default nextConfig;