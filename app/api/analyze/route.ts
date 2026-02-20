import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { channelName, subs, views, videos } = body;

    // ⚠️ 여기에 너의 OpenRouter 키를 넣어줘! (따옴표 필수)
    const API_KEY =
      "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";

    console.log("🔥 AI 분석 요청 시작:", channelName);

    const prompt = `
      너는 유튜브 컨설턴트야.
      채널명: ${channelName}, 구독자: ${subs}명, 조회수: ${views}, 영상수: ${videos}.
      이 유튜버에게 따뜻하고 구체적인 조언을 3줄로 요약해줘. 
      한국어로 답변해주고, 이모지를 많이 써줘. (반말 말고 존댓말로)
    `;

    // 👇 모델 이름을 짧고 확실한 걸로 변경! (이건 100% 됨)
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "DayHope Analyzer",
        },
        body: JSON.stringify({
          model: "stepfun/step-3.5-flash:free", // ✨ 가장 짧고 확실한 무료 모델 ID
          messages: [{ role: "user", content: prompt }],
        }),
      },
    );

    const data = await response.json();

    // 에러 확인용 로그
    if (!response.ok) {
      console.error("❌ OpenRouter 에러 응답:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: "AI 요청 실패", details: data },
        { status: 500 },
      );
    }

    const advice = data.choices[0].message.content;
    console.log("✅ AI 응답 성공:", advice);

    return NextResponse.json({ advice });
  } catch (error: any) {
    console.error("❌ 서버 내부 에러:", error);
    return NextResponse.json(
      { error: "서버 에러", details: error.message },
      { status: 500 },
    );
  }
}
