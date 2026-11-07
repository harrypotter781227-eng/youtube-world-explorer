'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Shuffle, Check, MapPin, Sparkles } from 'lucide-react';
import { COUNTRIES, REGIONS } from '@/data/countries';
import { CountryInfo } from '@/types/youtube';

interface CountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCode: string;
  onSelectCountry: (code: string) => void;
  onRandomCountry: () => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({
  isOpen,
  onClose,
  currentCode,
  onSelectCountry,
  onRandomCountry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>('All');

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.capital && c.capital.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesRegion = activeRegion === 'All' || c.region === activeRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, activeRegion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl max-h-[88vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-xl">
              🌐
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Select a Country</h2>
              <p className="text-xs text-zinc-400">
                Choose from {COUNTRIES.length} regions or teleport to explore foreign feeds
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 sm:px-6 pb-2 border-b border-zinc-800/60 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by country, capital, or code (e.g. Japan, JP, Tokyo)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950/70 text-zinc-100 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700/80 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition placeholder:text-zinc-500"
              autoFocus
            />
          </div>

          <button
            onClick={() => {
              onRandomCountry();
              onClose();
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-sm font-semibold transition shadow-md shadow-red-600/20"
          >
            <Shuffle className="w-4 h-4" />
            <span>Random Teleport</span>
          </button>
        </div>

        {/* Region Filter Chips */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-zinc-800/60 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                activeRegion === region
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Country Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 scrollbar-thin">
          {filteredCountries.map((country: CountryInfo) => {
            const isSelected = country.code.toUpperCase() === currentCode.toUpperCase();
            return (
              <button
                key={country.code}
                onClick={() => {
                  onSelectCountry(country.code);
                  onClose();
                }}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition relative group ${
                  isSelected
                    ? 'bg-red-500/10 border-red-500/50 text-white shadow-sm shadow-red-500/10'
                    : 'bg-zinc-950/40 hover:bg-zinc-800/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <span className="text-3xl leading-none select-none">{country.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-sm truncate group-hover:text-white transition">
                      {country.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">
                      {country.code}
                    </span>
                  </div>

                  {country.capital && (
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <span className="truncate">{country.capital}</span>
                    </div>
                  )}

                  {country.trendingTopics && country.trendingTopics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {country.trendingTopics.slice(0, 2).map((topic, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 font-normal"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}

          {filteredCountries.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No countries found matching &quot;{searchTerm}&quot;</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveRegion('All');
                }}
                className="mt-3 text-xs text-red-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 text-center text-xs text-zinc-500">
          Showing {filteredCountries.length} countries available for instant trending discovery
        </div>
      </div>
    </div>
  );
};

