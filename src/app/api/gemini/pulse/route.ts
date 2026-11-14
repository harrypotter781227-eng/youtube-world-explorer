import { NextRequest, NextResponse } from 'next/server';
import { getGeminiCountryPulse, isGeminiConfigured } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { countryCode, titles } = body;

    if (!countryCode) {
      return NextResponse.json({ error: 'Missing countryCode' }, { status: 400 });
    }

    const sampleTitles = Array.isArray(titles) ? titles : [];
    const pulse = await getGeminiCountryPulse(countryCode.toUpperCase(), sampleTitles);

    return NextResponse.json({
      pulse,
      isConfigured: isGeminiConfigured(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
