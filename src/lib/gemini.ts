import { GoogleGenAI } from '@google/genai';
import { apiCache } from '@/lib/cache';
import { VideoCulturalInsights, CountryPulseInsights } from '@/types/gemini';
import { getCountryByCode } from '@/data/countries';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-4-hydrogen';

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
}

/**
 * Fallback generator for Video Cultural Insights when Gemini API key is not yet set
 */
function generateFallbackVideoInsights(params: {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  countryCode: string;
  tags?: string[];
}): VideoCulturalInsights {
  const country = getCountryByCode(params.countryCode);
  const titleLower = params.title.toLowerCase();

  const isMusic = titleLower.includes('mv') || titleLower.includes('music') || titleLower.includes('song') || titleLower.includes('feat') || titleLower.includes('official');
  const isGaming = titleLower.includes('game') || titleLower.includes('play') || titleLower.includes('live') || titleLower.includes('minecraft') || titleLower.includes('gta');
  const isFood = titleLower.includes('eat') || titleLower.includes('cook') || titleLower.includes('food') || titleLower.includes('mukbang') || titleLower.includes('recipe');

  let culturalContext = `In ${country.name}, trending content on YouTube frequently reflects deep regional traditions mixed with vibrant youth digital subcultures.`;
  let whyTrending = `This upload has captured massive engagement across ${country.name} due to high social sharing and viral discussion on regional online communities.`;
  const slangList: string[] = [];

  if (params.countryCode === 'JP') {
    culturalContext = `Japanese digital culture thrives on refined craftsmanship, VTubers, anime collaborations, and immersive lifestyle documentation.`;
    whyTrending = `Trending heavily across Japanese Twitter (X) and NicoNico communities, driven by creator loyalty and high engagement during evening commuting hours.`;
    slangList.push('神回 (Kami-kai - Legendary god-tier episode)');
    slangList.push('バズる (Bazuru - To go viral across Japanese social media)');
  } else if (params.countryCode === 'KR') {
    culturalContext = `South Korea boasts one of the most hyper-connected media landscapes globally, where viral trends shift weekly through TikTok, Instagram Reels, and YouTube shorts.`;
    whyTrending = `Spiking across Korean portal search rankings and university communities, powered by active fandom participation and rapid comment chain reactions.`;
    slangList.push('대박 (Daebak - Amazing / mind-blowing achievement)');
    slangList.push('인정 (Injeong - Acknowledged / total agreement)');
  } else if (params.countryCode === 'BR') {
    culturalContext = `Brazilian internet culture is world-renowned for its warm humor, vibrant musical styles (funk & sertanejo), and passionate community commentary.`;
    whyTrending = `Rapidly spreading across Brazilian WhatsApp groups and Twitter memes, sparking spirited debates and reaction videos.`;
    slangList.push('Mito / Demais (Super cool / epic performance)');
    slangList.push('Zoeira (Good-natured Brazilian memeing & banter)');
  } else if (params.countryCode === 'FR') {
    culturalContext = `French trending feeds showcase a stylish blend of high-concept humor, urban French rap, cinematic vlogging, and intellectual cultural satire.`;
    whyTrending = `Gaining immense traction across French youth networks and Paris/Marseille creator collectives with strong comment sentiment.`;
    slangList.push('C’est lourd (That’s fire / impressive)');
    slangList.push('Le banger (A certified viral hit)');
  } else {
    slangList.push(`Regional Zeitgeist (Top trending hashtag across ${country.name})`);
    slangList.push(`Creator Buzz (High audience retention in ${country.region})`);
  }

  let genreSummary = `The video showcases creative storytelling crafted to entertain a wide audience across ${country.name}.`;
  if (isMusic) {
    genreSummary = `An energetic musical release pairing dynamic production with visually striking regional choreography and storytelling.`;
  } else if (isGaming) {
    genreSummary = `An entertaining gameplay session featuring high-stakes moments, humorous commentary, and community interaction.`;
  } else if (isFood) {
    genreSummary = `A culinary journey celebrating regional flavors, street food technique, and the communal joy of eating together.`;
  }

  return {
    videoId: params.videoId,
    countryCode: params.countryCode,
    countryName: country.name,
    originalLanguage: params.countryCode === 'US' || params.countryCode === 'GB' || params.countryCode === 'CA' || params.countryCode === 'AU' ? 'English' : `${country.name} Local Language`,
    translatedTitle: params.title,
    culturalContext,
    whyTrending,
    summary: genreSummary,
    localSlangOrNuance: slangList,
    targetAudience: `Viewers and enthusiasts in ${country.name} aged 16-35 interested in ${country.trendingTopics?.[0] || 'digital entertainment'}.`,
    funFact: `${country.name} ranks among the most active countries in ${country.region} for YouTube engagement per capita.`,
    isMock: true,
  };
}

/**
 * Fallback generator for Country Pulse when Gemini API key is not yet set
 */
function generateFallbackCountryPulse(countryCode: string, sampleTitles: string[]): CountryPulseInsights {
  const country = getCountryByCode(countryCode);

  return {
    countryCode,
    countryName: country.name,
    flag: country.flag,
    zeitgeistHeadline: `${country.name} Cultural Pulse: Dynamic Digital Trends & Vibrant Community Energy`,
    pulseSummary: `Right now in ${country.name}, trending video trends reflect a powerful convergence of ${country.trendingTopics?.slice(0, 3).join(', ') || 'music, lifestyle, and gaming'}. Audiences are actively celebrating local storytellers who combine authentic regional heritage with global modern production.`,
    trendingThemes: [
      {
        title: `${country.trendingTopics?.[0] || 'Pop Culture & Music'} Wave`,
        description: `Audiences are flocking to high-energy releases and creator collaborations that celebrate local rhythm and pride.`,
        category: 'Entertainment',
      },
      {
        title: `Community Commentary & Daily Humor`,
        description: `Short-form skits, everyday relatable moments, and lighthearted satire are dominating conversation circles across ${country.capital || 'major cities'}.`,
        category: 'Culture',
      },
      {
        title: `Esports & Interactive Gaming Streams`,
        description: `Local gaming tournaments and casual co-op playthroughs are drawing dedicated late-night viewership and chat interactions.`,
        category: 'Gaming',
      },
    ],
    culturalTakeaway: `If you want to understand modern ${country.name}, explore its creators: they bridge traditional cultural storytelling with contemporary global internet humor better than traditional media.`,
    isMock: true,
  };
}

/**
 * Analyze a video using Gemini (Interactions API)
 */
export async function getGeminiVideoInsights(params: {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  countryCode: string;
  tags?: string[];
}): Promise<VideoCulturalInsights> {
  const cacheKey = `gemini_video_${params.videoId}_${params.countryCode}`;
  const cached = apiCache.get<VideoCulturalInsights>(cacheKey);
  if (cached) return cached;

  const ai = getGeminiClient();
  if (!ai) {
    const fallback = generateFallbackVideoInsights(params);
    apiCache.set(cacheKey, fallback, 30 * 60 * 1000);
    return fallback;
  }

  const country = getCountryByCode(params.countryCode);
  const prompt = `You are an expert cultural anthropologist and global media analyst specializing in YouTube and internet culture.
Analyze this trending video from ${country.name} (${country.code}, Region: ${country.region}).

Video Details:
- Title: ${params.title}
- Channel: ${params.channelTitle}
- Country: ${country.name} (Capital: ${country.capital})
- Description: ${params.description.slice(0, 500)}
- Tags: ${(params.tags || []).slice(0, 10).join(', ')}

Please provide a JSON response with the following fields:
{
  "originalLanguage": "Language of the original title/video (e.g. Japanese, Korean, Portuguese, Hindi, English)",
  "translatedTitle": "English translation or natural English title if original is non-English; otherwise clean title",
  "culturalContext": "2-3 insightful sentences explaining the local cultural backdrop, events, holidays, or trends behind this video.",
  "whyTrending": "2 sentences explaining why this specifically went viral or is trending in ${country.name} right now.",
  "summary": "2-3 sentences summarizing the premise and content of the video for an international audience.",
  "localSlangOrNuance": ["Array of 2-3 local slang terms, memes, cultural nuances, or creator references unpacked for foreign viewers"],
  "targetAudience": "Who this is primarily made for (e.g., Tokyo anime community, Gen-Z gamers, soccer fans in Rio)",
  "funFact": "One fascinating cultural or internet fact related to this video or topic in ${country.name}"
}

Respond ONLY with valid JSON. Do not wrap in markdown quotes if possible, or use standard JSON.`;

  try {
    const response = await ai.interactions.create({
      model: GEMINI_MODEL,
      input: prompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
      },
    });

    const rawText = response.output_text?.trim() || '';
    const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleanJson);

    const result: VideoCulturalInsights = {
      videoId: params.videoId,
      countryCode: params.countryCode,
      countryName: country.name,
      originalLanguage: parsed.originalLanguage || 'Local Language',
      translatedTitle: parsed.translatedTitle || params.title,
      culturalContext: parsed.culturalContext || 'Rich cultural expression trending in the local community.',
      whyTrending: parsed.whyTrending || 'High viewer engagement across regional social platforms.',
      summary: parsed.summary || 'An engaging trending video from the country feed.',
      localSlangOrNuance: Array.isArray(parsed.localSlangOrNuance) ? parsed.localSlangOrNuance : [],
      targetAudience: parsed.targetAudience || `Audience in ${country.name}`,
      funFact: parsed.funFact,
      isMock: false,
    };

    apiCache.set(cacheKey, result, 60 * 60 * 1000); // 1 hour cache
    return result;
  } catch (err) {
    console.warn('[Gemini API Video Insights Error]:', err);
    const fallback = generateFallbackVideoInsights(params);
    return fallback;
  }
}

/**
 * Analyze Country Pulse using Gemini (Interactions API)
 */
export async function getGeminiCountryPulse(countryCode: string, sampleTitles: string[]): Promise<CountryPulseInsights> {
  const cacheKey = `gemini_pulse_${countryCode}`;
  const cached = apiCache.get<CountryPulseInsights>(cacheKey);
  if (cached) return cached;

  const country = getCountryByCode(countryCode);
  const ai = getGeminiClient();
  if (!ai) {
    const fallback = generateFallbackCountryPulse(countryCode, sampleTitles);
    apiCache.set(cacheKey, fallback, 30 * 60 * 1000);
    return fallback;
  }

  const prompt = `You are a cultural trend forecaster and media critic.
Synthesize the cultural zeitgeist and current pulse of ${country.name} (${country.region}) right now based on its current top trending YouTube videos.

Country info:
- Name: ${country.name}
- Region: ${country.region}
- Capital: ${country.capital}
- Key cultural themes: ${(country.trendingTopics || []).join(', ')}

Current Top Trending Video Titles in ${country.name}:
${sampleTitles.slice(0, 15).map((t, i) => `${i + 1}. ${t}`).join('\n')}

Provide a JSON object conforming strictly to this format:
{
  "zeitgeistHeadline": "Catchy, evocative headline capturing the mood/zeitgeist of ${country.name} today (max 10 words)",
  "pulseSummary": "3 engaging sentences analyzing what these trends reveal about what the nation cares about today.",
  "trendingThemes": [
    {
      "title": "Theme 1 Title",
      "description": "1-2 sentences explaining this trend pattern in ${country.name}",
      "category": "e.g., Music, Gaming, Satire, Sports, Food"
    },
    {
      "title": "Theme 2 Title",
      "description": "1-2 sentences explaining this trend pattern in ${country.name}",
      "category": "e.g., Lifestyle, Tech, News"
    },
    {
      "title": "Theme 3 Title",
      "description": "1-2 sentences explaining this trend pattern in ${country.name}",
      "category": "e.g., Pop Culture, Comedy"
    }
  ],
  "culturalTakeaway": "One profound or delightful cultural insight for an international traveler or curious explorer observing ${country.name} from afar."
}

Respond ONLY with valid JSON.`;

  try {
    const response = await ai.interactions.create({
      model: GEMINI_MODEL,
      input: prompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
      },
    });

    const rawText = response.output_text?.trim() || '';
    const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleanJson);

    const result: CountryPulseInsights = {
      countryCode,
      countryName: country.name,
      flag: country.flag,
      zeitgeistHeadline: parsed.zeitgeistHeadline || `${country.name} Cultural Pulse`,
      pulseSummary: parsed.pulseSummary || `Exploring modern cultural trends across ${country.name}.`,
      trendingThemes: Array.isArray(parsed.trendingThemes) ? parsed.trendingThemes : [],
      culturalTakeaway: parsed.culturalTakeaway || `Explore the unique creativity of ${country.name}'s creators.`,
      isMock: false,
    };

    apiCache.set(cacheKey, result, 60 * 60 * 1000);
    return result;
  } catch (err) {
    console.warn('[Gemini API Country Pulse Error]:', err);
    const fallback = generateFallbackCountryPulse(countryCode, sampleTitles);
    return fallback;
  }
}

/**
 * Multi-turn Interactive Video Q&A with Gemini
 */
export async function chatAboutVideo(params: {
  videoTitle: string;
  countryName: string;
  channelTitle: string;
  userQuestion: string;
  previousInteractionId?: string;
}): Promise<{ reply: string; interactionId?: string; isMock?: boolean }> {
  const ai = getGeminiClient();
  if (!ai) {
    // Simulated intelligent chat response
    const q = params.userQuestion.toLowerCase();
    let reply = `In **${params.countryName}**, this video by **${params.channelTitle}** connects deeply with regional viewers.`;

    if (q.includes('who') || q.includes('creator') || q.includes('channel')) {
      reply = `**${params.channelTitle}** is a notable creator in ${params.countryName}'s online entertainment space, recognized for engaging production and dedicated community interaction.`;
    } else if (q.includes('mean') || q.includes('translate') || q.includes('language') || q.includes('title')) {
      reply = `The title *" ${params.videoTitle} "* carries idiomatic flair specific to ${params.countryName}. It captures audience excitement through conversational phrasing often found in regional trending memes.`;
    } else if (q.includes('why') || q.includes('popular') || q.includes('viral')) {
      reply = `It went viral primarily because it resonates with contemporary topics widely discussed on social platforms across ${params.countryName}, driving rapid shares and discussion in comment sections.`;
    } else {
      reply = `Great question! For viewers outside of ${params.countryName}, content like *" ${params.videoTitle} "* offers a fascinating window into everyday life, sense of humor, and current pop culture trends in the country. *(Note: Add your GEMINI_API_KEY in .env.local to enable live interactive AI reasoning!)*`;
    }

    return { reply, isMock: true };
  }

  try {
    const inputPrompt = params.previousInteractionId
      ? params.userQuestion
      : `You are an expert cultural guide assisting a curious global viewer watching this YouTube video from ${params.countryName}:
- Title: "${params.videoTitle}"
- Channel: "${params.channelTitle}"
- Country: ${params.countryName}

The user asks: "${params.userQuestion}"
Provide a friendly, culturally insightful, concise explanation in markdown.`;

    const interaction = await ai.interactions.create({
      model: GEMINI_MODEL,
      input: inputPrompt,
      ...(params.previousInteractionId ? { previous_interaction_id: params.previousInteractionId } : {}),
    });

    return {
      reply: interaction.output_text || 'No response generated.',
      interactionId: interaction.id,
      isMock: false,
    };
  } catch (err: unknown) {
    console.warn('[Gemini Chat Error]:', err);
    const message = err instanceof Error ? err.message : 'Error communicating with Gemini';
    return {
      reply: `Gemini encountered a temporary issue: ${message}.`,
      isMock: true,
    };
  }
}
