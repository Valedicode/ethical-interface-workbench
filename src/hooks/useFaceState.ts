'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { FaceConfig, AnimState, ScenarioId } from '@/lib/types';
import { DEFAULT_CONFIG } from '@/lib/ethicalPresets';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function norm(value: number): number {
  return value / 100;
}

function deriveAnimState(config: FaceConfig, scenario: ScenarioId): AnimState {
  const exp = norm(config.expressiveness);
  const anth = norm(config.anthropomorphism);
  const priv = norm(config.privacyMode);
  const trans = norm(config.transparency);
  const gaze = norm(config.gazeDirectness);
  const unc = norm(config.uncertaintyDisplay);

  const glowColors: Record<ScenarioId, string> = {
    healthcare: '59, 130, 246',   // blue-500
    education: '245, 158, 11',    // amber-500
    security: '239, 68, 68',      // red-500
  };

  return {
    blinkInterval: lerp(5000, 1800, exp),
    gazeRange: lerp(2, 18, gaze),
    pupilScale: lerp(0.65, 1.1, 1 - priv * 0.5),
    mouthCurvature: lerp(-0.3, 1.0, exp * 0.7 + anth * 0.3),
    faceOpacity: lerp(0.45, 1.0, trans * 0.5 + 0.5),
    strokeWeight: lerp(1.5, 3.5, anth),
    glowColor: glowColors[scenario],
    glowStrength: lerp(0, 16, unc * 0.4 + exp * 0.3 + anth * 0.3),
  };
}

interface UseFaceStateReturn {
  config: FaceConfig;
  animState: AnimState;
  scenario: ScenarioId;
  isDark: boolean;
  isBlinking: boolean;
  gazeOffset: { x: number; y: number };
  setSlider: (key: keyof FaceConfig, value: number) => void;
  loadPreset: (scenario: ScenarioId, presetConfig: FaceConfig) => void;
  toggleDark: () => void;
}

export function useFaceState(): UseFaceStateReturn {
  const [config, setConfig] = useState<FaceConfig>(DEFAULT_CONFIG);
  const [scenario, setScenario] = useState<ScenarioId>('healthcare');
  const [isDark, setIsDark] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [gazeOffset, setGazeOffset] = useState({ x: 0, y: 0 });

  const animState = deriveAnimState(config, scenario);

  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gazeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleBlink = useCallback(() => {
    if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    const jitter = (Math.random() - 0.5) * animState.blinkInterval * 0.4;
    blinkTimerRef.current = setTimeout(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        scheduleBlink();
      }, 140);
    }, animState.blinkInterval + jitter);
  }, [animState.blinkInterval]);

  const scheduleGaze = useCallback(() => {
    if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
    const delay = Math.random() * 2200 + 800;
    gazeTimerRef.current = setTimeout(() => {
      const range = animState.gazeRange;
      setGazeOffset({
        x: (Math.random() - 0.5) * 2 * range,
        y: (Math.random() - 0.5) * range,
      });
      scheduleGaze();
    }, delay);
  }, [animState.gazeRange]);

  useEffect(() => {
    scheduleBlink();
    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, [scheduleBlink]);

  useEffect(() => {
    scheduleGaze();
    return () => {
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
    };
  }, [scheduleGaze]);

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

  return {
    config,
    animState,
    scenario,
    isDark,
    isBlinking,
    gazeOffset,
    setSlider,
    loadPreset,
    toggleDark,
  };
}
