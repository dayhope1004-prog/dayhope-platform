"use client";
import { useState } from "react";

export default function Store() {
  // 팝업 상태 관리 (어떤 상품을 눌렀는지)
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: 1,
      title: "유튜브 알고리즘 공략집",
      price: 9900,
      desc: "초보 유튜버를 위한 필수 가이드북. 떡상하는 영상의 3가지 비밀을 담았습니다.",
      tag: "BEST",
      detail:
        "이 책은 지난 3년간 100개의 채널을 분석하며 얻은 데이터를 기반으로 작성되었습니다. 썸네일 공식부터 제목 짓기까지, 이것만 알면 당신도 떡상 가능!",
    },
    {
      id: 2,
      title: "AI 영상 제작 프롬프트",
      price: 4900,
      desc: "GPT로 대본 쓰고 영상 만드는 법. 시간을 1/10로 줄여드립니다.",
      tag: "NEW",
      detail:
        "복사+붙여넣기만 하면 대본이 뚝딱! 영상 편집 시간을 획기적으로 줄여주는 마법 같은 프롬프트 모음집입니다.",
    },
    {
      id: 3,
      title: "썸네일 디자인 템플릿",
      price: 2900,
      desc: "클릭률 200% 보장하는 디자인. PPT만 있으면 수정 가능!",
      tag: "HOT",
      detail:
        "디자이너 없이도 고퀄리티 썸네일을? 클릭을 부르는 색상 조합과 폰트 배치가 완료된 템플릿 10종을 드립니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans relative">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          💎 DayHope 스토어
        </h1>

        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded 
                    ${
                      product.tag === "BEST"
                        ? "bg-blue-100 text-blue-600"
                        : product.tag === "NEW"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.tag}
                  </span>
                  <h3 className="font-bold text-lg text-gray-800 mt-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{product.desc}</p>
                </div>
                <p className="font-bold text-indigo-600">
                  ₩ {product.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200"
              >
                구매하기
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>문의: help@dayhope.day</p>
        </div>
      </div>

      {/* 👇 여기가 새로 추가된 [상세 정보 팝업] 부분이야! 👇 */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl transform transition-all scale-100">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-1 rounded">
                {selectedProduct.tag} 상품
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProduct.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {selectedProduct.detail}
            </p>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">결제 금액</span>
                <span className="text-2xl font-black text-indigo-600">
                  ₩ {selectedProduct.price.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              onClick={() => alert("아직 결제 기능은 연동 중이에요! 😅")}
            >
              💳 카드 결제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
