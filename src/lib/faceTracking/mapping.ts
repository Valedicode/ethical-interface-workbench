import type { FacePosition, TrackingOverride } from '@/lib/types';

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// Maximum pupil offset (px) at the edge of the tracked range — matches the
// scale the existing random-saccade gaze loop in `useFaceState` operates in.
const MAX_GAZE_PX = 22;

/**
 * Maps the viewer's detected face position onto a gaze offset that steers
 * the rig's pupils toward them — the rig tracks and "looks at" the viewer
 * rather than mimicking their expression.
 *
 * `facePosition` is normalized 0–1 within the (unmirrored) camera frame.
 * The offset is inverted on the x-axis so it matches a mirrored, "looking
 * back at you" view: move toward your right and the rig's gaze follows to
 * its right from your point of view.
 */
export function mapFacePositionToGazeOverride(facePosition: FacePosition): TrackingOverride {
  const offsetX = clamp(-(facePosition.x - 0.5) * 2, -1, 1) * MAX_GAZE_PX;
  const offsetY = clamp((facePosition.y - 0.5) * 2, -1, 1) * MAX_GAZE_PX;

  return { gazeOffset: { x: offsetX, y: offsetY } };
}
