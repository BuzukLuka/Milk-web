import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mobixsystemsinc.com",
        port: "",
        pathname: "**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
