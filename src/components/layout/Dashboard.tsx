'use client';

import { Moon, Sun, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFaceState } from '@/hooks/useFaceState';
import { ETHICAL_PRESETS } from '@/lib/ethicalPresets';
import FaceCanvas from '@/components/face/FaceCanvas';
import ControlPanel from '@/components/controls/ControlPanel';
import ScenarioSelector from '@/components/scenarios/ScenarioSelector';
import ScenarioAnalysis from '@/components/scenarios/ScenarioAnalysis';
import InteractionScenes from '@/components/scenarios/InteractionScenes';
import type { ScenarioId } from '@/lib/types';

export default function Dashboard() {
  const {
    config,
    animState,
    scenario,
    isDark,
    isBlinking,
    gazeOffset,
    eventPhase,
    activeEventId,
    setSlider,
    loadPreset,
    toggleDark,
    triggerEvent,
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
      className={`h-screen overflow-hidden flex flex-col transition-colors duration-700 ${
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
      <main className={`flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] bg-gradient-to-br ${scenarioBg[scenario]} transition-all duration-700`}>
        {/* Left: Control Panel */}
        <div className="min-h-0 h-full lg:border-r border-slate-800/60 overflow-hidden">
          <ControlPanel config={config} onSliderChange={setSlider} />
        </div>

        {/* Center: face stays in the visible viewport; controls scroll below if needed */}
        <div className="min-h-0 h-full flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0 flex items-center justify-center p-6">
            <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl transition-colors duration-700"
                style={{ background: `rgba(${animState.glowColor}, 0.6)` }}
                animate={{ opacity: [0.06, 0.16, 0.06] }}
                transition={{
                  duration: animState.idlePulseDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <FaceCanvas
                animState={animState}
                isBlinking={isBlinking}
                gazeOffset={gazeOffset}
              />
            </div>
          </div>

          <div className="shrink-0 overflow-y-auto max-h-[42vh] border-t border-slate-800/40 px-6 pb-6 pt-4 space-y-4">
            {/* Live stats bar */}
            <div className="flex flex-wrap justify-center gap-3 text-[11px] text-slate-500">
              <span>
                Blink interval:{' '}
                <span className="text-slate-300 font-mono">{Math.round(animState.blinkInterval)}ms</span>
              </span>
              <span>
                Gaze range:{' '}
                <span className="text-slate-300 font-mono">±{Math.round(animState.gazeRange * animState.gazeSteadiness)}px</span>
              </span>
              <span>
                Opacity:{' '}
                <span className="text-slate-300 font-mono">{Math.round(animState.faceOpacity * 100)}%</span>
              </span>
              <span>
                Glow:{' '}
                <span className="text-slate-300 font-mono">{Math.round(animState.glowStrength)}px</span>
              </span>
              <span>
                Breathing pace:{' '}
                <span className="text-slate-300 font-mono">{animState.idlePulseDuration.toFixed(1)}s</span>
              </span>
              <span>
                Brow angle:{' '}
                <span className="text-slate-300 font-mono">{Math.round(animState.browAngle)}°</span>
              </span>
            </div>

            <div className="w-full max-w-[420px] mx-auto">
              <ScenarioSelector activeScenario={scenario} onSelect={handleScenarioSelect} />
            </div>

            <div className="w-full max-w-[420px] mx-auto">
              <InteractionScenes
                scenario={scenario}
                eventPhase={eventPhase}
                activeEventId={activeEventId}
                onTrigger={triggerEvent}
              />
            </div>
          </div>
        </div>

        {/* Right: Ethical Analysis */}
        <div className="min-h-0 h-full lg:border-l border-slate-800/60 overflow-hidden border-t lg:border-t-0">
          <ScenarioAnalysis scenario={scenario} config={config} />
        </div>
      </main>
    </div>
  );
}
