import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/PairingUp',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
