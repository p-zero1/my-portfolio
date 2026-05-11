import type { NextConfig } from "next";

const isProd = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/my-portfolio' : '',
  images: { unoptimized: true },
};

export default nextConfig;
