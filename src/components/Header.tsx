'use client';

import React from 'react';
import { Globe, Shuffle, Bookmark, Info, Sparkles } from 'lucide-react';
import { CountryInfo } from '@/types/youtube';

interface HeaderProps {
  currentCountry: CountryInfo;
  onOpenCountryPicker: () => void;
  onRandomCountry: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  isMock: boolean;
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCountry,
  onOpenCountryPicker,
  onRandomCountry,
  onOpenBookmarks,
  bookmarksCount,
  isMock,
  onOpenInfo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-red-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl">🌍</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">WorldTube</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                Explorer
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Discover what’s trending across the globe
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Current Country Pill Selector */}
          <button
            onClick={onOpenCountryPicker}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 transition shadow-sm text-sm font-medium group"
            title="Change Country"
          >
            <span className="text-lg leading-none">{currentCountry.flag}</span>
            <span className="max-w-[110px] sm:max-w-[160px] truncate">{currentCountry.name}</span>
            <Globe className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition" />
          </button>

          {/* Random / Teleport Country */}
          <button
            onClick={onRandomCountry}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 transition text-sm font-medium"
            title="Teleport to Random Country"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden md:inline">Teleport</span>
          </button>

          {/* Bookmarks Toggle */}
          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 transition text-sm font-medium"
            title="Saved Videos"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Saved</span>
            {bookmarksCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500 text-zinc-950 text-xs font-bold rounded-full">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Mode / Info Pill */}
          <button
            onClick={onOpenInfo}
            className={`p-2 rounded-full border text-xs transition flex items-center gap-1 ${
              isMock
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            }`}
            title="API Status & Settings"
          >
            {isMock ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="hidden lg:inline text-xs font-medium">Demo Mode</span>
              </>
            ) : (
              <>
                <Info className="w-4 h-4" />
                <span className="hidden lg:inline text-xs font-medium">Live API</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

