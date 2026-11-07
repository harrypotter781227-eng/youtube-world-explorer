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
  return (
    <div
      onClick={() => onPlay(video)}
      className="group flex flex-col bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-zinc-700/90 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Play Overlay Icon on Hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Duration / Shorts Tag */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          {video.isShort ? (
            <span className="flex items-center gap-1 bg-red-600/95 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              <Zap className="w-3 h-3 fill-current" />
              SHORTS
            </span>
          ) : (
            <span className="bg-black/85 text-zinc-100 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md shadow-sm">
              {video.duration}
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => onToggleBookmark(video, e)}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition ${
            isBookmarked
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 opacity-80 group-hover:opacity-100'
          }`}
          title={isBookmarked ? 'Remove from saved' : 'Save video'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Country Flag Badge on top-left */}
        <div className="absolute top-2.5 left-2.5 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs font-mono text-zinc-300">
          {video.countryCode}
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="font-semibold text-sm text-zinc-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug"
            title={video.title}
          >
            {video.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-400">
            <span className="font-medium text-zinc-300 truncate max-w-[200px]">
              {video.channelTitle}
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
          </div>
        </div>

        {/* Footer: Views & Relative Time */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-3 pt-2.5 border-t border-zinc-800/60">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{formatViewCount(video.viewCount)}</span>
          </div>
          <span>{formatRelativeTime(video.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
};

