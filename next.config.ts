// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mobixsystemsinc.com", pathname: "**" },
      { protocol: "https", hostname: "admin.dairyboard.mn", pathname: "**" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
      {
        source: "/media/:path*",
        destination: "http://localhost:8000/media/:path*",
      }, // <-- add this
      // if CKEditor uses a different path like /ckeditor5/, proxy that too:
      {
        source: "/ckeditor5/:path*",
        destination: "http://localhost:8000/ckeditor5/:path*",
      },
      {
        source: "/static/:path*",
        destination: "http://localhost:8000/static/:path*",
      }, // optional

      {
        source: "/api/:path*",
        destination: "https://admin.dairyboard.mn/api/:path*",
      },
      {
        source: "/media/:path*",
        destination: "https://admin.dairyboard.mn/media/:path*",
      }, // <-- add this
      // if CKEditor uses a different path like /ckeditor5/, proxy that too:
      {
        source: "/ckeditor5/:path*",
        destination: "https://admin.dairyboard.mn/ckeditor5/:path*",
      },
      {
        source: "/static/:path*",
        destination: "https://admin.dairyboard.mn/static/:path*",
      }, // optional
    ];
  },
};

export default nextConfig;
