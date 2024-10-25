import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "t3.ftcdn.net/jpg/04/47/95/44/360_F_447954458_KRb8tDCav1JTFjZchILTXCyKYGcDbsKg.jpg",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
