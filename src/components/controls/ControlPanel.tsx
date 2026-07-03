'use client';

import EthicalSlider, { groupBadgeColors } from './EthicalSlider';
import { SLIDER_META } from '@/lib/ethicalPresets';
import type { FaceConfig } from '@/lib/types';

interface ControlPanelProps {
  config: FaceConfig;
  onSliderChange: (key: keyof FaceConfig, value: number) => void;
}

const GROUPS = ['Expression', 'Behavior', 'Ethics'] as const;

const groupDescriptions: Record<string, string> = {
  Expression: 'How the face looks and signals emotion',
  Behavior: 'How the face moves and reacts',
  Ethics: 'How the AI relates to users\' rights and trust',
};

export default function ControlPanel({ config, onSliderChange }: ControlPanelProps) {
  return (
    <aside className="flex flex-col h-full overflow-hidden">
      <div className="px-4 pt-4 pb-2 border-b border-slate-700/60">
        <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
          Design Decisions
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">8 ethical dimensions</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {GROUPS.map((group) => {
          const sliders = SLIDER_META.filter((s) => s.group === group);
          const badgeClass = groupBadgeColors[group] ?? 'bg-slate-500/20 text-slate-300';

          return (
            <section key={group}>
              <div className="flex items-center gap-2 mt-4 mb-1">
                <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${badgeClass}`}>
                  {group}
                </span>
                <span className="text-[10px] text-slate-600 leading-tight hidden sm:block">
                  {groupDescriptions[group]}
                </span>
              </div>
              <div className="divide-y divide-slate-700/40">
                {sliders.map((meta) => (
                  <EthicalSlider
                    key={meta.key}
                    meta={meta}
                    value={config[meta.key]}
                    onChange={(v) => onSliderChange(meta.key, v)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
