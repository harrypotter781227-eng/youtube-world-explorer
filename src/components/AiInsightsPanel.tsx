'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { YouTubeVideo, CountryInfo } from '@/types/youtube';
import { generateFeedInsights, FeedInsights } from '@/lib/ai';
import { formatViewCount } from '@/lib/youtube';
import { Sparkles, Flame, Zap, TrendingUp, Lightbulb, Cpu, Loader2 } from 'lucide-react';

interface AiInsightsPanelProps {
  videos: YouTubeVideo[];
  country: CountryInfo;
}

const HIGHLIGHT_ICONS = {
  flame: Flame,
  bolt: Zap,
  trending: TrendingUp,
  spark: Lightbulb,
} as const;

export const AiInsightsPanel: React.FC<AiInsightsPanelProps> = ({ videos, country }) => {
  // Remount the analysis view whenever the underlying feed changes, so the
  // brief "analyzing" phase and timestamp restart without synchronous
  // setState in an effect.
  const feedFingerprint = `${country.code}:${videos.length}:${videos[0]?.id ?? ''}`;

  return (
    <section
      className="mb-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900/60 to-zinc-900/60 p-4 sm:p-5 shadow-lg shadow-emerald-500/5"
      aria-label="AI trend insights"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
              AI Trend Insights
            </h3>
            <p className="text-[10px] sm:text-[11px] text-emerald-300/70 flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              Generated on-device • No data leaves this browser
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300/80 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI Active
        </span>
      </div>

      <AiInsightsContent key={feedFingerprint} videos={videos} country={country} />
    </section>
  );
};

/**
 * Inner content view. Remounting via `key` restarts the analysis phase; the
 * timestamp is captured via a lazy state initializer so it only resolves in the
 * browser (keeping server prerendering deterministic).
 */
const AiInsightsContent: React.FC<{ videos: YouTubeVideo[]; country: CountryInfo }> = ({
  videos,
  country,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [generatedAt] = useState(() =>
    typeof window === 'undefined' ? '' : new Date().toISOString(),
  );

  const insights: FeedInsights = useMemo(
    () => generateFeedInsights(videos, country, generatedAt),
    [videos, country, generatedAt],
  );

  // Brief analysis phase so the panel feels like real AI processing; the
  // computation itself happens instantly and on-device.
  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 550);
    return () => clearTimeout(timer);
  }, []);

  if (isAnalyzing) {
    return (
      <div className="space-y-3" aria-busy="true" aria-live="polite">
        <div className="h-4 bg-zinc-800/70 rounded w-full animate-pulse" />
        <div className="h-4 bg-zinc-800/50 rounded w-4/5 animate-pulse" />
        <div className="h-20 bg-zinc-800/50 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-200">
        {insights.summary}
      </p>

      {/* Top channels */}
      {insights.topChannels.length > 0 && (
        <div>
          <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 mb-2">
            Top Creators Detected
          </h4>
          <ul className="space-y-1.5">
            {insights.topChannels.map((channel, index) => (
              <li
                key={channel.channelTitle}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-950/50 border border-zinc-800/70"
              >
                <span className="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {channel.channelTitle}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate" title={channel.topVideoTitle}>
                    {channel.topVideoTitle}
                  </p>
                </div>
                <span className="text-[10px] text-zinc-400 whitespace-nowrap">
                  {channel.videoCount} video{channel.videoCount > 1 ? 's' : ''} •{' '}
                  {formatViewCount(channel.totalViews)} views
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Highlights */}
      {insights.highlights.length > 0 && (
        <div>
          <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 mb-2">
            Key Observations
          </h4>
          <ul className="space-y-1.5">
            {insights.highlights.map((highlight, index) => {
              const Icon = HIGHLIGHT_ICONS[highlight.icon];
              return (
                <li
                  key={index}
                  className="flex items-start gap-2 p-2 rounded-xl bg-zinc-950/50 border border-zinc-800/70"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs text-zinc-300 leading-snug">
                    {highlight.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Generated timestamp */}
      {generatedAt && (
        <p className="text-[10px] text-zinc-500 flex items-center gap-1">
          <Loader2 className="w-3 h-3 opacity-50" />
          AI analysis refreshed{' '}
          {new Date(generatedAt).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      )}
    </div>
  );
};
