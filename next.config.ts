import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      {
        source: "/info/pelatihan",
        destination: "/alur-sertifikasi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
