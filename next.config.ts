import type { NextConfig } from "next";
const base = process.env.VUEPRESS_BASE || '';

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
    assetPrefix: base,
    basePath: base,
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
