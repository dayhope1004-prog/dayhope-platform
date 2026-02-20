/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 이게 핵심! 정적 사이트로 만들어줘!
  images: {
    unoptimized: true, // 이미지 최적화 끄기 (Cloudflare 무료 플랜 필수)
  },
};

export default nextConfig;
