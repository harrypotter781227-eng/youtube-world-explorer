'use client';

import React, { useState } from 'react';
import { YouTubeVideo } from '@/types/youtube';
import { formatViewCount, formatRelativeTime } from '@/lib/youtube';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-2 overflow-hidden mr-4">
            <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-zinc-800 text-zinc-300">
              {video.countryCode}
            </span>
            <span className="text-sm font-semibold text-zinc-200 truncate">
              {video.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition flex-shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {/* Responsive 16:9 Player Container */}
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Details & Controls */}
          <div className="p-4 sm:p-6 space-y-5">
            {/* Title & Action Buttons */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {video.isShort && (
                    <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      <Zap className="w-3 h-3 fill-current" /> SHORTS
                    </span>
                  )}
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {video.title}
                  </h2>
                </div>
                <p className="text-sm text-zinc-400 font-medium">
                  {video.channelTitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => onToggleBookmark(video)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition ${
                    isBookmarked
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-medium transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Copied Link!' : 'Share'}</span>
                </button>

                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open on YouTube</span>
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Eye className="w-4 h-4 text-zinc-500" />
                <div>
                  <span className="block text-[10px] text-zinc-500">Views</span>
                  <span className="font-semibold">{formatViewCount(video.viewCount)}</span>
                </div>
              </div>

              {video.likeCount !== undefined && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <ThumbsUp className="w-4 h-4 text-zinc-500" />
                  <div>
                    <span className="block text-[10px] text-zinc-500">Likes</span>
                    <span className="font-semibold">{video.likeCount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {video.commentCount !== undefined && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <MessageSquare className="w-4 h-4 text-zinc-500" />
                  <div>
                    <span className="block text-[10px] text-zinc-500">Comments</span>
                    <span className="font-semibold">{video.commentCount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <div>
                  <span className="block text-[10px] text-zinc-500">Published</span>
                  <span className="font-semibold">{formatRelativeTime(video.publishedAt)}</span>
                </div>
              </div>
            </div>

            {/* Tags if available */}
            {video.tags && video.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {video.tags.slice(0, 8).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description Accordion */}
            {video.description && (
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
                <p
                  className={`text-xs sm:text-sm text-zinc-300 whitespace-pre-line leading-relaxed ${
                    !showFullDesc ? 'line-clamp-3' : ''
                  }`}
                >
                  {video.description}
                </p>
                {video.description.length > 180 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 mt-2 block"
                  >
                    {showFullDesc ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

