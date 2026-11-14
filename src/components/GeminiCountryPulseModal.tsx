'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CountryInfo, YouTubeVideo } from '@/types/youtube';
import { CountryPulseInsights } from '@/types/gemini';
import {
  Sparkles,
  X,
  Compass,
  RefreshCw,
  TrendingUp,
  Lightbulb,
  Radio,
  Loader2,
  Share2,
  Check,
} from 'lucide-react';

interface GeminiCountryPulseModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: CountryInfo;
  videos: YouTubeVideo[];
  onTeleportRandom: () => void;
}

export const GeminiCountryPulseModal: React.FC<GeminiCountryPulseModalProps> = ({
  isOpen,
  onClose,
  country,
  videos,
  onTeleportRandom,
}) => {
  const [pulse, setPulse] = useState<CountryPulseInsights | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const fetchPulse = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const titles = videos.map((v) => v.title).slice(0, 15);
      const res = await fetch('/api/gemini/pulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countryCode: country.code,
          titles,
          forceRefresh,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to load country pulse: ${res.statusText}`);
      }

      const data = await res.json();
      setPulse(data.pulse);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching country pulse';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [country.code, videos]);

  useEffect(() => {
    if (isOpen) {
      fetchPulse();
    }
  }, [isOpen, fetchPulse]);

  if (!isOpen) return null;

  const handleShare = () => {
    if (!pulse) return;
    const text = `🌍 ${pulse.countryName} Cultural Pulse by Gemini AI:\n"${pulse.zeitgeistHeadline}"\n\nExplore world trends on WorldTube!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-zinc-950 border border-violet-500/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-gradient-to-r from-violet-950/60 via-zinc-900 to-zinc-900">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl leading-none">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {country.name} Cultural Pulse
                </h2>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold">
                  gemini-4-hydrogen
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                National YouTube Zeitgeist & Cultural Synthesis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white active:bg-zinc-800 transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-4">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-violet-950/60 border border-violet-500/40 flex items-center justify-center text-violet-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-200">
                  Synthesizing {country.name}&apos;s cultural mood...
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Gemini is analyzing top trending titles, hashtags, and regional patterns
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
              {error}
            </div>
          ) : pulse ? (
            <>
              {/* Zeitgeist Headline Banner */}
              <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-violet-900/40 via-fuchsia-900/20 to-zinc-900 border border-violet-500/30 shadow-lg">
                <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold mb-1 uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                  <span>National Zeitgeist</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-white leading-snug">
                  &ldquo;{pulse.zeitgeistHeadline}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  {pulse.pulseSummary}
                </p>
              </div>

              {/* Trending Cultural Themes */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Cultural Currents Driving {pulse.countryName}:</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {pulse.trendingThemes.map((theme, i) => (
                    <div
                      key={i}
                      className="p-3 sm:p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-violet-400 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                            {theme.title}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-zinc-800 text-zinc-400 font-medium">
                            {theme.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {theme.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Takeaway for Travelers & Explorers */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    Cultural Takeaway for Explorers
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {pulse.culturalTakeaway}
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-3 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchPulse(true)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-200 text-xs font-medium transition"
              title="Refresh Pulse"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">Refresh</span>
            </button>

            <button
              onClick={handleShare}
              disabled={!pulse}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-200 text-xs font-medium transition"
              title="Copy Summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onTeleportRandom();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-semibold shadow-md shadow-red-600/20 transition cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Teleport Away</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
