import { YouTubeVideo } from '@/types/youtube';
import { getCountryByCode } from './countries';

// Well-tested embeddable YouTube video IDs with diverse themes
const EMBEDDABLE_SAMPLE_VIDEOS = [
  { id: 'dQw4w9WgXcQ', duration: 'PT3M33S', isShort: false },
  { id: 'kJQP7kiw5Fk', duration: 'PT4M15S', isShort: false }, // Despacito
  { id: '9bZkp7q19f0', duration: 'PT4M12S', isShort: false }, // Gangnam Style
  { id: 'fJ9rUzIMcZQ', duration: 'PT3M47S', isShort: false }, // Bohemian Rhapsody
  { id: 'k2qgadSvNyU', duration: 'PT0M45S', isShort: true },  // Short
  { id: 'JGwWNGJdvx8', duration: 'PT3M17S', isShort: false }, // Shape of You
  { id: 'OPf0YbXqDm0', duration: 'PT0M52S', isShort: true },  // Short
  { id: 'hY7m5jjJ9mM', duration: 'PT3M20S', isShort: false },
  { id: 'RgKAFK5djSk', duration: 'PT3M55S', isShort: false }, // See You Again
  { id: '7wtfhZwyrcc', duration: 'PT0M35S', isShort: true },  // Short
  { id: 'ALZHF5UqnU4', duration: 'PT3M15S', isShort: false },
  { id: '2Vv-BfVoq4g', duration: 'PT4M30S', isShort: false },
];

interface CountryTemplate {
  creators: string[];
  trendingHeadlines: { title: string; categoryId: string; isShort: boolean }[];
}

const COUNTRY_TEMPLATES: Record<string, CountryTemplate> = {
  US: {
    creators: ['MrBeast', 'MKBHD', 'Veritasium', 'First We Feast', 'Theo - t3.gg', 'Lex Fridman', 'Mark Rober'],
    trendingHeadlines: [
      { title: 'I Built 100 Houses And Gave Them Away!', categoryId: '24', isShort: false },
      { title: 'The Next Smartphone Revolution is Here', categoryId: '28', isShort: false },
      { title: 'Gordon Ramsay Tries The World’s Spiciest Wings', categoryId: '24', isShort: false },
      { title: 'Quick iPhone Trick You Didn’t Know! #shorts', categoryId: '28', isShort: true },
      { title: 'Can You Solve This NASA Astronaut Riddle?', categoryId: '27', isShort: true },
      { title: 'Top 10 NBA Plays of The Week Highlights', categoryId: '17', isShort: false },
      { title: 'New Synthwave Single - Official Visualizer', categoryId: '10', isShort: false },
      { title: 'Inside The World’s Most Advanced Autonomous Factory', categoryId: '28', isShort: false },
      { title: 'Grand Theft Auto VI - Gameplay Breakdown & Secrets', categoryId: '20', isShort: false },
      { title: 'Crazy Beatbox in 30 Seconds! 🔥', categoryId: '10', isShort: true },
      { title: 'Breaking Down Tonight’s Presidential Debate', categoryId: '25', isShort: false },
      { title: 'How To Cook A Restaurant Quality Ribeye in 10 Minutes', categoryId: '26', isShort: false },
    ],
  },
  JP: {
    creators: ['HikakinTV', 'Fischer’s', 'hololive ホロライブ', 'THE FIRST TAKE', 'Sushi Ramen', 'Ayase / YOASOBI', 'PewDiePie in Japan'],
    trendingHeadlines: [
      { title: '【超巨大】世界一大きいカツ丼を作って完食できるか！？', categoryId: '24', isShort: false },
      { title: 'YOASOBI - New Track Live Studio Session #THEFIRSTTAKE', categoryId: '10', isShort: false },
      { title: '秋葉原のレトロゲーム屋で超激レアファミコンソフト発掘！', categoryId: '20', isShort: false },
      { title: '1分でわかる東京の隠れ家ラーメン店 🍜 #shorts', categoryId: '26', isShort: true },
      { title: '新幹線E5系の運転席から見た時速320kmの車窓！', categoryId: '28', isShort: false },
      { title: '【大食い】深夜のファミリーマート全種類食べつくし！', categoryId: '24', isShort: false },
      { title: 'VR空間で無重力アクションゲームやってみた！', categoryId: '20', isShort: false },
      { title: '日本の伝統的な包丁職人の神業 #shorts', categoryId: '26', isShort: true },
      { title: '最新アニメ劇場版 予告編第2弾解禁！', categoryId: '1', isShort: false },
      { title: 'AIが作ったJ-POPがオリコンチャートを席巻！？', categoryId: '28', isShort: false },
    ],
  },
  KR: {
    creators: ['HYBE LABELS', 'SMTOWN', '1MILLION Dance Studio', 'dingo music', 'tzuyang 쯔양', 'Workman 워크맨'],
    trendingHeadlines: [
      { title: 'NewJeans (뉴진스) - Special Stage Performance Video', categoryId: '10', isShort: false },
      { title: '쯔양의 통삼겹살 20인분 순식간에 해치우기 먹방!', categoryId: '24', isShort: false },
      { title: 'K-POP Dance Practice 4K Behind The Scenes #shorts', categoryId: '10', isShort: true },
      { title: '손흥민 프리미어리그 환상적인 감아차기 골 모음', categoryId: '17', isShort: false },
      { title: '홍대 길거리 버스킹 레전드 라이브 무대!', categoryId: '10', isShort: false },
      { title: 'T1 vs Gen.G LCK 결승전 하이라이트 매치', categoryId: '20', isShort: false },
      { title: '성수동 핫플 카페 1분 투어 #shorts', categoryId: '26', isShort: true },
      { title: '한강 라면 기계 제대로 끓여먹는 꿀팁', categoryId: '26', isShort: true },
      { title: 'K-드라마 촬영 현장 비하인드 대공개', categoryId: '24', isShort: false },
    ],
  },
  GB: {
    creators: ['Sidemen', 'Gordon Ramsay', 'BBC News', 'BBC Sport', 'The Overlap', 'DanTDM', 'Adele Official'],
    trendingHeadlines: [
      { title: 'Sidemen Extreme 24-Hour Desert Survival Challenge', categoryId: '24', isShort: false },
      { title: 'Premier League Match of the Weekend Review & Goals', categoryId: '17', isShort: false },
      { title: 'London Underground Hidden Station Secrets Revealed', categoryId: '28', isShort: false },
      { title: 'Gordon Ramsay Criticizes TikTok Roast Dinners #shorts', categoryId: '24', isShort: true },
      { title: 'Glastonbury Festival Sunset Acoustic Performance', categoryId: '10', isShort: false },
      { title: 'Can an Electric Supercar Beat a Formula 1 Machine?', categoryId: '28', isShort: false },
      { title: 'Quick Traditional English Scone Recipe #shorts', categoryId: '26', isShort: true },
    ],
  },
  IN: {
    creators: ['T-Series', 'CarryMinati', 'Technical Guruji', 'Total Gaming', 'Bhuvan Bam', 'Sony SAB'],
    trendingHeadlines: [
      { title: 'Latest Bollywood Blockbuster Teaser & Title Track', categoryId: '10', isShort: false },
      { title: 'India vs Australia T20 Thriller Match Winning Six!', categoryId: '17', isShort: false },
      { title: 'Top 5 Smartphones Under ₹25,000 Unboxing & Review', categoryId: '28', isShort: false },
      { title: 'Hilarious Indian Wedding Dances Compilation #shorts', categoryId: '23', isShort: true },
      { title: 'Delhi Street Food Butter Chicken Explosion! 🍛', categoryId: '26', isShort: false },
      { title: 'Grand Gaming Tournament Finals - Free Fire India', categoryId: '20', isShort: false },
      { title: '1-Minute Vedic Maths Shortcut That Blows Minds #shorts', categoryId: '27', isShort: true },
    ],
  },
  BR: {
    creators: ['Felipe Neto', 'Whindersson Nunes', 'CazéTV', 'KondZilla', 'Alok', 'Gaules'],
    trendingHeadlines: [
      { title: 'Melhores Momentos: Brasileirão Rodada Épica!', categoryId: '17', isShort: false },
      { title: 'Whindersson Nunes - Stand-up Ao Vivo Emocionante', categoryId: '23', isShort: false },
      { title: 'Hit do Verão 2026 - Clipe Oficial KondZilla', categoryId: '10', isShort: false },
      { title: 'Dribles desconcertantes no futebol de várzea! ⚽ #shorts', categoryId: '17', isShort: true },
      { title: 'Tour Gastronômico pela Feira de São Cristóvão', categoryId: '26', isShort: false },
      { title: 'CS2 Clutch Impossível do Gaules ao Vivo!', categoryId: '20', isShort: false },
    ],
  },
  DE: {
    creators: ['MontanaBlack88', 'Galileo', 'Gronkh', 'DW Deutsch', 'Paluten', 'JP Performance'],
    trendingHeadlines: [
      { title: 'JP Performance testet 1000 PS Monster auf der Autobahn!', categoryId: '28', isShort: false },
      { title: 'Galileo Spezial: Die sicherste Festung der Welt', categoryId: '28', isShort: false },
      { title: 'Bundesliga Top-Spiel: Bayern gegen Dortmund Highlights', categoryId: '17', isShort: false },
      { title: 'Minecraft Hardcore Überleben Tag 100 mit Paluten', categoryId: '20', isShort: false },
      { title: 'Berliner Streetfood: Die ultimative Currywurst Probe #shorts', categoryId: '26', isShort: true },
      { title: 'Neuer Deutschrap Track geht viral auf TikTok', categoryId: '10', isShort: false },
    ],
  },
  FR: {
    creators: ['Squeezie', 'Mcfly et Carlito', 'Tibo InShape', 'Mister V', 'HugoDécrypte'],
    trendingHeadlines: [
      { title: 'Squeezie - Le Pire Piège Entre Amis Saison 4', categoryId: '24', isShort: false },
      { title: 'HugoDécrypte: Les 5 actualités de la semaine résumées', categoryId: '25', isShort: false },
      { title: 'Ligue 1: Les plus beaux buts de la saison en 4K', categoryId: '17', isShort: false },
      { title: 'Recette express du meilleur croissant de Paris #shorts', categoryId: '26', isShort: true },
      { title: 'Nouveau clip officiel Rap Français exclusif', categoryId: '10', isShort: false },
    ],
  },
  AU: {
    creators: ['HowToBasic', 'LazarBeam', 'Cold Ones', 'ABC News In-depth', 'Lachlan'],
    trendingHeadlines: [
      { title: 'Surviving Australia’s Wildest Wildlife Encounters', categoryId: '24', isShort: false },
      { title: 'Sydney Harbour Drone Light Spectacular in 4K', categoryId: '28', isShort: false },
      { title: 'Aussie Rules Football Best Speccies of the Year', categoryId: '17', isShort: false },
      { title: 'Feeding a Wild Kangaroo in Outback NSW #shorts', categoryId: '26', isShort: true },
      { title: 'HowToBasic: The Secret Way to Fix Anything', categoryId: '23', isShort: false },
    ],
  },
};

/**
 * Generates realistic mock YouTube trending videos tailored for a specific country & category
 */
export function generateMockVideos(countryCode: string, categoryId: string = '0'): YouTubeVideo[] {
  const code = countryCode.toUpperCase();
  const country = getCountryByCode(code);
  const template = COUNTRY_TEMPLATES[code] || {
    creators: [`${country.name} Pulse`, `${country.name} Beats`, `Daily ${country.name}`, `Explore ${country.name}`, `Stream ${country.code}`],
    trendingHeadlines: [
      { title: `Top National Highlights & Celebration in ${country.name}`, categoryId: '24', isShort: false },
      { title: `${country.name} Hit Music Countdown - Official Studio Stream`, categoryId: '10', isShort: false },
      { title: `Exploring the Beautiful Landscapes of ${country.name} in 4K`, categoryId: '28', isShort: false },
      { title: `Local Street Food Tour in ${country.capital || country.name} #shorts`, categoryId: '26', isShort: true },
      { title: `${country.name} Football Championship Final Whistle Highlights`, categoryId: '17', isShort: false },
      { title: `Viral Dance Craze Taking Over ${country.name}! #shorts`, categoryId: '10', isShort: true },
      { title: `Breaking News & Weekly Briefing from ${country.capital || country.name}`, categoryId: '25', isShort: false },
      { title: `Pro Gaming Esports Finals Live from ${country.name}`, categoryId: '20', isShort: false },
      { title: `Top 5 Hidden Gems in ${country.name} You Must Visit #shorts`, categoryId: '26', isShort: true },
      { title: `Innovation Summit: Future Tech in ${country.name}`, categoryId: '28', isShort: false },
    ],
  };

  const results: YouTubeVideo[] = [];
  const headlines = categoryId === '0'
    ? template.trendingHeadlines
    : template.trendingHeadlines.filter(h => h.categoryId === categoryId);

  // If filtered category has few items, add general items with that categoryId
  const itemsToUse = headlines.length >= 3 ? headlines : [
    ...headlines,
    { title: `${country.name} Spotlight Special [${categoryId}]`, categoryId, isShort: false },
    { title: `Trending Moment in ${country.name} #shorts`, categoryId, isShort: true },
    { title: `Top Creator Feature in ${country.name}`, categoryId, isShort: false },
    { title: `Viral Clip from ${country.capital || country.name}`, categoryId, isShort: true },
  ];

  itemsToUse.forEach((item, index) => {
    const videoRef = EMBEDDABLE_SAMPLE_VIDEOS[index % EMBEDDABLE_SAMPLE_VIDEOS.length];
    const creator = template.creators[index % template.creators.length];
    const views = Math.floor(100_000 + Math.random() * 4_500_000 * (12 - index));
    const likes = Math.floor(views * (0.04 + Math.random() * 0.05));
    const comments = Math.floor(likes * 0.08);

    const hoursAgo = index * 2 + 1;
    const pubDate = new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString();

    const isShort = item.isShort || videoRef.isShort;
    const duration = isShort ? '0:45' : `${Math.floor(Math.random() * 12) + 2}:${Math.floor(Math.random() * 50 + 10)}`;

    results.push({
      id: `${videoRef.id}`,
      title: item.title,
      description: `Trending content from ${country.name} (${country.flag}). Watch the latest viral updates, music, and highlights trending today. Subscribe to ${creator} for more!`,
      thumbnail: `https://i.ytimg.com/vi/${videoRef.id}/hqdefault.jpg`,
      channelTitle: creator,
      channelId: `UC_${code}_${index}`,
      publishedAt: pubDate,
      viewCount: views,
      likeCount: likes,
      commentCount: comments,
      duration,
      rawDuration: videoRef.duration,
      isShort,
      categoryId: item.categoryId || categoryId,
      countryCode: code,
      tags: [country.name, 'Trending', '2026', country.region, ...(country.trendingTopics || [])],
    });
  });

  return results;
}

