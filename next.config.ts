import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["lucide-react"],
  experimental: {
    ppr: true,
    reactCompiler: true,
  },
};

export default nextConfig;
