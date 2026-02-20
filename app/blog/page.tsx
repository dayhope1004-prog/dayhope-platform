export default function BlogPost({ params }: { params: { id: string } }) {
  // 실제로는 여기서 DB나 파일에서 글을 가져와야 하지만, 지금은 임시로 보여줌
  return (
    <div className="max-w-3xl mx-auto p-8 font-sans">
      <span className="text-indigo-600 font-bold">YouTube Tips</span>
      <h1 className="text-4xl font-bold mt-2 mb-6 text-gray-900">
        조회수 떡상하는 썸네일 공식 3가지 (샘플)
      </h1>
      <div className="flex items-center gap-2 text-gray-500 mb-8 pb-8 border-b">
        <span>DayHope Editor</span> • <span>2024. 05. 20</span>
      </div>

      {/* 본문 내용 (구글이 좋아하는 긴 글) */}
      <article className="prose lg:prose-xl text-gray-700 leading-loose">
        <p>
          유튜브에서 가장 중요한 것은 무엇일까요? 영상의 퀄리티? 편집 기술? 물론
          중요합니다. 하지만 아무리 영상이 좋아도 클릭하지 않으면 소용이
          없습니다. 그래서 썸네일이 가장 중요합니다. 오늘은 조회수를 200% 높이는
          썸네일의 비밀을 공개합니다.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">
          1. 사람의 얼굴을 넣어라
        </h3>
        <p>
          인간은 본능적으로 다른 사람의 눈을 봅니다. 썸네일에 감정이 드러난
          얼굴이 있으면 클릭률이 높아집니다. 놀란 표정, 화난 표정, 웃는 표정 등
          감정을 극대화하세요.
        </p>
        <p className="mt-4">
          (여기에 더 많은 텍스트 내용을 채워 넣어야 구글이 좋아합니다. 최소
          1000자 이상 추천!)
        </p>
      </article>
    </div>
  );
}
