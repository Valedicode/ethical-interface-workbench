'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import type { SliderMeta } from '@/lib/types';

interface EthicalSliderProps {
  meta: SliderMeta;
  value: number;
  onChange: (value: number) => void;
}

const trackColors: Record<string, string> = {
  Expression: 'accent-violet-400',
  Behavior: 'accent-cyan-400',
  Ethics: 'accent-emerald-400',
  Visual: 'accent-rose-400',
};

const groupBadgeColors: Record<string, string> = {
  Expression: 'bg-violet-500/20 text-violet-300',
  Behavior: 'bg-cyan-500/20 text-cyan-300',
  Ethics: 'bg-emerald-500/20 text-emerald-300',
  Visual: 'bg-rose-500/20 text-rose-300',
};

export default function EthicalSlider({ meta, value, onChange }: EthicalSliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const accentClass = trackColors[meta.group] ?? 'accent-slate-400';
  const pct = value;

  return (
    <div className="group flex flex-col gap-1.5 py-2">
      {/* Label row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm font-medium text-slate-200 truncate">{meta.label}</span>
          <div className="relative">
            <button
              type="button"
              aria-label={`Info: ${meta.label}`}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
            >
              <Info size={13} />
            </button>
            {showTooltip && (
              <div className="absolute z-50 left-5 top-0 w-52 rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-xs text-slate-300 shadow-xl pointer-events-none">
                {meta.description}
              </div>
            )}
          </div>
        </div>
        <span className="text-xs font-mono text-slate-400 tabular-nums w-8 text-right shrink-0">
          {value}
        </span>
      </div>

      {/* Slider track */}
      <div className="relative flex items-center gap-2">
        <span className="text-[10px] text-slate-500 w-14 text-right leading-tight shrink-0">
          {meta.lowLabel}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`flex-1 h-1.5 rounded-full cursor-pointer ${accentClass} bg-slate-700 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0`}
          style={{
            background: `linear-gradient(to right, var(--tw-gradient-from, rgb(139 92 246)) ${pct}%, rgb(51 65 85) ${pct}%)`,
          }}
        />
        <span className="text-[10px] text-slate-500 w-14 leading-tight shrink-0">
          {meta.highLabel}
        </span>
      </div>
    </div>
  );
}

export { groupBadgeColors };
