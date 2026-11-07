import { NextRequest, NextResponse } from 'next/server';
import { apiCache } from '@/lib/cache';
import { getCountryByCode } from '@/data/countries';
import { generateMockVideos } from '@/data/mockVideos';
import { parseIsoDuration } from '@/lib/youtube';
import { YouTubeVideo, VideosApiResponse } from '@/types/youtube';

interface RawYouTubeItem {
  id: string;
  snippet?: {
    title: string;
    description: string;
    channelTitle: string;
    channelId: string;
    publishedAt: string;
    categoryId: string;
    tags?: string[];
    thumbnails?: {
      maxres?: { url: string };
      standard?: { url: string };
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
  contentDetails?: {
    duration: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const countryCode = (searchParams.get('country') || 'US').toUpperCase();
  const categoryId = searchParams.get('categoryId') || '0';
  const forceMock = searchParams.get('forceMock') === 'true';

  const countryInfo = getCountryByCode(countryCode);
  const cacheKey = `trending_${countryCode}_${categoryId}`;

  // Check cache first
  const cachedData = apiCache.get<VideosApiResponse>(cacheKey);
  if (cachedData && !forceMock) {
    return NextResponse.json({
      ...cachedData,
      source: 'cache',
    });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  // If no API key or forced mock, return realistic mock data
  if (!apiKey || forceMock) {
    const mockVideos = generateMockVideos(countryCode, categoryId);
    const responsePayload: VideosApiResponse = {
      videos: mockVideos,
      country: countryInfo,
      isMock: true,
      source: 'mock',
      error: !apiKey ? 'No YOUTUBE_API_KEY in environment variables. Running in Mock Data mode.' : undefined,
    };
    apiCache.set(cacheKey, responsePayload, 30 * 60 * 1000); // cache mock for 30 min
    return NextResponse.json(responsePayload);
  }

  // Attempt to call YouTube Data API v3
  try {
    let apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${countryCode}&maxResults=30&key=${apiKey}`;
    if (categoryId !== '0') {
      apiUrl += `&videoCategoryId=${categoryId}`;
    }

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Next.js fetch caching
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `YouTube API responded with status ${res.status}`;
      console.warn(`[YouTube API Error]: ${errorMessage}. Falling back to mock data.`);

      const fallbackVideos = generateMockVideos(countryCode, categoryId);
      const responsePayload: VideosApiResponse = {
        videos: fallbackVideos,
        country: countryInfo,
        isMock: true,
        source: 'mock',
        error: `YouTube API Error (${res.status}): ${errorMessage}. Displaying simulated discovery content.`,
      };
      return NextResponse.json(responsePayload);
    }

    const data = await res.json();
    const rawItems: RawYouTubeItem[] = data.items || [];

    const videos: YouTubeVideo[] = rawItems.map((item) => {
      const durationInfo = parseIsoDuration(item.contentDetails?.duration || '');
      const thumb =
        item.snippet?.thumbnails?.maxres?.url ||
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url ||
        `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;

      return {
        id: item.id,
        title: item.snippet?.title || 'Untitled Video',
        description: item.snippet?.description || '',
        thumbnail: thumb,
        channelTitle: item.snippet?.channelTitle || 'Unknown Channel',
        channelId: item.snippet?.channelId,
        publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
        viewCount: parseInt(item.statistics?.viewCount || '0', 10),
        likeCount: item.statistics?.likeCount ? parseInt(item.statistics.likeCount, 10) : undefined,
        commentCount: item.statistics?.commentCount ? parseInt(item.statistics.commentCount, 10) : undefined,
        duration: durationInfo.formatted,
        rawDuration: item.contentDetails?.duration || '',
        isShort: durationInfo.isShort,
        categoryId: item.snippet?.categoryId || categoryId,
        countryCode: countryCode,
        tags: item.snippet?.tags || [],
      };
    });

    const responsePayload: VideosApiResponse = {
      videos,
      country: countryInfo,
      isMock: false,
      source: 'api',
    };

    apiCache.set(cacheKey, responsePayload, 60 * 60 * 1000); // 1 hour TTL
    return NextResponse.json(responsePayload);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown network error';
    console.error('[YouTube Fetch Exception]:', errorMsg);

    const fallbackVideos = generateMockVideos(countryCode, categoryId);
    return NextResponse.json({
      videos: fallbackVideos,
      country: countryInfo,
      isMock: true,
      source: 'mock',
      error: `Network error connecting to YouTube API: ${errorMsg}. Displaying simulated discovery content.`,
    });
  }
}

