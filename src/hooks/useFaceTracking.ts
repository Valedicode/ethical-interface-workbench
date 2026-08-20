'use client';

import { useEffect, useRef, useState } from 'react';
import type { FacePosition } from '@/lib/types';
import { useWebcamStream, type WebcamError, type WebcamStatus } from './useWebcamStream';
import { useFaceLandmarker } from './useFaceLandmarker';
import { detectFrame } from '@/lib/faceTracking/detect';

const DETECTION_INTERVAL_MS = 1000 / 30;

interface UseFaceTrackingReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  webcamStatus: WebcamStatus;
  webcamError: WebcamError | null;
  isModelLoading: boolean;
  modelError: string | null;
  facePosition: FacePosition | null;
}

/**
 * Composes webcam capture, MediaPipe model loading, and the per-frame
 * detection call into a single live-tracking source. Runs its own
 * `requestAnimationFrame` loop throttled to ~30fps so a slow detection
 * frame never blocks the face rig's own animation loops (blink/gaze),
 * which run independently in `useFaceState`.
 *
 * `enabled` gates all work (webcam + model + loop) so nothing runs while
 * the UI is in manual mode.
 */
export function useFaceTracking(enabled: boolean): UseFaceTrackingReturn {
  const { videoRef, status: webcamStatus, error: webcamError, start, stop } = useWebcamStream();
  const { landmarker, isLoading: isModelLoading, error: modelError } = useFaceLandmarker(enabled);
  const [facePosition, setFacePosition] = useState<FacePosition | null>(null);

  const rafRef = useRef<number | null>(null);
  const lastDetectionTimeRef = useRef(0);

  // Recursive self-rescheduling tick stored in a ref (mirrors the
  // blink/gaze loop pattern in `useFaceState`), so the rAF callback always
  // calls the latest closure without referencing its own binding early.
  const tickRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }
    start();
    return () => stop();
  }, [enabled, start, stop]);

  useEffect(() => {
    if (!enabled || !landmarker) return;

    tickRef.current = () => {
      rafRef.current = requestAnimationFrame(() => tickRef.current());

      const video = videoRef.current;
      if (!video || video.readyState < 2) return;

      const now = performance.now();
      if (now - lastDetectionTimeRef.current < DETECTION_INTERVAL_MS) return;
      lastDetectionTimeRef.current = now;

      const result = detectFrame(landmarker, video, now);
      if (result) setFacePosition(result);
    };
    rafRef.current = requestAnimationFrame(() => tickRef.current());

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      setFacePosition(null);
    };
  }, [enabled, landmarker, videoRef]);

  return {
    videoRef,
    webcamStatus,
    webcamError,
    isModelLoading,
    modelError,
    facePosition,
  };
}
