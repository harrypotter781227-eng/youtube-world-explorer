export interface VideoCulturalInsights {
  videoId: string;
  countryCode: string;
  countryName: string;
  originalLanguage?: string;
  translatedTitle?: string;
  culturalContext: string;
  whyTrending: string;
  summary: string;
  localSlangOrNuance: string[];
  targetAudience: string;
  funFact?: string;
  isMock?: boolean;
}

export interface CountryPulseInsights {
  countryCode: string;
  countryName: string;
  flag: string;
  zeitgeistHeadline: string;
  pulseSummary: string;
  trendingThemes: {
    title: string;
    description: string;
    category: string;
  }[];
  culturalTakeaway: string;
  isMock?: boolean;
}

export interface VideoChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp?: number;
}
