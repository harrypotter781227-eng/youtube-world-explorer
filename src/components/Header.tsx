'use client';

import React from 'react';
import { Globe, Shuffle, Bookmark, Info, Sparkles } from 'lucide-react';
import { CountryInfo } from '@/types/youtube';
import { AiToggle } from '@/components/AiToggle';

interface HeaderProps {
  currentCountry: CountryInfo;
  onOpenCountryPicker: () => void;
  onRandomCountry: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  isMock: boolean;
  onOpenInfo: () => void;
  aiEnabled: boolean;
  onToggleAi: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCountry,
  onOpenCountryPicker,
  onRandomCountry,
  onOpenBookmarks,
  bookmarksCount,
  isMock,
  onOpenInfo,
  aiEnabled,
  onToggleAi,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-3 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-md shadow-red-600/20 flex-shrink-0">
            <div className="w-full h-full bg-zinc-950 rounded-[9px] flex items-center justify-center text-base sm:text-lg">
              🌍
            </div>
          </div>
          <div className="hidden xs:block">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">WorldTube</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-red-600 text-white">
                LIVE
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Current Country Pill Selector */}
          <button
            onClick={onOpenCountryPicker}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-900 active:bg-zinc-800 text-zinc-100 border border-zinc-700/80 transition text-xs sm:text-sm font-medium shadow-sm"
            title="Change Country"
          >
            <span className="text-base sm:text-lg leading-none">{currentCountry.flag}</span>
            <span className="max-w-[80px] xs:max-w-[110px] sm:max-w-[160px] truncate">{currentCountry.name}</span>
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {/* Random / Teleport Country */}
          <button
            onClick={onRandomCountry}
            className="flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-full bg-red-600/15 active:bg-red-600/30 text-red-400 border border-red-500/30 transition text-xs sm:text-sm font-medium"
            title="Teleport to Random Country"
          >
            <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline ml-1.5">Teleport</span>
          </button>

          {/* Bookmarks Toggle */}
          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-full bg-zinc-900 active:bg-zinc-800 text-zinc-200 border border-zinc-700/80 transition text-xs sm:text-sm font-medium"
            title="Saved Videos"
          >
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span className="hidden sm:inline ml-1.5">Saved</span>
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:static sm:ml-1.5 min-w-[16px] h-4 px-1 bg-amber-500 text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* AI Usage Toggle - lets the user turn AI features on or off */}
          <AiToggle aiEnabled={aiEnabled} onToggle={onToggleAi} />

          {/* Mode / Info Pill */}
          <button
            onClick={onOpenInfo}
            className={`w-8 h-8 sm:w-auto sm:px-2.5 sm:py-1.5 rounded-full border text-xs transition flex items-center justify-center gap-1 ${
              isMock
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}
            title="API & Settings"
          >
            {isMock ? (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-xs font-medium">Demo</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden lg:inline text-xs font-medium">Live</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
