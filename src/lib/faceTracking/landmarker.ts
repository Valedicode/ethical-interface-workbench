import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

// Versions are pinned so a WASM build never silently drifts out of sync with
// the model file below.
const WASM_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm';
const MODEL_ASSET_PATH =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

/**
 * Loads the MediaPipe Wasm runtime + face landmark model and returns a
 * ready-to-use `FaceLandmarker` configured for per-frame video inference
 * with blendshapes enabled. Both the runtime and the model are fetched
 * on demand (not bundled), then run entirely on-device — no data leaves
 * the browser.
 */
export async function createFaceLandmarker(): Promise<FaceLandmarker> {
  const filesetResolver = await FilesetResolver.forVisionTasks(WASM_BASE_URL);

  return FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: MODEL_ASSET_PATH,
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    numFaces: 1,
    // Only the raw landmark positions are needed to steer the rig's gaze
    // toward the viewer's face — no blendshape/expression data is used.
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: false,
  });
}
