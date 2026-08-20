'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type WebcamStatus = 'idle' | 'requesting' | 'ready' | 'error';

export type WebcamErrorKind = 'permission-denied' | 'no-camera' | 'unsupported' | 'unknown';

export interface WebcamError {
  kind: WebcamErrorKind;
  message: string;
}

interface UseWebcamStreamReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  status: WebcamStatus;
  error: WebcamError | null;
  start: () => void;
  stop: () => void;
}

function toWebcamError(err: unknown): WebcamError {
  if (err instanceof DOMException) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      return {
        kind: 'permission-denied',
        message: 'Camera access was denied. Allow camera permission in your browser to use live tracking.',
      };
    }
    if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      return {
        kind: 'no-camera',
        message: 'No camera was found on this device.',
      };
    }
  }
  return {
    kind: 'unknown',
    message: err instanceof Error ? err.message : 'Failed to access the webcam.',
  };
}

/**
 * Client-only webcam capture. Requests a video stream on `start()` and
 * attaches it to `videoRef`; surfaces permission-denied / no-camera errors
 * instead of failing silently. Does not touch face rig state directly —
 * consumers (e.g. `useFaceTracking`) read frames off `videoRef`.
 */
export function useWebcamStream(): UseWebcamStreamReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<WebcamStatus>('idle');
  const [error, setError] = useState<WebcamError | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus('idle');
  }, []);

  const start = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setStatus('error');
      setError({ kind: 'unsupported', message: 'This browser does not support webcam access.' });
      return;
    }

    setStatus('requesting');
    setError(null);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus('ready');
      })
      .catch((err: unknown) => {
        setStatus('error');
        setError(toWebcamError(err));
      });
  }, []);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  return { videoRef, status, error, start, stop };
}
