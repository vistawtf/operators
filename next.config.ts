import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Add base path if your repo isn't the main GitHub Pages site
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name',
};

export default nextConfig;
