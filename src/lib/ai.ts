import { YouTubeVideo, CountryInfo } from '@/types/youtube';
import { VIDEO_CATEGORIES } from '@/data/categories';

/**
 * Local, on-device "AI" analysis engine.
 *
 * All insights are computed deterministically inside the browser from the
 * current trending feed — no network requests, no external AI service, and
 * nothing leaves the user's device. This module is only ever invoked when the
 * user has explicitly enabled AI usage (see the AI toggle in the header).
 */

export interface AiChannelInsight {
  channelTitle: string;
  videoCount: number;
  totalViews: number;
  topVideoTitle: string;
}

export interface AiCategoryInsight {
  categoryId: string;
  label: string;
  videoCount: number;
  share: number; // percentage 0-100
}

export interface AiHighlight {
  icon: 'flame' | 'bolt' | 'spark' | 'trending';
  text: string;
}

export interface FeedInsights {
  summary: string;
  topChannels: AiChannelInsight[];
  categoryBreakdown: AiCategoryInsight[];
  highlights: AiHighlight[];
  generatedAt: string;
}

const categoryLabelById = new Map(VIDEO_CATEGORIES.map((c) => [c.id, c.label]));

export function categoryLabel(categoryId: string): string {
  return categoryLabelById.get(categoryId) || `Category ${categoryId}`;
}

/**
 * Analyze a trending feed and produce a human-readable AI insight report.
 *
 * `generatedAt` is injected by the caller (computed in the browser only) so the
 * function stays deterministic and safe to run during static prerendering.
 */
export function generateFeedInsights(
  videos: YouTubeVideo[],
  country: CountryInfo,
  generatedAt = '',
): FeedInsights {

  if (!videos.length) {
    return {
      summary: `There isn't enough trending data for ${country.name} right now to generate AI insights. Try another category or country.`,
      topChannels: [],
      categoryBreakdown: [],
      highlights: [],
      generatedAt,
    };
  }

  const totalViews = videos.reduce((sum, v) => sum + (v.viewCount || 0), 0);
  const avgViews = Math.round(totalViews / videos.length);
  const shortsCount = videos.filter((v) => v.isShort).length;

  // --- Top channels (per-channel stats, then rank by total reach) -------
  const channelMap = new Map<
    string,
    { videoCount: number; totalViews: number; topVideoTitle: string; topVideoViews: number }
  >();

  for (const video of videos) {
    const key = video.channelTitle || 'Unknown Channel';
    const existing = channelMap.get(key);
    if (existing) {
      existing.videoCount += 1;
      existing.totalViews += video.viewCount || 0;
      if ((video.viewCount || 0) > existing.topVideoViews) {
        existing.topVideoTitle = video.title;
        existing.topVideoViews = video.viewCount || 0;
      }
    } else {
      channelMap.set(key, {
        videoCount: 1,
        totalViews: video.viewCount || 0,
        topVideoTitle: video.title,
        topVideoViews: video.viewCount || 0,
      });
    }
  }

  const topChannels: AiChannelInsight[] = [...channelMap.entries()]
    .map(([channelTitle, stats]) => ({ channelTitle, ...stats }))
    .sort((a, b) => b.totalViews - a.totalViews || b.videoCount - a.videoCount)
    .slice(0, 3)
    .map(({ channelTitle, videoCount, totalViews, topVideoTitle }) => ({
      channelTitle,
      videoCount,
      totalViews,
      topVideoTitle,
    }));

  // --- Category breakdown ----------------------------------------------
  const categoryCounts = new Map<string, number>();
  for (const video of videos) {
    const key = video.categoryId || '0';
    categoryCounts.set(key, (categoryCounts.get(key) || 0) + 1);
  }
  const categoryBreakdown: AiCategoryInsight[] = [...categoryCounts.entries()]
    .map(([id, count]) => ({
      categoryId: id,
      label: categoryLabel(id),
      videoCount: count,
      share: Math.round((count / videos.length) * 100),
    }))
    .sort((a, b) => b.videoCount - a.videoCount);

  // --- Highlights ------------------------------------------------------
  const topVideo = [...videos].sort((a, b) => b.viewCount - a.viewCount)[0];
  const topShort = videos.find((v) => v.isShort) || null;
  const dominantCategory = categoryBreakdown[0];
  const formattedAvg = avgViews.toLocaleString('en-US');

  const highlights: AiHighlight[] = [
    {
      icon: 'flame',
      text: `The #1 trending video is "${topVideo.title}" by ${topVideo.channelTitle} with ${topVideo.viewCount.toLocaleString('en-US')} views.`,
    },
  ];
  if (topShort) {
    highlights.push({
      icon: 'bolt',
      text: `${shortsCount} of ${videos.length} trending items are YouTube Shorts — "${topShort.title}" is the standout short.`,
    });
  }
  if (dominantCategory) {
    highlights.push({
      icon: 'trending',
      text: `${dominantCategory.label} dominates the feed right now, accounting for ${dominantCategory.share}% of trending content.`,
    });
  }
  highlights.push({
    icon: 'spark',
    text: `Creators in ${country.name} are averaging roughly ${formattedAvg} views per trending video — a healthy engagement signal for the region.`,
  });

  // --- Summary ---------------------------------------------------------
  const channelNames = topChannels.map((c) => c.channelTitle).join(', ');
  const summary =
    `AI analysis of ${videos.length} trending videos from ${country.name} ` +
    `(${country.flag}) shows a feed averaging ${formattedAvg} views per video. ` +
    `The most consistent creators are ${channelNames}. ` +
    `The content mix is led by ${dominantCategory?.label ?? 'general'} content, ` +
    `with ${shortsCount} short-form clips keeping the pace fast and discovery-driven.`;

  return {
    summary,
    topChannels,
    categoryBreakdown,
    highlights,
    generatedAt,
  };
}
