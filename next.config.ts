import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    cpus: 2,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 10,
  },
};

export default nextConfig;
