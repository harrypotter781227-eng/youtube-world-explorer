'use client';

import React, { useState, useEffect, useRef } from 'react';
import { YouTubeVideo } from '@/types/youtube';
import { VideoCulturalInsights, VideoChatMessage } from '@/types/gemini';
import {
  Sparkles,
  Languages,
  TrendingUp,
  Globe,
  Users,
  Lightbulb,
  MessageSquare,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface GeminiVideoInsightsProps {
  video: YouTubeVideo;
}

export const GeminiVideoInsights: React.FC<GeminiVideoInsightsProps> = ({ video }) => {
  const [insights, setInsights] = useState<VideoCulturalInsights | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Chat State
  const [messages, setMessages] = useState<VideoChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [interactionId, setInteractionId] = useState<string | undefined>(undefined);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Fetch initial insights
  useEffect(() => {
    let isCancelled = false;

    const fetchInsights = async () => {
      setLoading(true);
      setError(null);
      setMessages([]);
      setInteractionId(undefined);

      try {
        const res = await fetch('/api/gemini/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoId: video.id,
            title: video.title,
            description: video.description || '',
            channelTitle: video.channelTitle,
            countryCode: video.countryCode || 'US',
            tags: video.tags || [],
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to generate insights: ${res.statusText}`);
        }

        const data = await res.json();
        if (!isCancelled) {
          setInsights(data.insights);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const msg = err instanceof Error ? err.message : 'Error loading cultural insights';
          setError(msg);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchInsights();

    return () => {
      isCancelled = true;
    };
  }, [video.id, video.title, video.countryCode, video.channelTitle, video.description, video.tags]);

  // Scroll chat into view on new message
  useEffect(() => {
    if (messages.length > 0) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAsking]);

  const handleAskQuestion = async (questionToAsk?: string) => {
    const question = (questionToAsk || inputQuestion).trim();
    if (!question || isAsking) return;

    setInputQuestion('');
    setMessages((prev) => [...prev, { role: 'user', content: question, timestamp: Date.now() }]);
    setIsAsking(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoTitle: video.title,
          countryName: insights?.countryName || video.countryCode || 'the region',
          channelTitle: video.channelTitle,
          userQuestion: question,
          previousInteractionId: interactionId,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to ask question');
      }

      const data = await res.json();
      setInteractionId(data.interactionId);
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: data.reply || 'No response', timestamp: Date.now() },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error in discussion';
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: `Sorry, could not answer: ${msg}`, timestamp: Date.now() },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const sampleQuestions = [
    `Why is this viral in ${insights?.countryName || 'this country'}?`,
    'Explain the local slang and cultural references',
    'Who is this creator and what is their background?',
  ];

  return (
    <div className="rounded-2xl bg-zinc-900/90 border border-violet-500/30 overflow-hidden shadow-xl shadow-purple-950/20 transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 bg-gradient-to-r from-violet-950/50 via-zinc-900 to-zinc-900 border-b border-violet-500/20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-0.5 flex items-center justify-center text-white shadow-sm shadow-violet-500/50">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Gemini Cultural Lens
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold">
                gemini-4-hydrogen
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden xs:block">
              AI Cultural Intelligence, Translation & Context
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {insights?.isMock && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Demo AI Mode
            </span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white active:bg-zinc-800 transition"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-3.5 sm:p-5 space-y-4">
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-violet-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs text-zinc-400 font-medium animate-pulse">
                Analyzing cultural context, regional slang, and translation with Gemini...
              </span>
            </div>
          ) : error ? (
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-800/50 text-red-300 text-xs">
              {error}
            </div>
          ) : insights ? (
            <>
              {/* Translation Card if foreign language */}
              {insights.originalLanguage && insights.originalLanguage !== 'English' && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-violet-300 text-xs font-semibold">
                    <Languages className="w-3.5 h-3.5" />
                    <span>Language: {insights.originalLanguage}</span>
                  </div>
                  {insights.translatedTitle && insights.translatedTitle !== video.title && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                        English Translation:
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-100 font-medium">
                        &ldquo;{insights.translatedTitle}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Main Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Cultural Context */}
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-fuchsia-400 font-semibold text-[11px] uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Cultural Context</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-[11px] sm:text-xs">
                    {insights.culturalContext}
                  </p>
                </div>

                {/* Why Trending */}
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Why It&apos;s Trending</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-[11px] sm:text-xs">
                    {insights.whyTrending}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                  Premise & Overview
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">{insights.summary}</p>
              </div>

              {/* Local Slang & Cultural Nuances */}
              {insights.localSlangOrNuance && insights.localSlangOrNuance.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    Local Slang, References & Nuances:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {insights.localSlangOrNuance.map((slang, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-200 border border-zinc-700/60 flex items-center gap-1"
                      >
                        💡 {slang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Audience & Fun Fact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                {insights.targetAudience && (
                  <div className="flex items-start gap-1.5 p-2.5 rounded-lg bg-zinc-900/60 text-zinc-400 border border-zinc-800/60">
                    <Users className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-zinc-300">Audience: </span>
                      {insights.targetAudience}
                    </div>
                  </div>
                )}
                {insights.funFact && (
                  <div className="flex items-start gap-1.5 p-2.5 rounded-lg bg-zinc-900/60 text-zinc-400 border border-zinc-800/60">
                    <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-zinc-300">Fun Fact: </span>
                      {insights.funFact}
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Ask Gemini Section */}
              <div className="pt-3 border-t border-zinc-800/80 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                  <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                  <span>Ask Gemini about this video:</span>
                </div>

                {/* Quick Prompts */}
                {messages.length === 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {sampleQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleAskQuestion(q)}
                        disabled={isAsking}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-800/60 hover:bg-violet-900/40 text-zinc-300 hover:text-violet-200 border border-zinc-700/60 hover:border-violet-500/40 transition active:scale-95 text-left"
                      >
                        &ldquo;{q}&rdquo;
                      </button>
                    ))}
                  </div>
                )}

                {/* Chat History */}
                {messages.length > 0 && (
                  <div className="max-h-56 overflow-y-auto space-y-2 p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl ${
                          m.role === 'user'
                            ? 'bg-violet-950/50 text-violet-100 border border-violet-800/40 ml-4'
                            : 'bg-zinc-900 text-zinc-200 border border-zinc-800 mr-4'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-zinc-400">
                          {m.role === 'user' ? (
                            <span>You</span>
                          ) : (
                            <span className="flex items-center gap-1 text-violet-400">
                              <Sparkles className="w-3 h-3" /> Gemini
                            </span>
                          )}
                        </div>
                        <div className="whitespace-pre-line leading-relaxed">{m.content}</div>
                      </div>
                    ))}
                    {isAsking && (
                      <div className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 border border-zinc-800 mr-4 flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-400" />
                        <span>Thinking...</span>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>
                )}

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAskQuestion();
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="text"
                    value={inputQuestion}
                    onChange={(e) => setInputQuestion(e.target.value)}
                    placeholder={`Ask Gemini about ${video.channelTitle} or ${insights.countryName}...`}
                    disabled={isAsking}
                    className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500/60 focus:outline-none text-xs text-zinc-100 placeholder-zinc-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuestion.trim() || isAsking}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 active:from-violet-500 active:to-fuchsia-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center justify-center transition cursor-pointer shadow-md shadow-violet-600/30"
                  >
                    {isAsking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  </button>
                </form>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};
