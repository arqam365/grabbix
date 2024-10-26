import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
    images: {
        domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
    },
};

export default nextConfig;
