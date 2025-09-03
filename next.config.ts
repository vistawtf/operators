import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add base path if your repo isn't the main GitHub Pages site
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name',
};

export default nextConfig;
