'use client';

import { AlertTriangle, Loader2, Video } from 'lucide-react';
import type { RefObject } from 'react';
import type { WebcamError, WebcamStatus } from '@/hooks/useWebcamStream';

interface WebcamPreviewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  webcamStatus: WebcamStatus;
  webcamError: WebcamError | null;
  isModelLoading: boolean;
  modelError: string | null;
}

/**
 * Small picture-in-picture preview of the live camera feed, purely for
 * visual confidence that tracking has a face to work with. Renders inline
 * loading/error states instead of ever failing silently.
 */
export default function WebcamPreview({
  videoRef,
  webcamStatus,
  webcamError,
  isModelLoading,
  modelError,
}: WebcamPreviewProps) {
  const error = webcamError?.message ?? modelError;

  return (
    <div className="absolute bottom-3 right-3 w-28 aspect-video rounded-lg overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-lg backdrop-blur-sm">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover scale-x-[-1]"
      />

      {(webcamStatus !== 'ready' || isModelLoading || error) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-1.5 text-center bg-slate-900/85">
          {error ? (
            <>
              <AlertTriangle size={14} className="text-red-400" />
              <span className="text-[9px] text-red-300 leading-tight">{error}</span>
            </>
          ) : webcamStatus === 'requesting' || isModelLoading ? (
            <>
              <Loader2 size={14} className="text-slate-300 animate-spin" />
              <span className="text-[9px] text-slate-400 leading-tight">
                {webcamStatus === 'requesting' ? 'Requesting camera…' : 'Loading model…'}
              </span>
            </>
          ) : (
            <>
              <Video size={14} className="text-slate-500" />
              <span className="text-[9px] text-slate-500 leading-tight">Starting camera…</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
