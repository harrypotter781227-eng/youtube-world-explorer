'use client';

import React, { useState } from 'react';
import { YouTubeVideo } from '@/types/youtube';
import { formatViewCount, formatRelativeTime } from '@/lib/youtube';
import { GeminiVideoInsights } from '@/components/GeminiVideoInsights';
import {
  X,
  Bookmark,
  ExternalLink,
  Share2,
  ThumbsUp,
  MessageSquare,
  Eye,
  Calendar,
  Check,
  Zap,
} from 'lucide-react';

interface VideoPlayerModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (video: YouTubeVideo) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  if (!video) return null;

  const youtubeUrl = `https://www.youtube.com/watch?v=${video.id}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(youtubeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[92vh] bg-zinc-950 border-0 sm:border sm:border-zinc-800 rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar for Mobile */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-zinc-800/80 bg-zinc-900/80 flex-shrink-0">
          <div className="flex items-center gap-2 overflow-hidden mr-3">
            <span className="text-[11px] px-1.5 py-0.2 rounded font-mono font-medium bg-zinc-800 text-zinc-300">
              {video.countryCode}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-200 truncate">
              {video.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white active:bg-zinc-800 transition flex-shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Responsive 16:9 Player Container */}
          <div className="relative aspect-video w-full bg-black flex-shrink-0 shadow-lg">
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Details & Controls */}
          <div className="p-3.5 sm:p-6 space-y-4">
            {/* Title & Channel */}
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                {video.isShort && (
                  <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 fill-current" /> SHORTS
                  </span>
                )}
                <h2 className="text-sm sm:text-lg font-bold text-white leading-snug">
                  {video.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                {video.channelTitle}
              </p>
            </div>

            {/* Touch Action Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => onToggleBookmark(video)}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition active:scale-95 flex-shrink-0 ${
                  isBookmarked
                    ? 'bg-amber-500 text-zinc-950 font-semibold'
                    : 'bg-zinc-800 text-zinc-200 active:bg-zinc-700'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 active:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-medium transition active:scale-95 flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>

              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 active:bg-red-500 text-white text-xs sm:text-sm font-semibold transition active:scale-95 flex-shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 py-2.5 px-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] sm:text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Eye className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[10px] text-zinc-500">Views</span>
                  <span className="font-semibold truncate block">{formatViewCount(video.viewCount)}</span>
                </div>
              </div>

              {video.likeCount !== undefined && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <ThumbsUp className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] text-zinc-500">Likes</span>
                    <span className="font-semibold truncate block">{video.likeCount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {video.commentCount !== undefined && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] text-zinc-500">Comments</span>
                    <span className="font-semibold truncate block">{video.commentCount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[10px] text-zinc-500">Published</span>
                  <span className="font-semibold truncate block">{formatRelativeTime(video.publishedAt)}</span>
                </div>
              </div>
            </div>

            {/* Gemini Cultural Lens Explainer */}
            <GeminiVideoInsights video={video} />

            {/* Description Accordion */}
            {video.description && (
              <div className="p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                <p
                  className={`text-xs text-zinc-300 whitespace-pre-line leading-relaxed ${
                    !showFullDesc ? 'line-clamp-3' : ''
                  }`}
                >
                  {video.description}
                </p>
                {video.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 mt-2 block active:opacity-80"
                  >
                    {showFullDesc ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            )}

            {/* Tags */}
            {video.tags && video.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pb-2">
                {video.tags.slice(0, 8).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
