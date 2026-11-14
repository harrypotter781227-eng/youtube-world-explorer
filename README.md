# 🌍 WorldTube Explorer — Global YouTube Content Discovery

An interactive, modern full-stack web application built with **Next.js (App Router)** and **Tailwind CSS** that lets you explore what’s trending on YouTube across the globe.

---

## ✨ Features

- **🌐 Interactive Country Picker**: Search through countries across the Americas, Europe, Asia, Africa, Middle East, and Oceania.
- **⚡ Random Country Teleport**: One-click surprise teleportation to discover foreign culture and trending feeds instantly.
- **✨ Gemini Cultural Lens & Translator**: In-depth AI breakdown of any video. Translates foreign titles, unpacks regional slang/memes, explains the cultural backdrop, and highlights why it's trending in that country.
- **💬 Interactive "Ask Gemini" Assistant**: In-theater Q&A assistant to ask questions about the video, creator background, and cultural nuances via multi-turn stateful conversation.
- **📡 Gemini Country Pulse**: 1-click national zeitgeist synthesis revealing what is capturing each country's attention today across top trending topics.
- **🏷️ Category Filtering**: Filter by Music, Gaming, Tech & Science, News, Entertainment, Sports, and Comedy.
- **⏱️ Duration & Shorts Filter**: Switch seamlessly between All Videos, Standard Long-form, or YouTube Shorts (< 60s).
- **🎬 In-App Theater Player**: Watch any video directly inside the app with YouTube IFrame Player, views, likes, comments, channel info, and tags without losing your place.
- **⭐️ Local Bookmarks**: Save your favorite discoveries with 1-click bookmarks, persisted in your browser's `localStorage`.
- **🚀 Server-side Caching & Smart Fallback**: 
  - Automatically caches YouTube and Gemini API responses (1-hour TTL) to preserve quota and maximize performance.
  - Runs in **Demo / Mock Mode** out of the box with realistic country feeds and simulated AI intelligence if no API keys are configured.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI SDK**: Google GenAI SDK (`@google/genai`) using the modern **Interactions API** (`gemini-4-hydrogen`)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **API**: YouTube Data API v3 (`videos.list` with `chart=mostPopular`)
- **Caching**: Server-side in-memory cache with configurable TTL

---

## ⚡ Deploy to Vercel

Deploy your own instance of WorldTube Explorer to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fharrypotter781227-eng%2Fyoutube-world-explorer&env=GEMINI_API_KEY,YOUTUBE_API_KEY&envDescription=Add%20your%20Google%20Gemini%20API%20key%20and%20optional%20YouTube%20API%20key&project-name=worldtube-explorer&repository-name=youtube-world-explorer)

### Environment Variables on Vercel
In your Vercel Project Settings under **Environment Variables**, configure:
- `GEMINI_API_KEY`: Your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)
- `YOUTUBE_API_KEY`: *(Optional)* YouTube Data API v3 key (runs in Demo Mock mode if omitted)

---

## 🚀 Getting Started

### 1. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. (Optional) Connect Live APIs

#### YouTube Data API v3
To fetch live trending data directly from YouTube:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and enable the **YouTube Data API v3**.
3. Generate an API Key under **Credentials**.

#### Google Gemini API
To enable live AI cultural translation, zeitgeist analysis, and interactive chat:
1. Get a free API key at [Google AI Studio](https://aistudio.google.com/).

#### Add keys to `.env.local`:
```env
YOUTUBE_API_KEY=AIzaSy...
GEMINI_API_KEY=AIzaSy...
```
Restart the server to switch from Demo / Mock mode to full Live API intelligence!

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── videos/
│   │       └── route.ts          # Server-side YouTube API proxy & caching
│   ├── globals.css               # Tailwind CSS theme
│   ├── layout.tsx                # App layout & metadata
│   └── page.tsx                  # Main explorer dashboard
├── components/
│   ├── Header.tsx                # Navigation, teleport, bookmarks count, API badge
│   ├── CountryBanner.tsx         # Hero banner for active country & regional tags
│   ├── CountryModal.tsx          # Country search, region tabs, and selector
│   ├── CategoryFilter.tsx        # Scrollable category pill tabs
│   ├── DurationFilter.tsx        # Duration filters (Shorts vs Long-form), sorter & search
│   ├── VideoCard.tsx             # Video grid card with hover playback & bookmarking
│   ├── VideoPlayerModal.tsx      # In-app theater mode player & video info
│   ├── BookmarksDrawer.tsx       # Slide-over saved videos manager
│   └── InfoModal.tsx             # About modal & API key instructions
├── data/
│   ├── countries.ts              # Supported country registry with flags and metadata
│   ├── categories.ts             # YouTube category mappings
│   └── mockVideos.ts             # Realistic offline fallback dataset generator
├── lib/
│   ├── cache.ts                  # In-memory quota preservation cache
│   └── youtube.ts                # ISO duration parser, view count & date formatters
└── types/
    └── youtube.ts                # TypeScript interfaces
```
