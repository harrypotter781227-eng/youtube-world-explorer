'use client';

import React from 'react';
import { DurationFilter } from '@/types/youtube';
import { Video, Film, Zap, Search, ArrowUpDown } from 'lucide-react';

interface DurationFilterProps {
  durationFilter: DurationFilter;
  onChangeDuration: (filter: DurationFilter) => void;
  searchFilter: string;
  onChangeSearch: (val: string) => void;
  sortBy: 'views' | 'recent' | 'likes';
  onChangeSort: (val: 'views' | 'recent' | 'likes') => void;
  resultsCount: number;
}

export const DurationFilterBar: React.FC<DurationFilterProps> = ({
  durationFilter,
  onChangeDuration,
  searchFilter,
  onChangeSearch,
  sortBy,
  onChangeSort,
  resultsCount,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800/80 mb-6">
      {/* Left: Duration Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => onChangeDuration('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
            durationFilter === 'all'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>All Videos</span>
        </button>

        <button
          onClick={() => onChangeDuration('standard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
            durationFilter === 'standard'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Long-form</span>
        </button>

        <button
          onClick={() => onChangeDuration('shorts')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
            durationFilter === 'shorts'
              ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-red-400" />
          <span>Shorts (&lt;60s)</span>
        </button>
      </div>

      {/* Right: Quick Search in results & Sort */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1 md:w-56">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Filter trending list..."
            value={searchFilter}
            onChange={(e) => onChangeSearch(e.target.value)}
            className="w-full bg-zinc-950/80 text-zinc-200 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-red-500 transition placeholder:text-zinc-600"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1.5 rounded-xl border border-zinc-800">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
          <select
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value as 'views' | 'recent' | 'likes')}
            className="bg-transparent text-xs text-zinc-300 focus:outline-none cursor-pointer"
          >
            <option value="views" className="bg-zinc-900 text-zinc-200">Most Viewed</option>
            <option value="recent" className="bg-zinc-900 text-zinc-200">Newest First</option>
            <option value="likes" className="bg-zinc-900 text-zinc-200">Most Liked</option>
          </select>
        </div>

        <span className="text-[11px] text-zinc-500 whitespace-nowrap hidden sm:inline">
          {resultsCount} {resultsCount === 1 ? 'item' : 'items'}
        </span>
      </div>
    </div>
  );
};

