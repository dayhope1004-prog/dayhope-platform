'use client';
import { useState } from 'react';

export default function PdfTool() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        {/* 헤더 */}
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
          FREE TOOL
        </span>
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          초고속 <span className="text-indigo-600">PDF 변환기</span> ⚡
        </h1>
        <p className="text-gray-500 mb-12 text-lg">
          복잡한 설치 없이, 웹페이지나 이미지를 1초 만에 PDF로 변환하세요.
        </p>

        {/* 파일 업로드 구역 (UI만 구현) */}
        <div 
          className={`
            bg-white border-2 border-dashed rounded-3xl p-16 transition-all duration-300 cursor-pointer
            ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-gray-300 hover:border-indigo-400'}
          `}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => alert("지금은 데모 버전입니다! 곧 기능이 추가돼요. 🚀")}
        >
          <div className="flex flex-col items-center gap-6">
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-colors
              ${isDragging ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-100 text-gray-400'}
            `}>
              📂
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 mb-2">
                파일을 여기에 드래그하거나 클릭하세요
              </p>
              <p className="text-sm text-gray-400">
                지원 형식: JPG, PNG, WebP (최대 10MB)
              </p>
            </div>
            <button className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">
              파일 선택하기
            </button>
          </div>
        </div>

        {/* 기능 설명 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2">1초 변환</h3>
            <p className="text-sm text-gray-500">기다릴 필요 없습니다. 업로드 즉시 변환이 시작됩니다.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-bold text-lg mb-2">100% 보안</h3>
            <p className="text-sm text-gray-500">파일은 변환 후 서버에서 즉시 영구 삭제됩니다.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-3">💎</div>
            <h3 className="font-bold text-lg mb-2">완전 무료</h3>
            <p className="text-sm text-gray-500">회원가입 없이 하루 10회까지 무료로 사용하세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
