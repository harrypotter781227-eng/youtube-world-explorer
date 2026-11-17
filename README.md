# 🌍 WorldTube Explorer — Global YouTube Content Discovery

An interactive, modern full-stack web application built with **Next.js (App Router)** and **Tailwind CSS** that lets you explore what’s trending on YouTube across the globe.

---

## ✨ Features

- **🌐 Interactive Country Picker**: Search through countries across the Americas, Europe, Asia, Africa, Middle East, and Oceania.
- **⚡ Random Country Teleport**: One-click surprise teleportation to discover foreign culture and trending feeds instantly.
- **🏷️ Category Filtering**: Filter by Music, Gaming, Tech & Science, News, Entertainment, Sports, and Comedy.
- **⏱️ Duration & Shorts Filter**: Switch seamlessly between All Videos, Standard Long-form, or YouTube Shorts (< 60s).
- **🎬 In-App Theater Player**: Watch any video directly inside the app with YouTube IFrame Player, views, likes, comments, channel info, and tags without losing your place.
- **⭐️ Local Bookmarks**: Save your favorite discoveries with 1-click bookmarks, persisted in your browser's `localStorage`.
- **🤖 AI Usage Toggle (On/Off)**: A switch in the header lets you turn the use of AI on or off at any time. When enabled, the **AI Trend Insights** panel analyzes the current trending feed and produces a summary, top creators, and key observations — computed **entirely on-device** in your browser, with no data leaving your machine. Turning AI off instantly hides and disables all AI features, and your choice is remembered in `localStorage`.
- **🚀 Server-side Caching & Mock Fallback**: 
  - Automatically caches YouTube API responses (1-hour TTL) to stay well within Google's free 10,000 units/day quota.
  - Runs in **Demo / Mock Mode** out of the box with realistic country feeds if no API key is configured.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **API**: YouTube Data API v3 (`videos.list` with `chart=mostPopular`)
- **Caching**: Server-side in-memory cache with configurable TTL

---

## 🚀 Getting Started

### 1. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. (Optional) Connect Live YouTube Data API v3
To fetch live trending data directly from YouTube:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and enable the **YouTube Data API v3**.
3. Generate an API Key under **Credentials**.
4. Create a `.env.local` file in the root directory:
```env
YOUTUBE_API_KEY=AIzaSy...
```
5. Restart the server. The app will immediately switch to **Live API** mode.

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
