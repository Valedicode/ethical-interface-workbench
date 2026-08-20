'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { FaceConfig, AnimState, ScenarioId, EventType, TrackingMode, TrackingOverride } from '@/lib/types';
import { DEFAULT_CONFIG } from '@/lib/ethicalPresets';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function norm(value: number): number {
  return value / 100;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function deriveAnimState(config: FaceConfig, scenario: ScenarioId): AnimState {
  const exp = norm(config.expressiveness);
  const anth = norm(config.anthropomorphism);
  const priv = norm(config.privacyMode);
  const trans = norm(config.transparency);
  const gaze = norm(config.gazeDirectness);
  const unc = norm(config.uncertaintyDisplay);
  const auth = norm(config.authority);
  const latency = norm(config.responseLatency);
  const eyeShapeNorm = norm(config.eyeShape);
  const eyeSizeNorm = norm(config.eyeSize);
  const paletteNorm = norm(config.colorPalette);
  const mouthDesignNorm = norm(config.mouthDesign);
  const softnessNorm = norm(config.facialSoftness);
  const cutenessNorm = norm(config.cuteness);
  const symmetryNorm = norm(config.symmetry);

  const glowColors: Record<ScenarioId, string> = {
    healthcare: '59, 130, 246',   // blue-500
    education: '245, 158, 11',    // amber-500
    security: '239, 68, 68',      // red-500
  };

  // Authority visibly hardens the face: brows furrow, mouth flattens/frowns,
  // and gaze becomes a fixed stare rather than a wandering, curious one.
  let mouthCurvature = lerp(-0.3, 1.0, exp * 0.7 + anth * 0.3);
  mouthCurvature = clamp(mouthCurvature - auth * 0.55, -0.4, 1.0);

  return {
    blinkInterval: lerp(5000, 1800, exp),
    gazeRange: lerp(2, 18, gaze),
    gazeSteadiness: lerp(1, 0.15, auth),
    pupilScale: lerp(0.65, 1.1, 1 - priv * 0.5),
    mouthCurvature,
    faceOpacity: lerp(0.45, 1.0, trans * 0.5 + 0.5),
    strokeWeight: lerp(1.5, 3.5, anth),
    browAngle: lerp(-8, 14, auth),
    // Instant/reactive systems pulse fast and restlessly; deliberate systems
    // breathe slowly and calmly. This is always visible, even at rest.
    idlePulseDuration: lerp(1.1, 4.8, latency),
    glowColor: glowColors[scenario],
    glowStrength: lerp(0, 16, unc * 0.4 + exp * 0.3 + anth * 0.3),
    // Cuteness compounds with raw eye size (baby-schema proportions read as
    // disproportionately large eyes), so the two multiply rather than average.
    eyeSizeScale: clamp(lerp(0.75, 1.3, eyeSizeNorm) * lerp(1, 1.2, cutenessNorm), 0.7, 1.7),
    eyeRoundness: eyeShapeNorm,
    // Cool (-) to warm (+) hue-rotate applied on top of the scenario's base glow color.
    paletteHueShift: lerp(-30, 30, paletteNorm),
    mouthDetailLevel: mouthDesignNorm,
    faceCornerSoftness: softnessNorm,
    cutenessLift: cutenessNorm,
    // Symmetry inverted into a small per-side offset; 0 at perfect symmetry.
    asymmetryAmount: lerp(6, 0, symmetryNorm),
  };
}

type EventPhase = 'idle' | 'thinking' | 'reacting';

interface UseFaceStateReturn {
  config: FaceConfig;
  animState: AnimState;
  scenario: ScenarioId;
  isDark: boolean;
  isBlinking: boolean;
  gazeOffset: { x: number; y: number };
  eventPhase: EventPhase;
  activeEventId: string | null;
  mode: TrackingMode;
  setSlider: (key: keyof FaceConfig, value: number) => void;
  loadPreset: (scenario: ScenarioId, presetConfig: FaceConfig) => void;
  toggleDark: () => void;
  triggerEvent: (eventId: string, type: EventType) => void;
  setMode: (mode: TrackingMode) => void;
  setTrackingOverride: (override: TrackingOverride | null) => void;
}

export function useFaceState(): UseFaceStateReturn {
  const [config, setConfig] = useState<FaceConfig>(DEFAULT_CONFIG);
  const [scenario, setScenario] = useState<ScenarioId>('healthcare');
  const [isDark, setIsDark] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [gazeOffset, setGazeOffset] = useState({ x: 0, y: 0 });

  const [eventPhase, setEventPhase] = useState<EventPhase>('idle');
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [gazeOverride, setGazeOverride] = useState<{ x: number; y: number } | null>(null);

  // Live webcam tracking mode: when active, `trackingOverride` supplies a
  // gaze offset captured from the camera — the rig tracks and looks toward
  // the viewer instead of mimicking them, layered on the same `gazeOffset`
  // the autonomous wandering loop otherwise fully controls.
  const [mode, setMode] = useState<TrackingMode>('manual');
  const [trackingOverride, setTrackingOverride] = useState<TrackingOverride | null>(null);

  const baseAnim = deriveAnimState(config, scenario);

  // Overlay the "thinking" / "reacting" phases of a triggered interaction
  // scene on top of the baseline animation state derived from the sliders.
  let animState: AnimState = baseAnim;
  if (eventPhase === 'thinking') {
    animState = { ...baseAnim, glowStrength: baseAnim.glowStrength * 0.5 };
  } else if (eventPhase === 'reacting' && eventType) {
    if (eventType === 'greeting') {
      animState = {
        ...baseAnim,
        mouthCurvature: clamp(baseAnim.mouthCurvature + 0.35, -0.4, 1),
        browAngle: baseAnim.browAngle - 6,
      };
    } else if (eventType === 'hesitation') {
      animState = {
        ...baseAnim,
        browAngle: baseAnim.browAngle + 4,
        gazeSteadiness: clamp(baseAnim.gazeSteadiness + 0.3, 0, 1),
      };
    } else if (eventType === 'difficult') {
      animState = {
        ...baseAnim,
        browAngle: baseAnim.browAngle + 10,
        mouthCurvature: clamp(baseAnim.mouthCurvature - 0.3, -0.4, 1),
        gazeSteadiness: 0.05,
      };
    }
  }

  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gazeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const eventTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Recursive self-rescheduling tick functions, stored in refs and assigned
  // inside effects (never during render) so each tick always calls the
  // latest version without needing to reference its own binding early.
  const blinkTickRef = useRef<() => void>(() => {});
  const gazeTickRef = useRef<() => void>(() => {});

  useEffect(() => {
    blinkTickRef.current = () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
      const jitter = (Math.random() - 0.5) * animState.blinkInterval * 0.4;
      blinkTimerRef.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          blinkTickRef.current();
        }, 140);
      }, animState.blinkInterval + jitter);
    };
    blinkTickRef.current();
    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, [animState.blinkInterval]);

  useEffect(() => {
    gazeTickRef.current = () => {
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
      const delay = Math.random() * 2200 + 800;
      gazeTimerRef.current = setTimeout(() => {
        const range = animState.gazeRange * animState.gazeSteadiness;
        setGazeOffset({
          x: (Math.random() - 0.5) * 2 * range,
          y: (Math.random() - 0.5) * range,
        });
        gazeTickRef.current();
      }, delay);
    };
    gazeTickRef.current();
    return () => {
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
    };
  }, [animState.gazeRange, animState.gazeSteadiness]);

  useEffect(() => {
    return () => {
      eventTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const setSlider = useCallback((key: keyof FaceConfig, value: number) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const loadPreset = useCallback((newScenario: ScenarioId, presetConfig: FaceConfig) => {
    setScenario(newScenario);
    setConfig(presetConfig);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const handleSetMode = useCallback((newMode: TrackingMode) => {
    setMode(newMode);
    if (newMode === 'manual') setTrackingOverride(null);
  }, []);

  const triggerEvent = useCallback((eventId: string, type: EventType) => {
    eventTimersRef.current.forEach(clearTimeout);
    eventTimersRef.current = [];

    setActiveEventId(eventId);
    setEventType(type);
    setEventPhase('thinking');

    // Deliberate (high responseLatency) systems visibly pause before acting;
    // instant systems react almost immediately. The pause duration is driven
    // directly by the responseLatency slider, so it stops being a "dead" control.
    const thinkMs = lerp(180, 1600, norm(config.responseLatency));

    if (type === 'hesitation') {
      setGazeOverride({ x: -10, y: 8 });
    }

    const t1 = setTimeout(() => {
      setEventPhase('reacting');
      setGazeOverride(type === 'difficult' ? { x: 0, y: -2 } : null);

      const t2 = setTimeout(() => {
        setEventPhase('idle');
        setEventType(null);
        setActiveEventId(null);
        setGazeOverride(null);
      }, 2400);
      eventTimersRef.current.push(t2);
    }, thinkMs);
    eventTimersRef.current.push(t1);
  }, [config.responseLatency]);

  const liveGazeOffset = mode === 'live' ? trackingOverride?.gazeOffset : undefined;

  return {
    config,
    animState,
    scenario,
    isDark,
    isBlinking,
    gazeOffset: liveGazeOffset ?? gazeOverride ?? gazeOffset,
    eventPhase,
    activeEventId,
    mode,
    setSlider,
    loadPreset,
    toggleDark,
    triggerEvent,
    setMode: handleSetMode,
    setTrackingOverride,
  };
}
