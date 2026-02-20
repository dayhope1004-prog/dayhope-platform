import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 이게 있어야 배포가 돼! (중요)
  images: {
    unoptimized: true, // 👈 Cloudflare 무료 버전 필수 설정
  },
};

export default nextConfig;
