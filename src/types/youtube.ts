export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  channelId?: string;
  publishedAt: string;
  viewCount: number;
  likeCount?: number;
  commentCount?: number;
  duration: string; // formatted e.g. "4:15" or "0:45"
  rawDuration: string; // ISO 8601 e.g. "PT4M15S"
  isShort: boolean;
  categoryId: string;
  countryCode: string;
  tags?: string[];
}

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  region: 'Americas' | 'Europe' | 'Asia' | 'Africa' | 'Oceania' | 'Middle East';
  capital?: string;
  languages?: string[];
  trendingTopics?: string[];
}

export interface VideoCategory {
  id: string;
  label: string;
  icon?: string;
}

export type DurationFilter = 'all' | 'shorts' | 'standard';

export interface VideosApiResponse {
  videos: YouTubeVideo[];
  country: CountryInfo;
  isMock: boolean;
  source: 'api' | 'cache' | 'mock';
  error?: string;
}

