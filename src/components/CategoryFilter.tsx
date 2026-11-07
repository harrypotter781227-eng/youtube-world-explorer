'use client';

import React from 'react';
import { VIDEO_CATEGORIES } from '@/data/categories';
import { Flame, Music, Gamepad2, Tv, Newspaper, Laptop, Trophy, Laugh, Film, Sparkles, BookOpen } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  '0': <Flame className="w-3.5 h-3.5 text-amber-500" />,
  '10': <Music className="w-3.5 h-3.5 text-pink-400" />,
  '20': <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />,
  '24': <Tv className="w-3.5 h-3.5 text-indigo-400" />,
  '25': <Newspaper className="w-3.5 h-3.5 text-blue-400" />,
  '28': <Laptop className="w-3.5 h-3.5 text-emerald-400" />,
  '17': <Trophy className="w-3.5 h-3.5 text-yellow-400" />,
  '23': <Laugh className="w-3.5 h-3.5 text-orange-400" />,
  '1': <Film className="w-3.5 h-3.5 text-red-400" />,
  '26': <Sparkles className="w-3.5 h-3.5 text-teal-400" />,
  '27': <BookOpen className="w-3.5 h-3.5 text-sky-400" />,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
      {VIDEO_CATEGORIES.map((cat) => {
        const isActive = cat.id === selectedCategoryId;
        const icon = CATEGORY_ICONS[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer select-none flex-shrink-0 active:scale-95 ${
              isActive
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-md shadow-white/10'
                : 'bg-zinc-900/90 text-zinc-400 active:text-zinc-100 active:bg-zinc-800 border border-zinc-800/80'
            }`}
          >
            {icon}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
