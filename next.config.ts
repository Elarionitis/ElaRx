import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.scdn.co" }],
  },
  async redirects() {
    // The writing section used to live at /blog. Keep those URLs working.
    return [
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/:slug", destination: "/writing/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
