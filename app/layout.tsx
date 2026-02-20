import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // 링크 이동 기능

const inter = Inter({ subsets: ["latin"] });

// 📝 검색엔진(SEO) 최적화 메타데이터 (구글이 좋아함)
export const metadata: Metadata = {
  title: "DayHope Platform - 유튜브 분석 & AI 도구",
  description:
    "유튜브 채널 무료 분석, 조회수 늘리는 법, AI 영상 제작 도구, 전자책 스토어. 크리에이터를 위한 모든 솔루션을 제공합니다.",
  keywords: ["유튜브 분석", "AI 도구", "크리에이터", "전자책", "DayHope"],
  openGraph: {
    title: "DayHope Platform",
    description: "내 채널의 잠재력을 깨우는 데이터 분석 & AI 솔루션",
    url: "https://dayhope.day",
    siteName: "DayHope",
    images: [
      {
        url: "/og-image.png", // 나중에 공유 이미지 넣으면 됨
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* 1. 상단 메뉴바 (GNB) */}
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* 로고 */}
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tighter hover:scale-105 transition-transform">
                  DayHope
                </span>
                <span className="text-[10px] font-bold text-white bg-indigo-500 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md shadow-indigo-200">
                  BETA
                </span>
              </Link>

              {/* 메뉴 리스트 (PC) */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-indigo-600 font-bold transition text-sm tracking-wide"
                >
                  Blog
                </Link>
                <Link
                  href="/insights"
                  className="text-gray-500 hover:text-indigo-600 font-bold transition text-sm tracking-wide"
                >
                  Insights
                </Link>
                <Link
                  href="/store"
                  className="text-gray-500 hover:text-indigo-600 font-bold transition text-sm tracking-wide"
                >
                  Store
                </Link>
                <div className="relative group cursor-pointer">
                  <span className="text-gray-500 hover:text-indigo-600 font-bold transition text-sm flex items-center gap-1">
                    AI Tools ▾
                  </span>
                  {/* 드롭다운 메뉴 */}
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                    <Link
                      href="/tools/pdf"
                      className="block px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 font-medium transition-colors"
                    >
                      📄 PDF 변환기
                    </Link>
                    <Link
                      href="/tools/video"
                      className="block px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 font-medium transition-colors border-t border-gray-50"
                    >
                      🎬 영상 분석
                    </Link>
                  </div>
                </div>
              </div>

              {/* 우측 버튼 */}
              <div className="hidden md:flex items-center gap-4">
                <button className="text-sm font-bold text-gray-400 hover:text-gray-800 transition">
                  로그인
                </button>
                <Link
                  href="/store"
                  className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 hover:scale-105 transition-all shadow-lg shadow-gray-200"
                >
                  시작하기
                </Link>
              </div>

              {/* 모바일 메뉴 버튼 (반응형) */}
              <div className="md:hidden">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 2. 본문 내용 (메뉴바 높이만큼 띄워줌 pt-20) */}
        <main className="pt-20 min-h-screen bg-gray-50 selection:bg-indigo-100 selection:text-indigo-900">
          {children}
        </main>

        {/* 3. 하단 푸터 (Footer) - 애드센스 필수! */}
        <footer className="bg-white border-t border-gray-100 py-16 mt-20 font-sans relative overflow-hidden">
          {/* 배경 오로라 효과 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30 blur-sm"></div>

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            {/* 브랜드 슬로건 */}
            <div className="mb-8">
              <span className="text-2xl font-black text-gray-300 hover:text-indigo-400 transition-colors cursor-default tracking-tighter">
                DayHope
              </span>
              <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide">
                WE BUILD THE FUTURE OF CREATORS
              </p>
            </div>

            {/* 메인 링크 */}
            <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mb-10 text-sm font-bold text-gray-500">
              <Link
                href="/store"
                className="hover:text-indigo-600 hover:-translate-y-0.5 transition-transform duration-300"
              >
                스토어
              </Link>
              <Link
                href="/blog"
                className="hover:text-indigo-600 hover:-translate-y-0.5 transition-transform duration-300"
              >
                블로그
              </Link>
              <Link
                href="/insights"
                className="hover:text-indigo-600 hover:-translate-y-0.5 transition-transform duration-300"
              >
                인사이트
              </Link>
              <Link
                href="/tools/pdf"
                className="hover:text-indigo-600 hover:-translate-y-0.5 transition-transform duration-300"
              >
                PDF 도구
              </Link>
            </div>

            {/* 법적 고지 및 정보 */}
            <div className="flex justify-center gap-6 mb-8 text-xs text-gray-400 font-medium">
              <Link
                href="/privacy"
                className="hover:text-gray-600 transition-colors"
              >
                개인정보처리방침
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/terms"
                className="hover:text-gray-600 transition-colors"
              >
                이용약관
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/support"
                className="hover:text-gray-600 transition-colors"
              >
                고객센터
              </Link>
            </div>

            {/* 카피라이트 (2026년 적용 완료!) */}
            <div className="border-t border-gray-100 pt-8">
              <p className="text-gray-400 text-[10px] leading-relaxed opacity-80">
                © 2026 DayHope Platform. All rights reserved.
                <br />
                서울특별시 강남구 테헤란로 123, DayHope Building 10F | CEO:
                DayHope
                <br />
                Contact: help@dayhope.day | Business License: 123-45-67890
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
