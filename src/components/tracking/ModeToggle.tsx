'use client';

import { SlidersHorizontal, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TrackingMode } from '@/lib/types';

interface ModeToggleProps {
  mode: TrackingMode;
  onChange: (mode: TrackingMode) => void;
}

const options: { id: TrackingMode; label: string; icon: typeof SlidersHorizontal }[] = [
  { id: 'manual', label: 'Manual', icon: SlidersHorizontal },
  { id: 'live', label: 'Live Tracking', icon: Video },
];

export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Face input mode"
      className="relative flex items-center gap-0.5 p-0.5 rounded-full border border-slate-700 bg-slate-800/60"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = option.id === mode;

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              isActive ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mode-toggle-active-bg"
                className="absolute inset-0 rounded-full bg-violet-500/25 border border-violet-500/50"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <Icon size={13} className="relative z-10" />
            <span className="relative z-10 hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
