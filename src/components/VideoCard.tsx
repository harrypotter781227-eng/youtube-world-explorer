'use client';

import React from 'react';
import { YouTubeVideo } from '@/types/youtube';
import { formatViewCount, formatRelativeTime } from '@/lib/youtube';
import { Play, Bookmark, Zap, Eye, CheckCircle2 } from 'lucide-react';

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
  isBookmarked: boolean;
  onToggleBookmark: (video: YouTubeVideo, e: React.MouseEvent) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Generate channel initial for YouTube-style avatar
  const channelInitial = video.channelTitle ? video.channelTitle.charAt(0).toUpperCase() : 'Y';

  return (
    <div
      onClick={() => onPlay(video)}
      className="group flex flex-col bg-zinc-900/60 active:bg-zinc-800/90 sm:hover:bg-zinc-800/80 border border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-md"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
        />

        {/* Hover / Active Play Button Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Duration / Shorts Tag */}
        <div className="absolute bottom-2 right-2 z-10">
          {video.isShort ? (
            <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] sm:text-[11px] font-extrabold px-1.5 py-0.5 rounded shadow">
              <Zap className="w-3 h-3 fill-current" />
              SHORTS
            </span>
          ) : (
            <span className="bg-black/90 text-zinc-100 text-[10px] sm:text-[11px] font-mono font-medium px-1.5 py-0.5 rounded shadow">
              {video.duration}
            </span>
          )}
        </div>

        {/* Bookmark Button (Large thumb target) */}
        <button
          onClick={(e) => onToggleBookmark(video, e)}
          className={`absolute top-2 right-2 z-10 p-2 sm:p-2.5 rounded-full backdrop-blur-md transition active:scale-90 ${
            isBookmarked
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80'
          }`}
          title={isBookmarked ? 'Remove from saved' : 'Save video'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Country Flag Badge on top-left */}
        <div className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-mono text-zinc-200">
          {video.countryCode}
        </div>
      </div>

      {/* Video Info - Mobile App Layout */}
      <div className="p-3 sm:p-4 flex gap-3 items-start">
        {/* Channel Avatar Circle */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 flex-shrink-0 mt-0.5 border border-zinc-700/60">
          {channelInitial}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-xs sm:text-sm text-zinc-100 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors"
            title={video.title}
          >
            {video.title}
          </h3>

          <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-[11px] text-zinc-400 mt-1">
            <span className="truncate max-w-[140px] text-zinc-300 font-medium">
              {video.channelTitle}
            </span>
            <span>•</span>
            <span>{formatViewCount(video.viewCount)}</span>
            <span>•</span>
            <span>{formatRelativeTime(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
