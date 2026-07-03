'use client';

import { motion } from 'framer-motion';
import { Heart, GraduationCap, Shield } from 'lucide-react';
import type { ScenarioId } from '@/lib/types';
import { ETHICAL_PRESETS } from '@/lib/ethicalPresets';

interface ScenarioSelectorProps {
  activeScenario: ScenarioId;
  onSelect: (scenario: ScenarioId) => void;
}

const icons = {
  healthcare: Heart,
  education: GraduationCap,
  security: Shield,
};

const scenarioColors: Record<ScenarioId, { active: string; glow: string; border: string }> = {
  healthcare: {
    active: 'bg-blue-500/20 border-blue-500/60 text-blue-300',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-500/60',
  },
  education: {
    active: 'bg-amber-500/20 border-amber-500/60 text-amber-300',
    glow: 'shadow-amber-500/30',
    border: 'border-amber-500/60',
  },
  security: {
    active: 'bg-red-500/20 border-red-500/60 text-red-300',
    glow: 'shadow-red-500/30',
    border: 'border-red-500/60',
  },
};

export default function ScenarioSelector({ activeScenario, onSelect }: ScenarioSelectorProps) {
  return (
    <div className="w-full">
      <p className="text-xs text-slate-500 text-center mb-3 uppercase tracking-widest font-medium">
        Social Context
      </p>
      <div className="grid grid-cols-3 gap-2">
        {ETHICAL_PRESETS.map((preset) => {
          const Icon = icons[preset.id];
          const isActive = preset.id === activeScenario;
          const colors = scenarioColors[preset.id];

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelect(preset.id)}
              className={`relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border transition-all duration-300 cursor-pointer
                ${isActive
                  ? `${colors.active} shadow-lg ${colors.glow}`
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-700/60 hover:text-slate-300 hover:border-slate-600'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="scenario-active-bg"
                  className={`absolute inset-0 rounded-xl border ${colors.border}`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="relative z-10 text-xs font-medium leading-none">
                {preset.label}
              </span>
              <span className="relative z-10 text-[10px] text-center leading-tight opacity-70 hidden sm:block">
                {preset.tagline}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
