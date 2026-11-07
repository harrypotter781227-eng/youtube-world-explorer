'use client';

import React from 'react';
import { YouTubeVideo } from '@/types/youtube';
import { X, Trash2, Play, BookmarkX, ExternalLink } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: YouTubeVideo[];
  onPlayVideo: (video: YouTubeVideo) => void;
  onRemoveBookmark: (id: string) => void;
  onClearBookmarks: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onPlayVideo,
  onRemoveBookmark,
  onClearBookmarks,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐️</span>
            <div>
              <h2 className="text-base font-bold text-white">Saved Videos</h2>
              <p className="text-xs text-zinc-400">
                {bookmarks.length} {bookmarks.length === 1 ? 'video' : 'videos'} saved locally
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bookmarks.length > 0 && (
              <button
                onClick={onClearBookmarks}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition text-xs flex items-center gap-1"
                title="Clear all bookmarks"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {bookmarks.map((video) => (
            <div
              key={video.id}
              className="group flex gap-3 p-2.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 transition"
            >
              {/* Thumbnail with quick play button */}
              <div
                onClick={() => {
                  onPlayVideo(video);
                  onClose();
                }}
                className="relative aspect-video w-28 rounded-lg overflow-hidden bg-zinc-950 flex-shrink-0 cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play className="w-5 h-5 text-white fill-current" />
                </div>
                <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-mono px-1 py-0.2 rounded text-zinc-200">
                  {video.duration}
                </span>
                <span className="absolute top-1 left-1 bg-black/70 text-[9px] font-mono px-1 py-0.2 rounded text-zinc-300">
                  {video.countryCode}
                </span>
              </div>

              {/* Info & Actions */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4
                    onClick={() => {
                      onPlayVideo(video);
                      onClose();
                    }}
                    className="text-xs font-semibold text-zinc-200 hover:text-red-400 transition line-clamp-2 cursor-pointer leading-snug"
                  >
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {video.channelTitle}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-zinc-800/60">
                  <button
                    onClick={() => {
                      onPlayVideo(video);
                      onClose();
                    }}
                    className="text-[11px] font-medium text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-current" /> Watch
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(video.id)}
                    className="text-[11px] text-zinc-500 hover:text-red-400 transition p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {bookmarks.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-3 text-2xl">
                🔖
              </div>
              <h3 className="font-semibold text-zinc-300 text-sm">No saved videos yet</h3>
              <p className="text-xs text-zinc-500 max-w-xs mt-1">
                Click the bookmark icon on any trending video to save it for easy access later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

