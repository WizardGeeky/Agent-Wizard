import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config) => {
    config.ignoreWarnings = [{ module: /@iqai\/adk/ }];
    return config;
  },
};

export default nextConfig;
