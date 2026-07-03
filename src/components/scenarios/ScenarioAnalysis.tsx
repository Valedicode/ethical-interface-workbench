'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import type { ScenarioId, FaceConfig, ImpactLevel, PresetDefinition } from '@/lib/types';
import { ETHICAL_PRESETS, SLIDER_META } from '@/lib/ethicalPresets';

interface ScenarioAnalysisProps {
  scenario: ScenarioId;
  config: FaceConfig;
}

const impactStyles: Record<ImpactLevel, { chip: string; icon: typeof CheckCircle2; label: string }> = {
  ethical: {
    chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    icon: CheckCircle2,
    label: 'Ethical',
  },
  caution: {
    chip: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    icon: AlertTriangle,
    label: 'Caution',
  },
  risk: {
    chip: 'bg-red-500/15 text-red-300 border-red-500/30',
    icon: XCircle,
    label: 'Risk',
  },
};

function getDeviationWarning(currentValue: number, presetValue: number): string | null {
  const delta = currentValue - presetValue;
  if (Math.abs(delta) < 15) return null;
  if (delta > 0) return `+${Math.round(delta)} above preset`;
  return `${Math.round(delta)} below preset`;
}

function ScoreBar({ value }: { value: number }) {
  const color = value >= 70 ? 'bg-emerald-500' : value >= 40 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="h-1 w-full rounded-full bg-slate-700 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

export default function ScenarioAnalysis({ scenario, config }: ScenarioAnalysisProps) {
  const preset: PresetDefinition | undefined = ETHICAL_PRESETS.find((p) => p.id === scenario);

  if (!preset) return null;

  const riskCount = SLIDER_META.filter(
    (m) => preset.impacts[m.key].level === 'risk'
  ).length;
  const cautionCount = SLIDER_META.filter(
    (m) => preset.impacts[m.key].level === 'caution'
  ).length;
  const ethicalCount = SLIDER_META.filter(
    (m) => preset.impacts[m.key].level === 'ethical'
  ).length;

  return (
    <aside className="flex flex-col h-full overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-slate-700/60">
        <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
          Ethical Analysis
        </h2>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
          {preset.description}
        </p>
      </div>

      {/* Summary chips */}
      <div className="flex gap-2 px-4 pt-3 pb-2">
        <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5">
          <CheckCircle2 size={11} className="text-emerald-400" />
          <span className="text-[10px] font-medium text-emerald-300">{ethicalCount}</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5">
          <AlertTriangle size={11} className="text-amber-400" />
          <span className="text-[10px] font-medium text-amber-300">{cautionCount}</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-red-500/15 border border-red-500/30 px-2 py-0.5">
          <XCircle size={11} className="text-red-400" />
          <span className="text-[10px] font-medium text-red-300">{riskCount}</span>
        </div>
        <span className="text-[10px] text-slate-500 self-center ml-1">dimensions flagged</span>
      </div>

      {/* Per-slider analysis */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
        >
          {SLIDER_META.map((meta) => {
            const impact = preset.impacts[meta.key];
            const styles = impactStyles[impact.level];
            const ImpactIcon = styles.icon;
            const deviation = getDeviationWarning(config[meta.key], preset.config[meta.key]);

            return (
              <div
                key={meta.key}
                className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <ChevronRight size={11} className="text-slate-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-200 truncate">{meta.label}</span>
                  </div>
                  <span className={`shrink-0 flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${styles.chip}`}>
                    <ImpactIcon size={10} />
                    {styles.label}
                  </span>
                </div>

                <ScoreBar value={config[meta.key]} />

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {impact.description}
                </p>

                {deviation && (
                  <p className="text-[10px] text-amber-400/80 font-mono">
                    {deviation} from {preset.label} preset
                  </p>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
