'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { CountryBanner } from '@/components/CountryBanner';
import { CategoryFilter } from '@/components/CategoryFilter';
import { DurationFilterBar } from '@/components/DurationFilter';
import { VideoCard } from '@/components/VideoCard';
import { VideoPlayerModal } from '@/components/VideoPlayerModal';
import { CountryModal } from '@/components/CountryModal';
import { BookmarksDrawer } from '@/components/BookmarksDrawer';
import { InfoModal } from '@/components/InfoModal';
import { AiInsightsPanel } from '@/components/AiInsightsPanel';
import { COUNTRIES, getCountryByCode } from '@/data/countries';
import { YouTubeVideo, CountryInfo, DurationFilter, VideosApiResponse } from '@/types/youtube';
import { Loader2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

const BOOKMARKS_STORAGE_KEY = 'worldtube_saved_videos';
const LAST_COUNTRY_STORAGE_KEY = 'worldtube_last_country';
const AI_ENABLED_STORAGE_KEY = 'worldtube_ai_enabled';
const AI_ENABLED_DEFAULT = true;

export default function Home() {
  const [countryCode, setCountryCode] = useState<string>('US');
  const [countryInfo, setCountryInfo] = useState<CountryInfo>(getCountryByCode('US'));
  const [categoryId, setCategoryId] = useState<string>('0');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'views' | 'recent' | 'likes'>('views');

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState<boolean>(true);

  // Modals & Panels
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  // AI usage toggle - lets the user turn the use of AI on or off.
  // Persisted in localStorage; when off, AI features are hidden and never computed.
  const [aiEnabled, setAiEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return AI_ENABLED_DEFAULT;
    try {
      const saved = localStorage.getItem(AI_ENABLED_STORAGE_KEY);
      if (saved === null) return AI_ENABLED_DEFAULT;
      return saved === 'true';
    } catch {
      return AI_ENABLED_DEFAULT;
    }
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<YouTubeVideo[]>([]);

  // Initialize bookmarks & country from localStorage
  useEffect(() => {
    try {
      const savedCountry = localStorage.getItem(LAST_COUNTRY_STORAGE_KEY);
      if (savedCountry) {
        setCountryCode(savedCountry);
        setCountryInfo(getCountryByCode(savedCountry));
      }

      const savedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  // Persist AI usage preference and keep it in sync across browser tabs
  useEffect(() => {
    try {
      localStorage.setItem(AI_ENABLED_STORAGE_KEY, String(aiEnabled));
    } catch {
      // ignore localStorage errors
    }
  }, [aiEnabled]);

  useEffect(() => {
    const syncAiSetting = (event: StorageEvent) => {
      if (event.key !== AI_ENABLED_STORAGE_KEY) return;
      setAiEnabled(event.newValue !== 'false');
    };
    window.addEventListener('storage', syncAiSetting);
    return () => window.removeEventListener('storage', syncAiSetting);
  }, []);

  const handleToggleAi = () => setAiEnabled((prev) => !prev);

  // Fetch videos for country and category
  const loadVideos = useCallback(async (code: string, catId: string) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const res = await fetch(`/api/videos?country=${encodeURIComponent(code)}&categoryId=${encodeURIComponent(catId)}`);
      if (!res.ok) {
        throw new Error(`Failed to load videos: status ${res.status}`);
      }

      const data: VideosApiResponse = await res.json();
      setVideos(data.videos || []);
      setCountryInfo(data.country || getCountryByCode(code));
      setIsMock(Boolean(data.isMock));

      if (data.error) {
        setApiError(data.error);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown network error';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos(countryCode, categoryId);
  }, [countryCode, categoryId, loadVideos]);

  // Handle Country Selection
  const handleSelectCountry = (code: string) => {
    setCountryCode(code);
    setCountryInfo(getCountryByCode(code));
    setSearchFilter('');
    try {
      localStorage.setItem(LAST_COUNTRY_STORAGE_KEY, code);
    } catch {}
  };

  // Handle Random Country Teleport
  const handleRandomCountry = () => {
    const available = COUNTRIES.filter((c) => c.code.toUpperCase() !== countryCode.toUpperCase());
    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex] || COUNTRIES[0];
    handleSelectCountry(chosen.code);
  };

  // Bookmark toggling
  const handleToggleBookmark = (video: YouTubeVideo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === video.id);
      let updated: YouTubeVideo[];
      if (exists) {
        updated = prev.filter((b) => b.id !== video.id);
      } else {
        updated = [video, ...prev];
      }
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearBookmarks = () => {
    if (window.confirm('Are you sure you want to remove all saved videos?')) {
      setBookmarks([]);
      try {
        localStorage.removeItem(BOOKMARKS_STORAGE_KEY);
      } catch {}
    }
  };

  // Filter & sort videos
  const filteredVideos = useMemo(() => {
    let result = [...videos];

    // Duration filter
    if (durationFilter === 'shorts') {
      result = result.filter((v) => v.isShort);
    } else if (durationFilter === 'standard') {
      result = result.filter((v) => !v.isShort);
    }

    // Search filter
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channelTitle.toLowerCase().includes(q) ||
          (v.tags && v.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sortBy === 'views') {
      result.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === 'likes') {
      result.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
    }

    return result;
  }, [videos, durationFilter, searchFilter, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Navigation */}
      <Header
        currentCountry={countryInfo}
        onOpenCountryPicker={() => setIsCountryPickerOpen(true)}
        onRandomCountry={handleRandomCountry}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarksCount={bookmarks.length}
        isMock={isMock}
        onOpenInfo={() => setIsInfoOpen(true)}
        aiEnabled={aiEnabled}
        onToggleAi={handleToggleAi}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
        {/* Country Hero Header */}
        <CountryBanner
          country={countryInfo}
          onOpenPicker={() => setIsCountryPickerOpen(true)}
          onRandomCountry={handleRandomCountry}
          totalVideos={filteredVideos.length}
          categoryLabel={categoryId === '0' ? 'All' : 'Filtered'}
        />

        {/* Notice banner if there's a minor warning or mock info */}
        {apiError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs sm:text-sm text-amber-300">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block">Using Simulated Demo Data</span>
              <p className="text-zinc-300 text-xs mt-0.5">{apiError}</p>
            </div>
            <button
              onClick={() => setIsInfoOpen(true)}
              className="text-xs text-amber-400 font-semibold underline hover:text-amber-300"
            >
              Learn More
            </button>
          </div>
        )}

        {/* Category Horizontal Pills */}
        <div className="mb-4">
          <CategoryFilter
            selectedCategoryId={categoryId}
            onSelectCategory={(id) => setCategoryId(id)}
          />
        </div>

        {/* Duration Filter, Instant Search & Sorter */}
        <DurationFilterBar
          durationFilter={durationFilter}
          onChangeDuration={(filter) => setDurationFilter(filter)}
          searchFilter={searchFilter}
          onChangeSearch={(val) => setSearchFilter(val)}
          sortBy={sortBy}
          onChangeSort={(val) => setSortBy(val)}
          resultsCount={filteredVideos.length}
        />

        {/* AI Trend Insights - only shown while AI usage is enabled */}
        {aiEnabled && (
          <AiInsightsPanel videos={videos} country={countryInfo} />
        )}

        {/* Videos Grid / States */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-12">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-3 flex flex-col space-y-3 animate-pulse"
              >
                <div className="aspect-video w-full rounded-xl bg-zinc-800" />
                <div className="h-4 bg-zinc-800 rounded w-5/6" />
                <div className="h-3 bg-zinc-800/80 rounded w-1/2" />
                <div className="h-3 bg-zinc-800/60 rounded w-1/3 pt-2" />
              </div>
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id + video.title}
                video={video}
                onPlay={(v) => setActiveVideo(v)}
                isBookmarked={bookmarks.some((b) => b.id === video.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center rounded-3xl bg-zinc-900/40 border border-zinc-800/60 p-6">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-2xl mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white">No trending videos match your criteria</h3>
            <p className="text-sm text-zinc-400 max-w-sm mt-1">
              Try switching your duration filter, resetting the search, or checking another category.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setDurationFilter('all');
                  setSearchFilter('');
                  setCategoryId('0');
                }}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => loadVideos(countryCode, categoryId)}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Feed</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-800/80 bg-zinc-950 py-8 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🌍</span>
            <span className="font-semibold text-zinc-300">WorldTube Content Discovery</span>
            <span>• Explore foreign trends effortlessly</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <button
              onClick={() => setIsInfoOpen(true)}
              className="hover:text-white transition cursor-pointer"
            >
              API &amp; Architecture
            </button>
            <span>•</span>
            <button
              onClick={() => setIsCountryPickerOpen(true)}
              className="hover:text-white transition cursor-pointer"
            >
              Explore Countries
            </button>
            <span>•</span>
            <button
              onClick={handleRandomCountry}
              className="hover:text-red-400 transition cursor-pointer"
            >
              Random Country
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <VideoPlayerModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        isBookmarked={activeVideo ? bookmarks.some((b) => b.id === activeVideo.id) : false}
        onToggleBookmark={(v) => handleToggleBookmark(v)}
      />

      <CountryModal
        isOpen={isCountryPickerOpen}
        onClose={() => setIsCountryPickerOpen(false)}
        currentCode={countryCode}
        onSelectCountry={handleSelectCountry}
        onRandomCountry={handleRandomCountry}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onPlayVideo={(v) => setActiveVideo(v)}
        onRemoveBookmark={handleRemoveBookmark}
        onClearBookmarks={handleClearBookmarks}
      />

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        isMock={isMock}
      />
    </div>
  );
}
