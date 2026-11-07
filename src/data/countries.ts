import { CountryInfo } from '@/types/youtube';

export const COUNTRIES: CountryInfo[] = [
  // North & South Americas
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'Americas', capital: 'Washington, D.C.', trendingTopics: ['Podcasts', 'Pop Culture', 'Gaming'] },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'Americas', capital: 'Ottawa', trendingTopics: ['Hockey', 'Music', 'Comedy'] },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'Americas', capital: 'Mexico City', trendingTopics: ['Música Regional', 'Fútbol', 'Vlogs'] },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'Americas', capital: 'Brasília', trendingTopics: ['Futebol', 'Sertanejo', 'Funk'] },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', region: 'Americas', capital: 'Buenos Aires', trendingTopics: ['Fútbol', 'Trap', 'Streaming'] },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', region: 'Americas', capital: 'Bogotá', trendingTopics: ['Reggaeton', 'Ciclismo', 'Humor'] },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', region: 'Americas', capital: 'Santiago', trendingTopics: ['Noticias', 'Gaming', 'Música Urbana'] },

  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe', capital: 'London', trendingTopics: ['Premier League', 'Grime', 'Entertainment'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe', capital: 'Berlin', trendingTopics: ['Bundesliga', 'Tech', 'Automotive'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe', capital: 'Paris', trendingTopics: ['Rap Français', 'Ligue 1', 'Cinema'] },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Europe', capital: 'Madrid', trendingTopics: ['La Liga', 'Twitch Streamers', 'Flamenco'] },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'Europe', capital: 'Rome', trendingTopics: ['Serie A', 'Sanremo', 'Cucina'] },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Europe', capital: 'Amsterdam', trendingTopics: ['EDM', 'Cycling', 'Festival Highlights'] },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Europe', capital: 'Stockholm', trendingTopics: ['Electronic Music', 'Gaming', 'Tech'] },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'Europe', capital: 'Warsaw', trendingTopics: ['Esports', 'Vlogs', 'Hip Hop'] },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Europe', capital: 'Oslo', trendingTopics: ['Winter Sports', 'Nature', 'Music'] },

  // Asia
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia', capital: 'Tokyo', trendingTopics: ['Anime', 'VTubers', 'J-Pop', 'Gaming'] },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia', capital: 'Seoul', trendingTopics: ['K-Pop', 'Mukbang', 'K-Drama', 'Esports'] },
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia', capital: 'New Delhi', trendingTopics: ['Bollywood', 'Cricket', 'Tech Reviews', 'Bhakti'] },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'Asia', capital: 'Jakarta', trendingTopics: ['Dangdut', 'Mobile Legends', 'Pranks'] },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'Asia', capital: 'Bangkok', trendingTopics: ['T-Pop', 'Food Tours', 'Series Y'] },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', region: 'Asia', capital: 'Hanoi', trendingTopics: ['V-Pop', 'Street Food', 'Football'] },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', region: 'Asia', capital: 'Manila', trendingTopics: ['O-PM', 'Pageantry', 'Mobile Gaming'] },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia', capital: 'Singapore', trendingTopics: ['Finance', 'Foodies', 'Tech'] },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', region: 'Asia', capital: 'Taipei', trendingTopics: ['Night Markets', 'Mandopop', 'Tech'] },

  // Middle East
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East', capital: 'Abu Dhabi', trendingTopics: ['Luxury', 'Tech', 'Supercars'] },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', capital: 'Riyadh', trendingTopics: ['Saudi League', 'Comedy', 'Culture'] },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', region: 'Middle East', capital: 'Ankara', trendingTopics: ['Dizi / Series', 'Football', 'Food'] },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'Middle East', capital: 'Cairo', trendingTopics: ['Mahraganat', 'Cinema', 'Football'] },

  // Africa
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', region: 'Africa', capital: 'Abuja', trendingTopics: ['Afrobeats', 'Nollywood', 'Skits'] },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'Africa', capital: 'Pretoria', trendingTopics: ['Amapiano', 'Rugby', 'Podcasts'] },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'Africa', capital: 'Nairobi', trendingTopics: ['Gengetone', 'Athletics', 'Safari'] },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'Africa', capital: 'Accra', trendingTopics: ['Afrobeats', 'Highlife', 'Comedy'] },

  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania', capital: 'Canberra', trendingTopics: ['AFL & Cricket', 'Outback', 'Comedy'] },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Oceania', capital: 'Wellington', trendingTopics: ['Rugby', 'Lord of the Rings', 'Indie'] },
];

export const REGIONS = ['All', 'Americas', 'Europe', 'Asia', 'Middle East', 'Africa', 'Oceania'] as const;

export function getCountryByCode(code: string): CountryInfo {
  const match = COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase());
  return match || {
    code: code.toUpperCase(),
    name: code.toUpperCase(),
    flag: '🌐',
    region: 'Americas',
  };
}

