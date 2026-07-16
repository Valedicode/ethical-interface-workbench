export interface FaceConfig {
  transparency: number;       // 0–100: opaque/hidden → fully transparent/legible
  expressiveness: number;     // 0–100: flat/robotic → rich/animated
  anthropomorphism: number;   // 0–100: machine-like → human-like (also governs age-/gender-coding legibility and realism)
  gazeDirectness: number;     // 0–100: avoidant → direct eye contact
  responseLatency: number;    // 0–100: instant/reactive → deliberate/slow
  privacyMode: number;        // 0–100: data-extractive → privacy-preserving
  authority: number;          // 0–100: submissive/deferential → authoritative
  uncertaintyDisplay: number; // 0–100: always-confident → shows doubt openly
  eyeShape: number;           // 0–100: angular/geometric → round/organic
  eyeSize: number;            // 0–100: small/subtle → large/expressive
  colorPalette: number;       // 0–100: cool/clinical → warm/organic hue
  mouthDesign: number;        // 0–100: minimal line → detailed/expressive
  facialSoftness: number;     // 0–100: sharp/angular → soft/rounded contours
  cuteness: number;           // 0–100: neutral proportions → baby-schema/cute proportions
  symmetry: number;           // 0–100: asymmetric/quirky → perfectly symmetric
}

export type ScenarioId = 'healthcare' | 'education' | 'security';

export type ImpactLevel = 'ethical' | 'caution' | 'risk';

export interface SliderImpact {
  level: ImpactLevel;
  description: string;
}

export type EventType = 'greeting' | 'hesitation' | 'difficult';

export interface InteractionEvent {
  id: string;
  type: EventType;
  label: string;
  prompt: string;      // the situation the system encounters
  reaction: string;    // what the face does and why it matters ethically
}

export interface PresetDefinition {
  id: ScenarioId;
  label: string;
  tagline: string;
  useCase: string;
  description: string;
  inclusionNote: string;
  config: FaceConfig;
  impacts: Record<keyof FaceConfig, SliderImpact>;
  risks: string[];
  redesigns: string[];
  events: InteractionEvent[];
}

export interface AnimState {
  blinkInterval: number;      // ms between blinks
  gazeRange: number;          // max px offset for saccade movement
  gazeSteadiness: number;     // 0–1: 1 = wanders freely, near 0 = locked/fixed stare (authority)
  pupilScale: number;         // 0.6–1.2 relative to base size
  mouthCurvature: number;     // -1 (frown) → 0 (flat) → 1 (smile)
  faceOpacity: number;        // 0.4–1.0
  strokeWeight: number;       // 1–4px outline
  browAngle: number;          // degrees: negative = soft/raised, positive = stern/furrowed (authority)
  idlePulseDuration: number;  // seconds per breathing-glow cycle (responseLatency)
  glowColor: string;          // CSS color for drop-shadow
  glowStrength: number;       // 0–20 blur px
  eyeSizeScale: number;       // relative multiplier on base eye rx/ry (eyeSize + cuteness)
  eyeRoundness: number;       // 0 (angular/almond) – 1 (fully round/organic)
  paletteHueShift: number;    // degrees of hue-rotate applied over the scenario glow color
  mouthDetailLevel: number;   // 0–1: minimal single line → detailed lips/teeth
  faceCornerSoftness: number; // 0 (sharp/angular jaw) – 1 (soft/rounded jaw)
  cutenessLift: number;       // 0–1: baby-schema proportion shift (shorter face, bigger highlight)
  asymmetryAmount: number;    // 0 (perfectly symmetric) – up to ~6: px/degree offset applied per side
}

export type SliderKey = keyof FaceConfig;

export interface SliderMeta {
  key: SliderKey;
  label: string;
  group: 'Expression' | 'Behavior' | 'Ethics' | 'Visual';
  description: string;
  lowLabel: string;
  highLabel: string;
}
