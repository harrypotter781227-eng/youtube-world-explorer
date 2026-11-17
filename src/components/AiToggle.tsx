'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiToggleProps {
  aiEnabled: boolean;
  onToggle: () => void;
}

/**
 * On/off switch that lets the user enable or disable the use of AI in the app.
 * When AI is turned off, all AI features are hidden and never computed.
 */
export const AiToggle: React.FC<AiToggleProps> = ({ aiEnabled, onToggle }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={aiEnabled}
      aria-label={`AI features ${aiEnabled ? 'enabled' : 'disabled'}. Click to ${aiEnabled ? 'turn off' : 'turn on'} AI.`}
      onClick={onToggle}
      title={`AI Features: ${aiEnabled ? 'ON' : 'OFF'}`}
      className={`group inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 transition active:scale-95 ${
        aiEnabled
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-zinc-900 border-zinc-700/80 text-zinc-500'
      }`}
    >
      {/* Sliding switch track */}
      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
          aiEnabled ? 'bg-emerald-500/80' : 'bg-zinc-700'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
            aiEnabled ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </span>
      <Sparkles className={`w-3.5 h-3.5 ${aiEnabled ? 'text-emerald-400' : 'text-zinc-600'}`} />
      <span className="text-xs font-bold tracking-wide">{aiEnabled ? 'AI ON' : 'AI OFF'}</span>
    </button>
  );
};
