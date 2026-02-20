import { NextRequest, NextResponse } from 'next/server';

// 캐시 절대 하지 마! (이게 핵심 해결책 1)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get('handle');

  // 여기에 너의 긴 API 키를 직접 넣어!
  const API_KEY = "AIzaSyB8iIoFCIVBmjQUk00anRYmAu-J1A2hG5c"; 

  console.log(`🚀 [시작] 검색어: ${handle}`); // 터미널 로그 1

  if (!handle) return NextResponse.json({ error: '검색어 없음' }, { status: 400 });

  try {
    // 검색어 처리
    const query = handle.includes('@') ? handle : `@${handle}`;
    
    console.log(`📡 [요청] 유튜브로 검색 보냄: ${query}`); // 터미널 로그 2

    // 1. 채널 검색 (cache: 'no-store' 추가 -> 핵심 해결책 2)
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&key=${API_KEY}`,
      { cache: 'no-store' } 
    );
    const searchData = await searchRes.json();

    // 🔍 구글이 뭐라고 했는지 터미널에 다 보여줘!
    console.log(`📨 [응답] 검색 결과 개수: ${searchData.items?.length}`);
    if (searchData.error) {
        console.error("❌ [유튜브 에러 발생]:", JSON.stringify(searchData.error, null, 2));
        return NextResponse.json({ error: searchData.error.message }, { status: 400 });
    }

    if (!searchData.items?.length) {
      console.log("⚠️ 검색 결과가 0개입니다.");
      return NextResponse.json({ error: '검색 결과가 없어요.' }, { status: 404 });
    }

    const channelId = searchData.items[0].id.channelId;
    console.log(`✅ [성공] 채널 ID 찾음: ${channelId}`);

    // 2. 통계 가져오기
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,brandingSettings&id=${channelId}&key=${API_KEY}`,
      { cache: 'no-store' }
    );
    const statsData = await statsRes.json();
    const info = statsData.items[0];

    // 계산 로직
    const subs = Number(info.statistics.subscriberCount);
    const views = Number(info.statistics.viewCount);
    const videos = Number(info.statistics.videoCount);
    const avgViews = Math.floor(views / videos) || 0;
    const estIncome = Math.floor(avgViews * 2 * 4);
    
    let grade = 'C';
    if (subs > 1000000) grade = 'S';
    else if (subs > 100000) grade = 'A';
    else if (subs > 10000) grade = 'B';

    return NextResponse.json({
      title: info.snippet.title,
      img: info.snippet.thumbnails.high.url,
      subs, views, videos, avgViews, estIncome, grade
    });

  } catch (error) {
    console.error("❌ [서버 내부 에러]:", error);
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  }
}
