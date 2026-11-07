'use client';

import React from 'react';
import { X, Key, ShieldCheck, Database, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMock: boolean;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  isMock,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-xl shadow-lg shadow-red-500/20">
              🧭
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">About WorldTube Explorer</h3>
              <p className="text-xs text-zinc-400">Architecture, API keys & Quota handling</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status Badge */}
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 ${
            isMock
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
          }`}
        >
          {isMock ? (
            <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-1">
            <span className="font-semibold block text-sm">
              {isMock ? 'Running in Offline / Demo Mode' : 'Connected to YouTube Data API v3'}
            </span>
            <p className="text-zinc-300">
              {isMock
                ? 'App is operating with pre-computed realistic trending datasets for all countries so you can test features seamlessly.'
                : 'Live trending data is actively fetched from Google YouTube Data API v3 with caching enabled.'}
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-3 text-xs text-zinc-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <Key className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Using Your Own API Key</span>
              <p className="text-zinc-400 mt-0.5">
                Create a free API key at <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-red-400 underline">Google Cloud Console</a>, enable <em>YouTube Data API v3</em>, and add it to your <code>.env.local</code>:
              </p>
              <pre className="mt-1.5 p-2 bg-black/60 rounded-lg font-mono text-[11px] text-zinc-300 select-all">
                YOUTUBE_API_KEY=your_api_key_here
              </pre>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <Database className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Smart Server-side Quota Caching</span>
              <p className="text-zinc-400 mt-0.5">
                Responses are cached for 1 hour per country and category combination, staying well within the free 10,000 units/day quota.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Local Privacy</span>
              <p className="text-zinc-400 mt-0.5">
                Bookmarks and favorite country preferences remain 100% inside your browser localStorage.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

