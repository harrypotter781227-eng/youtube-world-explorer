import { NextRequest, NextResponse } from 'next/server';
import { getGeminiVideoInsights, isGeminiConfigured } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoId, title, description, channelTitle, countryCode, tags } = body;

    if (!videoId || !title || !countryCode) {
      return NextResponse.json(
        { error: 'Missing required video fields (videoId, title, countryCode)' },
        { status: 400 }
      );
    }

    const insights = await getGeminiVideoInsights({
      videoId,
      title,
      description: description || '',
      channelTitle: channelTitle || 'Creator',
      countryCode,
      tags: Array.isArray(tags) ? tags : [],
    });

    return NextResponse.json({
      insights,
      isConfigured: isGeminiConfigured(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
