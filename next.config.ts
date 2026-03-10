import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    serverComponentsExternalPackages: ["stripe"],
  },
};

export default nextConfig;
