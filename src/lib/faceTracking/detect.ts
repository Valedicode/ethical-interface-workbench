import type { FaceLandmarker } from '@mediapipe/tasks-vision';
import type { FacePosition } from '@/lib/types';

/**
 * Runs one detection pass on the given video frame and returns the
 * detected face's position (centroid of all face landmarks, normalized to
 * 0–1 within the frame), or `null` if no face was detected in this frame.
 *
 * This function is intentionally a pure, self-contained boundary — it takes
 * a landmarker instance, a video frame, and a timestamp, and returns plain
 * data. It performs no React state updates and holds no state of its own,
 * so it can be moved into a Web Worker later (message in → data out)
 * without changing its contract.
 */
export function detectFrame(
  landmarker: FaceLandmarker,
  video: HTMLVideoElement,
  timestampMs: number
): FacePosition | null {
  const result = landmarker.detectForVideo(video, timestampMs);
  const landmarks = result.faceLandmarks?.[0];
  if (!landmarks || landmarks.length === 0) return null;

  let sumX = 0;
  let sumY = 0;
  for (const point of landmarks) {
    sumX += point.x;
    sumY += point.y;
  }
  return { x: sumX / landmarks.length, y: sumY / landmarks.length };
}
