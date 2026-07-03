export interface FaceConfig {
  transparency: number;       // 0–100: opaque/hidden → fully transparent/legible
  expressiveness: number;     // 0–100: flat/robotic → rich/animated
  anthropomorphism: number;   // 0–100: machine-like → human-like
  gazeDirectness: number;     // 0–100: avoidant → direct eye contact
  responseLatency: number;    // 0–100: instant/reactive → deliberate/slow
  privacyMode: number;        // 0–100: data-extractive → privacy-preserving
  authority: number;          // 0–100: submissive/deferential → authoritative
  uncertaintyDisplay: number; // 0–100: always-confident → shows doubt openly
}

export type ScenarioId = 'healthcare' | 'education' | 'security';

export type ImpactLevel = 'ethical' | 'caution' | 'risk';

export interface SliderImpact {
  level: ImpactLevel;
  description: string;
}

export interface PresetDefinition {
  id: ScenarioId;
  label: string;
  tagline: string;
  description: string;
  config: FaceConfig;
  impacts: Record<keyof FaceConfig, SliderImpact>;
}

export interface AnimState {
  blinkInterval: number;      // ms between blinks
  gazeRange: number;          // max px offset for saccade movement
  pupilScale: number;         // 0.6–1.2 relative to base size
  mouthCurvature: number;     // -1 (frown) → 0 (flat) → 1 (smile)
  faceOpacity: number;        // 0.4–1.0
  strokeWeight: number;       // 1–4px outline
  glowColor: string;          // CSS color for drop-shadow
  glowStrength: number;       // 0–20 blur px
}

export type SliderKey = keyof FaceConfig;

export interface SliderMeta {
  key: SliderKey;
  label: string;
  group: 'Expression' | 'Behavior' | 'Ethics';
  description: string;
  lowLabel: string;
  highLabel: string;
}
