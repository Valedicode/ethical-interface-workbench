'use client';

import { Moon, Sun, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFaceState } from '@/hooks/useFaceState';
import { ETHICAL_PRESETS } from '@/lib/ethicalPresets';
import FaceCanvas from '@/components/face/FaceCanvas';
import ControlPanel from '@/components/controls/ControlPanel';
import ScenarioSelector from '@/components/scenarios/ScenarioSelector';
import ScenarioAnalysis from '@/components/scenarios/ScenarioAnalysis';
import type { ScenarioId } from '@/lib/types';

export default function Dashboard() {
  const {
    config,
    animState,
    scenario,
    isDark,
    isBlinking,
    gazeOffset,
    setSlider,
    loadPreset,
    toggleDark,
  } = useFaceState();

  function handleScenarioSelect(id: ScenarioId) {
    const preset = ETHICAL_PRESETS.find((p) => p.id === id);
    if (preset) loadPreset(id, preset.config);
  }

  const scenarioBg: Record<ScenarioId, string> = {
    healthcare: 'from-blue-950/40 via-slate-950 to-slate-950',
    education: 'from-amber-950/30 via-slate-950 to-slate-950',
    security: 'from-red-950/40 via-slate-950 to-slate-950',
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-700 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-800/60 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <Cpu size={20} className="text-violet-400" />
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-100 leading-none">
              Ethical Interface Workbench
            </h1>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-none">
              AI Face Simulator — Design &amp; Ethics Lab
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Scenario indicator badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                scenario === 'healthcare'
                  ? 'bg-blue-500/15 border-blue-500/40 text-blue-300'
                  : scenario === 'education'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-red-500/15 border-red-500/40 text-red-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {ETHICAL_PRESETS.find((p) => p.id === scenario)?.label}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      {/* Main 3-column grid */}
      <main className={`flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] min-h-0 bg-gradient-to-br ${scenarioBg[scenario]} transition-all duration-700`}>
        {/* Left: Control Panel */}
        <div className="lg:border-r border-slate-800/60 overflow-hidden">
          <ControlPanel config={config} onSliderChange={setSlider} />
        </div>

        {/* Center: Face + Scenario Selector */}
        <div className="flex flex-col items-center justify-center gap-6 p-6 min-h-[400px]">
          {/* Face viewport */}
          <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
            {/* Background ring glow */}
            <div
              className="absolute inset-0 rounded-full opacity-10 blur-3xl transition-colors duration-700"
              style={{ background: `rgba(${animState.glowColor}, 0.6)` }}
            />
            <FaceCanvas
              animState={animState}
              isBlinking={isBlinking}
              gazeOffset={gazeOffset}
            />
          </div>

          {/* Live stats bar */}
          <div className="flex flex-wrap justify-center gap-3 text-[11px] text-slate-500">
            <span>
              Blink interval:{' '}
              <span className="text-slate-300 font-mono">{Math.round(animState.blinkInterval)}ms</span>
            </span>
            <span>
              Gaze range:{' '}
              <span className="text-slate-300 font-mono">±{Math.round(animState.gazeRange)}px</span>
            </span>
            <span>
              Opacity:{' '}
              <span className="text-slate-300 font-mono">{Math.round(animState.faceOpacity * 100)}%</span>
            </span>
            <span>
              Glow:{' '}
              <span className="text-slate-300 font-mono">{Math.round(animState.glowStrength)}px</span>
            </span>
          </div>

          {/* Scenario selector */}
          <div className="w-full max-w-[420px]">
            <ScenarioSelector activeScenario={scenario} onSelect={handleScenarioSelect} />
          </div>
        </div>

        {/* Right: Ethical Analysis */}
        <div className="lg:border-l border-slate-800/60 overflow-hidden border-t lg:border-t-0">
          <ScenarioAnalysis scenario={scenario} config={config} />
        </div>
      </main>
    </div>
  );
}
