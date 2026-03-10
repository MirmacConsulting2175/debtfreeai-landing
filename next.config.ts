import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    serverExternalPackages: ["stripe"],
  },

  output: "standalone",
};

export default nextConfig;