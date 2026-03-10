import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    serverExternalPackages: ["stripe"],
  },
};

export default nextConfig;