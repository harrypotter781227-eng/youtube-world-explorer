import { NextRequest, NextResponse } from 'next/server';
import { chatAboutVideo, isGeminiConfigured } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoTitle, countryName, channelTitle, userQuestion, previousInteractionId } = body;

    if (!videoTitle || !userQuestion) {
      return NextResponse.json({ error: 'Missing videoTitle or userQuestion' }, { status: 400 });
    }

    const result = await chatAboutVideo({
      videoTitle,
      countryName: countryName || 'the country',
      channelTitle: channelTitle || 'the creator',
      userQuestion,
      previousInteractionId,
    });

    return NextResponse.json({
      ...result,
      isConfigured: isGeminiConfigured(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
