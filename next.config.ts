import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
