'use client';

import { useEffect, useRef, useState } from 'react';
import type { FaceLandmarker } from '@mediapipe/tasks-vision';
import { createFaceLandmarker } from '@/lib/faceTracking/landmarker';

interface UseFaceLandmarkerReturn {
  landmarker: FaceLandmarker | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initializes a single `FaceLandmarker` instance once per mount (the model
 * fetch/setup is async) and disposes it on unmount. `isLoading` and `error`
 * are derived from `landmarker`/`error` rather than set synchronously at
 * the top of the effect, so the effect only ever updates state from inside
 * the async result callbacks.
 */
export function useFaceLandmarker(enabled: boolean): UseFaceLandmarkerReturn {
  const [landmarker, setLandmarker] = useState<FaceLandmarker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    createFaceLandmarker()
      .then((instance) => {
        if (cancelled) {
          instance.close();
          return;
        }
        landmarkerRef.current = instance;
        setLandmarker(instance);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load the face tracking model.');
      });

    return () => {
      cancelled = true;
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
      setLandmarker(null);
    };
  }, [enabled]);

  return { landmarker, isLoading: enabled && !landmarker && !error, error };
}
