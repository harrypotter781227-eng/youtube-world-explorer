'use client';

import React from 'react';
import { CountryInfo } from '@/types/youtube';
import { Globe, MapPin, Shuffle, TrendingUp, Sparkles } from 'lucide-react';

interface CountryBannerProps {
  country: CountryInfo;
  onOpenPicker: () => void;
  onRandomCountry: () => void;
  onOpenPulse: () => void;
  totalVideos: number;
  categoryLabel: string;
}

export const CountryBanner: React.FC<CountryBannerProps> = ({
  country,
  onOpenPicker,
  onRandomCountry,
  onOpenPulse,
  totalVideos,
  categoryLabel,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 sm:w-64 h-48 sm:h-64 bg-red-600/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-48 sm:w-64 h-48 sm:h-64 bg-amber-500/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        {/* Left: Flag, Title, Region */}
        <div className="flex items-center gap-3.5 sm:gap-6 w-full md:w-auto">
          <button
            onClick={onOpenPicker}
            className="group relative flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-zinc-800/90 active:bg-zinc-700 border border-zinc-700/60 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl shadow-inner transition active:scale-95 cursor-pointer"
            title="Click to change country"
          >
            <span>{country.flag}</span>
            <span className="absolute -bottom-1 -right-1 bg-zinc-900 text-zinc-300 text-[9px] sm:text-[10px] font-mono px-1 py-0.2 rounded border border-zinc-700">
              {country.code}
            </span>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold bg-red-500/15 text-red-400 border border-red-500/25 flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Trending
              </span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                {country.region}
              </span>
              {country.capital && (
                <span className="text-[11px] text-zinc-400 hidden xs:flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-zinc-500" />
                  <span className="truncate">{country.capital}</span>
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight truncate">
              {country.name}
            </h1>

            {country.trendingTopics && country.trendingTopics.length > 0 && (
              <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto no-scrollbar py-0.5">
                {country.trendingTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50 whitespace-nowrap flex-shrink-0"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Teleport, Country Pulse & Explorer Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={onOpenPulse}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 active:from-violet-500 active:to-fuchsia-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-600/25 transition cursor-pointer"
            title="Analyze National Zeitgeist with Gemini"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Country Pulse</span>
          </button>

          <button
            onClick={onOpenPicker}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-zinc-800 active:bg-zinc-700 text-zinc-100 font-medium text-xs sm:text-sm border border-zinc-700 transition"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>Select Country</span>
          </button>

          <button
            onClick={onRandomCountry}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 active:from-red-500 active:to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/20 transition cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Teleport</span>
          </button>
        </div>
      </div>
    </div>
  );
};
