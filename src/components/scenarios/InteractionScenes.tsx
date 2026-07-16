'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, AlertOctagon, Loader2 } from 'lucide-react';
import type { ScenarioId, EventType } from '@/lib/types';
import { ETHICAL_PRESETS } from '@/lib/ethicalPresets';

interface InteractionScenesProps {
  scenario: ScenarioId;
  eventPhase: 'idle' | 'thinking' | 'reacting';
  activeEventId: string | null;
  onTrigger: (eventId: string, type: EventType) => void;
}

const eventIcons: Record<EventType, typeof Sparkles> = {
  greeting: Sparkles,
  hesitation: HelpCircle,
  difficult: AlertOctagon,
};

export default function InteractionScenes({ scenario, eventPhase, activeEventId, onTrigger }: InteractionScenesProps) {
  const preset = ETHICAL_PRESETS.find((p) => p.id === scenario);
  if (!preset) return null;

  const isBusy = eventPhase !== 'idle';

  return (
    <div className="w-full">
      <p className="text-xs text-slate-500 text-center mb-3 uppercase tracking-widest font-medium">
        Interaction Scenes
      </p>
      <div className="grid grid-cols-3 gap-2">
        {preset.events.map((event) => {
          const Icon = eventIcons[event.type];
          const isActive = activeEventId === event.id;

          return (
            <button
              key={event.id}
              type="button"
              disabled={isBusy}
              onClick={() => onTrigger(event.id, event.type)}
              className={`relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border transition-all duration-300 cursor-pointer disabled:cursor-not-allowed
                ${isActive
                  ? 'bg-violet-500/20 border-violet-500/60 text-violet-300 shadow-lg shadow-violet-500/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-700/60 hover:text-slate-300 hover:border-slate-600 disabled:opacity-40 disabled:hover:bg-slate-800/60'
                }`}
            >
              {isActive && eventPhase === 'thinking' ? (
                <Loader2 size={16} className="animate-spin relative z-10" />
              ) : (
                <Icon size={16} className="relative z-10" />
              )}
              <span className="relative z-10 text-[11px] font-medium leading-tight text-center">
                {event.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeEventId && (
          <motion.div
            key={activeEventId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 overflow-hidden"
          >
            {(() => {
              const event = preset.events.find((e) => e.id === activeEventId);
              if (!event) return null;
              return (
                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3 space-y-1.5">
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <span className="text-slate-300 font-medium">Situation: </span>
                    {event.prompt}
                  </p>
                  <p className="text-[11px] text-violet-300/90 leading-relaxed">
                    <span className="font-medium">
                      {eventPhase === 'thinking' ? 'Pausing before reacting…' : 'Reaction: '}
                    </span>
                    {eventPhase !== 'thinking' && event.reaction}
                  </p>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
