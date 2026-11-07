'use client';

import React from 'react';
import { CountryInfo } from '@/types/youtube';
import { Globe, MapPin, Shuffle, Sparkles, TrendingUp } from 'lucide-react';

interface CountryBannerProps {
  country: CountryInfo;
  onOpenPicker: () => void;
  onRandomCountry: () => void;
  totalVideos: number;
  categoryLabel: string;
}

export const CountryBanner: React.FC<CountryBannerProps> = ({
  country,
  onOpenPicker,
  onRandomCountry,
  totalVideos,
  categoryLabel,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 md:p-8 mb-6 shadow-xl">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: Flag, Title, Region */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenPicker}
            className="group relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 flex items-center justify-center text-4xl sm:text-5xl shadow-inner transition transform hover:scale-105 cursor-pointer"
            title="Click to change country"
          >
            <span>{country.flag}</span>
            <span className="absolute -bottom-2 -right-2 bg-zinc-900 text-zinc-300 text-[10px] font-mono px-1.5 py-0.5 rounded-md border border-zinc-700">
              {country.code}
            </span>
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Trending Feed
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                {country.region}
              </span>
              {country.capital && (
                <span className="text-xs text-zinc-400 hidden sm:flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {country.capital}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{country.name}</span>
            </h1>

            {country.trendingTopics && country.trendingTopics.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-[11px] text-zinc-400 font-medium">Popular:</span>
                {country.trendingTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/50 transition"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Teleport & Explorer Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto justify-end">
          <button
            onClick={onOpenPicker}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-xs sm:text-sm border border-zinc-700 transition"
          >
            <Globe className="w-4 h-4 text-zinc-400" />
            <span>Change Country</span>
          </button>

          <button
            onClick={onRandomCountry}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/25 transition cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>Teleport Anywhere</span>
          </button>
        </div>
      </div>
    </div>
  );
};

