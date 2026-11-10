import { CountryInfo } from '@/types/youtube';

export const COUNTRIES: CountryInfo[] = [
  // Southeast Asia & East Asia
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', region: 'Asia', capital: 'Kuala Lumpur', trendingTopics: ['Food Hunting', 'Lagu Melayu', 'Badminton', 'MLBB', 'Vlog'] },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia', capital: 'Singapore', trendingTopics: ['Finance', 'Hawker Food', 'Tech Reviews', 'Esports'] },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'Asia', capital: 'Jakarta', trendingTopics: ['Dangdut Koplo', 'Mobile Legends', 'Pranks', 'Sinetron'] },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'Asia', capital: 'Bangkok', trendingTopics: ['T-Pop', 'Street Food', 'Series Y', 'Muay Thai'] },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', region: 'Asia', capital: 'Hanoi', trendingTopics: ['V-Pop', 'Street Food', 'Bóng Đá', 'Ẩm Thực'] },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', region: 'Asia', capital: 'Manila', trendingTopics: ['OPM', 'Pageantry', 'MLBB', 'Vlogs', 'Basketball'] },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia', capital: 'Tokyo', trendingTopics: ['Anime', 'VTubers', 'J-Pop', 'Gaming', 'Ramen'] },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia', capital: 'Seoul', trendingTopics: ['K-Pop', 'Mukbang', 'K-Drama', 'Esports', 'K-Beauty'] },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', region: 'Asia', capital: 'Taipei', trendingTopics: ['Night Markets', 'Mandopop', 'Tech', 'Food Vlogs'] },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', region: 'Asia', capital: 'Hong Kong', trendingTopics: ['Cantopop', 'Dim Sum', 'Cinema', 'Finance'] },

  // South Asia
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia', capital: 'New Delhi', trendingTopics: ['Bollywood', 'Cricket', 'Tech Reviews', 'Bhakti', 'Comedy'] },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', region: 'Asia', capital: 'Islamabad', trendingTopics: ['Dramas', 'Cricket', 'Coke Studio', 'Food Street'] },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', region: 'Asia', capital: 'Dhaka', trendingTopics: ['Natok', 'Cricket', 'Bangla Music', 'Street Food'] },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', region: 'Asia', capital: 'Colombo', trendingTopics: ['Cricket', 'Travel', 'Baila', 'Culture'] },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', region: 'Asia', capital: 'Kathmandu', trendingTopics: ['Lok Dohori', 'Trekking', 'Himalayas', 'Music'] },

  // North & South Americas
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'Americas', capital: 'Washington, D.C.', trendingTopics: ['Podcasts', 'Pop Culture', 'Gaming', 'Tech'] },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'Americas', capital: 'Ottawa', trendingTopics: ['Hockey', 'Music', 'Comedy', 'Nature'] },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'Americas', capital: 'Mexico City', trendingTopics: ['Música Regional', 'Fútbol', 'Vlogs', 'Lucha Libre'] },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'Americas', capital: 'Brasília', trendingTopics: ['Futebol', 'Sertanejo', 'Funk', 'Streaming'] },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', region: 'Americas', capital: 'Buenos Aires', trendingTopics: ['Fútbol', 'Trap Argentino', 'Twitch', 'Mate'] },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', region: 'Americas', capital: 'Bogotá', trendingTopics: ['Reggaeton', 'Ciclismo', 'Humor', 'Salsa'] },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', region: 'Americas', capital: 'Santiago', trendingTopics: ['Noticias', 'Gaming', 'Música Urbana', 'Fútbol'] },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', region: 'Americas', capital: 'Lima', trendingTopics: ['Gastronomía', 'Cumbia', 'Fútbol', 'Vlogs'] },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', region: 'Americas', capital: 'Quito', trendingTopics: ['Fútbol', 'Música', 'Humor', 'Turismo'] },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', region: 'Americas', capital: 'Santo Domingo', trendingTopics: ['Dembow', 'Bachata', 'Béisbol', 'Humor'] },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', region: 'Americas', capital: 'San Juan', trendingTopics: ['Reggaeton', 'Urbano', 'Béisbol', 'Música'] },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', region: 'Americas', capital: 'San José', trendingTopics: ['Pura Vida', 'Fútbol', 'Naturaleza', 'Música'] },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', region: 'Americas', capital: 'Panama City', trendingTopics: ['Reggae en Español', 'Canal', 'Gastronomía'] },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', region: 'Americas', capital: 'Montevideo', trendingTopics: ['Fútbol', 'Cumbia Pop', 'Mate', 'Murga'] },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', region: 'Americas', capital: 'Sucre', trendingTopics: ['Folklore', 'Fútbol', 'Costumbres', 'Humor'] },

  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe', capital: 'London', trendingTopics: ['Premier League', 'Grime', 'Entertainment', 'Sidemen'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe', capital: 'Berlin', trendingTopics: ['Bundesliga', 'Tech', 'Automotive', 'Deutschrap'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe', capital: 'Paris', trendingTopics: ['Rap Français', 'Ligue 1', 'Cinema', 'Cuisine'] },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Europe', capital: 'Madrid', trendingTopics: ['La Liga', 'Twitch Streamers', 'Flamenco', 'Ibai'] },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'Europe', capital: 'Rome', trendingTopics: ['Serie A', 'Sanremo', 'Cucina', 'Trap Italia'] },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Europe', capital: 'Amsterdam', trendingTopics: ['EDM', 'Cycling', 'Festival Highlights', 'Eredivisie'] },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Europe', capital: 'Stockholm', trendingTopics: ['Electronic Music', 'Gaming', 'Tech', 'Melodifestivalen'] },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'Europe', capital: 'Warsaw', trendingTopics: ['Esports', 'Vlogs', 'Hip Hop Polski', 'Ekstraklasa'] },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Europe', capital: 'Oslo', trendingTopics: ['Winter Sports', 'Nature', 'Electronic', 'Outdoor'] },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'Europe', capital: 'Copenhagen', trendingTopics: ['Hygge', 'Design', 'Music', 'Football'] },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'Europe', capital: 'Helsinki', trendingTopics: ['Ice Hockey', 'Metal Music', 'Tech', 'Sauna'] },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', region: 'Europe', capital: 'Bern', trendingTopics: ['Alps', 'Watches', 'Nature', 'Skiing'] },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'Europe', capital: 'Vienna', trendingTopics: ['Classical Music', 'Skiing', 'Vienna', 'Bundesliga'] },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'Europe', capital: 'Brussels', trendingTopics: ['Tomorrowland', 'Cycling', 'Football', 'Comics'] },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', region: 'Europe', capital: 'Lisbon', trendingTopics: ['Fado', 'Futebol', 'Surfing', 'Gastronomia'] },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', region: 'Europe', capital: 'Dublin', trendingTopics: ['Rugby', 'GAA', 'Irish Music', 'Pub Culture'] },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', region: 'Europe', capital: 'Athens', trendingTopics: ['Greek Music', 'Islands', 'Basketball', 'Football'] },
  { code: 'CZ', name: 'Czechia', flag: '🇨🇿', region: 'Europe', capital: 'Prague', trendingTopics: ['Ice Hockey', 'Prague', 'Beer Culture', 'Vlogs'] },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', region: 'Europe', capital: 'Budapest', trendingTopics: ['Water Polo', 'Budapest', 'Music', 'Culture'] },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', region: 'Europe', capital: 'Bucharest', trendingTopics: ['Manele', 'Football', 'Vlogs', 'Trap'] },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', region: 'Europe', capital: 'Kyiv', trendingTopics: ['Eurovision', 'Boxing', 'Music', 'Esports'] },

  // Middle East & North Africa
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East', capital: 'Abu Dhabi', trendingTopics: ['Luxury', 'Tech', 'Supercars', 'Expo'] },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', capital: 'Riyadh', trendingTopics: ['Saudi League', 'Comedy', 'Riyadh Season', 'Culture'] },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', region: 'Middle East', capital: 'Ankara', trendingTopics: ['Dizi / Series', 'Football', 'Food', 'Istanbul'] },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'Middle East', capital: 'Cairo', trendingTopics: ['Mahraganat', 'Cinema', 'Football', 'Comedy'] },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', region: 'Middle East', capital: 'Doha', trendingTopics: ['Sports', 'Culture', 'Museums', 'Architecture'] },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', region: 'Middle East', capital: 'Kuwait City', trendingTopics: ['Diwaniya', 'Theater', 'Food', 'Automotive'] },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', region: 'Middle East', capital: 'Muscat', trendingTopics: ['Heritage', 'Nature', 'Wadis', 'Culture'] },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'Middle East', capital: 'Rabat', trendingTopics: ['Lions de l’Atlas', 'Rap Marocain', 'Cuisine', 'Gnawa'] },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', region: 'Middle East', capital: 'Algiers', trendingTopics: ['Raï', 'Football', 'Rap Algérien', 'Vlogs'] },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', region: 'Middle East', capital: 'Tunis', trendingTopics: ['Mezwed', 'Football', 'Cinema', 'Cuisine'] },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', region: 'Middle East', capital: 'Amman', trendingTopics: ['Comedy', 'Mansaf', 'Culture', 'Cinema'] },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', region: 'Middle East', capital: 'Beirut', trendingTopics: ['Music', 'Dabke', 'Gastronomy', 'Comedy'] },

  // Africa
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', region: 'Africa', capital: 'Abuja', trendingTopics: ['Afrobeats', 'Nollywood', 'Skits', 'Tech Bro'] },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'Africa', capital: 'Pretoria', trendingTopics: ['Amapiano', 'Rugby', 'Podcasts', 'Gqom'] },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'Africa', capital: 'Nairobi', trendingTopics: ['Gengetone', 'Athletics', 'Safari', 'Comedy'] },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'Africa', capital: 'Accra', trendingTopics: ['Afrobeats', 'Highlife', 'Comedy', 'Black Stars'] },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', region: 'Africa', capital: 'Dodoma', trendingTopics: ['Bongo Flava', 'Diamond Platnumz', 'Kilimanjaro', 'Swahili'] },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', region: 'Africa', capital: 'Kampala', trendingTopics: ['Kidandali', 'Comedy', 'Sports', 'Lifestyle'] },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', region: 'Africa', capital: 'Dakar', trendingTopics: ['Mbalax', 'Lions de la Teranga', 'Lutte', 'Mode'] },
  { code: 'CI', name: 'Ivory Coast', flag: '🇨🇮', region: 'Africa', capital: 'Yamoussoukro', trendingTopics: ['Coupé-Décalé', 'Zoblazo', 'CAN Football', 'Humour'] },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', region: 'Africa', capital: 'Addis Ababa', trendingTopics: ['Ethio-Jazz', 'Athletics', 'Coffee Ceremony', 'Music'] },

  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania', capital: 'Canberra', trendingTopics: ['AFL & Cricket', 'Outback', 'Comedy', 'Surfing'] },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Oceania', capital: 'Wellington', trendingTopics: ['Rugby All Blacks', 'Lord of the Rings', 'Indie', 'Māori Culture'] },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', region: 'Oceania', capital: 'Suva', trendingTopics: ['Rugby 7s', 'Island Life', 'Bula Music', 'Culture'] },
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
