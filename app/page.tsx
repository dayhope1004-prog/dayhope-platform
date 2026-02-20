"use client";
import { useState } from "react";

export default function Home() {
  const [handle, setHandle] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false); // 유튜브 검색 로딩
  const [aiLoading, setAiLoading] = useState(false); // AI 로딩
  const [aiAdvice, setAiAdvice] = useState(""); // AI 조언
  const [errorMsg, setErrorMsg] = useState("");

  // ⚠️ 여기에 유튜브 API 키 넣기!
  const YOUTUBE_API_KEY = "AIzaSyB9WfAjtHxwoBCyWMa9kr6j-XpmeDlJaq0";

  // 1. 유튜브 검색
  const goSearch = async () => {
    if (!handle) return;
    setLoading(true);
    setData(null);
    setAiAdvice("");
    setErrorMsg("");

    try {
      // (1) 채널 검색
      const query = handle.includes("@") ? handle : `@${handle}`;
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&key=${YOUTUBE_API_KEY}`,
      );
      const searchData = await searchRes.json();

      if (!searchData.items?.length)
        throw new Error("채널을 찾을 수 없어요. (핸들을 확인해주세요)");

      const channelId = searchData.items[0].id.channelId;

      // (2) 통계 가져오기
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`,
      );
      const statsData = await statsRes.json();
      const info = statsData.items[0];

      // (3) 데이터 가공
      const subs = Number(info.statistics.subscriberCount);
      const views = Number(info.statistics.viewCount);
      const videos = Number(info.statistics.videoCount);
      const avgViews = Math.floor(views / videos) || 0;
      const estIncome = Math.floor(avgViews * 2 * 4); // 대략적인 수익

      let grade = "🌱 새싹";
      if (subs > 1000000) grade = "👑 레전드";
      else if (subs > 500000) grade = "💎 다이아";
      else if (subs > 100000) grade = "🥇 골드";
      else if (subs > 10000) grade = "🥈 실버";

      setData({
        title: info.snippet.title,
        img: info.snippet.thumbnails.high.url,
        subs,
        views,
        videos,
        avgViews,
        estIncome,
        grade,
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "오류가 났어요.");
    } finally {
      setLoading(false);
    }
  };

  // 2. AI 분석 요청
  const askAI = async () => {
    if (!data) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          channelName: data.title,
          subs: data.subs,
          views: data.views,
          videos: data.videos,
        }),
      });
      const result = await res.json();

      if (result.error) throw new Error(result.error);
      setAiAdvice(result.advice);
    } catch (e) {
      alert("AI 연결 실패! 잠시 후 다시 시도해주세요.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          DayHope AI 분석기 🚀
        </h1>

        {/* 검색창 */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="@dayhope"
            className="flex-1 p-3 border rounded-lg outline-none focus:border-indigo-500"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goSearch()}
          />
          <button
            onClick={goSearch}
            className="bg-indigo-600 text-white px-4 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            {loading ? "..." : "검색"}
          </button>
        </div>

        {errorMsg && (
          <div className="text-red-500 text-center mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        {data && (
          <div className="space-y-6 animate-fade-in-up">
            {/* 채널 정보 */}
            <div className="flex items-center gap-4 border-b pb-4">
              <img
                src={data.img}
                alt="img"
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h2 className="text-lg font-bold">{data.title}</h2>
                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded font-bold">
                  {data.grade}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  구독자 {data.subs.toLocaleString()}명
                </p>
              </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xs text-blue-500 font-bold">월 수익 예측</p>
                <p className="font-black text-blue-700">
                  ₩ {data.estIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 font-bold">평균 조회수</p>
                <p className="font-black text-gray-700">
                  {data.avgViews.toLocaleString()}
                </p>
              </div>
            </div>

            {/* AI 분석 */}
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-indigo-800 text-sm">
                  🤖 AI 컨설팅
                </h3>
                {!aiAdvice && (
                  <button
                    onClick={askAI}
                    disabled={aiLoading}
                    className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700"
                  >
                    {aiLoading ? "분석 중..." : "분석 받기 ✨"}
                  </button>
                )}
              </div>

              {aiAdvice ? (
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {aiAdvice}
                </p>
              ) : (
                <p className="text-xs text-indigo-400">
                  버튼을 누르면 AI가 조언해드려요!
                </p>
              )}
            </div>
             {/* 👇👇👇 여기! AI 박스 끝나고, 닫는 </div> 바로 밑에 추가해! 👇👇👇 */}
            
            {/* 🛒 수익화 배너 (여기에 붙여넣기!) */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white shadow-lg transform hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <span className="bg-yellow-400 text-purple-900 text-xs font-black px-2 py-0.5 rounded">HOT 🔥</span>
                  <h3 className="font-bold text-lg mt-1">내 채널 떡상 비법서</h3>
                  <p className="text-xs text-purple-100 opacity-90">조회수 10배 늘리는 시크릿 가이드</p>
                </div>
                <div className="text-right">
                  <p className="text-xs line-through opacity-70">₩ 15,000</p>
                  <p className="text-xl font-black text-yellow-300">₩ 9,900</p>
                </div>
              </div>
              {/* 버튼 누르면 스토어로 이동하게 링크 걸기 */}
              <a href="/store" className="block w-full mt-3 bg-white text-center text-purple-700 font-bold py-2 rounded-lg text-sm hover:bg-gray-100 transition">
                👉 지금 바로 다운로드
              </a>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
       