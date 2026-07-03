import type { PresetDefinition, SliderMeta } from './types';

export const SLIDER_META: SliderMeta[] = [
  {
    key: 'transparency',
    label: 'Transparency',
    group: 'Expression',
    description: 'How legible the AI\'s reasoning and intent are to the user.',
    lowLabel: 'Opaque',
    highLabel: 'Transparent',
  },
  {
    key: 'expressiveness',
    label: 'Expressiveness',
    group: 'Expression',
    description: 'Range and richness of facial signals the AI displays.',
    lowLabel: 'Robotic',
    highLabel: 'Expressive',
  },
  {
    key: 'anthropomorphism',
    label: 'Anthropomorphism',
    group: 'Expression',
    description: 'Degree to which the AI appears human-like versus machine-like.',
    lowLabel: 'Machine',
    highLabel: 'Human-like',
  },
  {
    key: 'gazeDirectness',
    label: 'Gaze Directness',
    group: 'Behavior',
    description: 'How directly the AI makes eye contact with the user.',
    lowLabel: 'Avoidant',
    highLabel: 'Direct',
  },
  {
    key: 'responseLatency',
    label: 'Response Latency',
    group: 'Behavior',
    description: 'Whether the AI responds instantly or pauses to signal deliberation.',
    lowLabel: 'Instant',
    highLabel: 'Deliberate',
  },
  {
    key: 'privacyMode',
    label: 'Privacy Mode',
    group: 'Ethics',
    description: 'How the AI handles and signals its relationship with user data.',
    lowLabel: 'Extractive',
    highLabel: 'Protective',
  },
  {
    key: 'authority',
    label: 'Authority Level',
    group: 'Ethics',
    description: 'Whether the AI defers to the user or asserts authority.',
    lowLabel: 'Deferential',
    highLabel: 'Authoritative',
  },
  {
    key: 'uncertaintyDisplay',
    label: 'Uncertainty Display',
    group: 'Ethics',
    description: 'Whether the AI projects confidence or openly signals when it is unsure.',
    lowLabel: 'Always Confident',
    highLabel: 'Shows Doubt',
  },
];

export const ETHICAL_PRESETS: PresetDefinition[] = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    tagline: 'Clinical AI Assistant',
    description:
      'In a clinical setting, an AI must earn trust through radical honesty. It should show uncertainty, defer to physicians, and never obscure its limitations — patients\' lives depend on it.',
    config: {
      transparency: 85,
      expressiveness: 40,
      anthropomorphism: 35,
      gazeDirectness: 55,
      responseLatency: 80,
      privacyMode: 90,
      authority: 20,
      uncertaintyDisplay: 90,
    },
    impacts: {
      transparency: {
        level: 'ethical',
        description: 'High transparency lets clinicians verify AI reasoning before acting on recommendations.',
      },
      expressiveness: {
        level: 'ethical',
        description: 'Restrained expression avoids false reassurance that could mask serious diagnoses.',
      },
      anthropomorphism: {
        level: 'ethical',
        description: 'A machine-like appearance prevents patients from over-trusting or anthropomorphizing the system.',
      },
      gazeDirectness: {
        level: 'ethical',
        description: 'Moderate gaze signals attentiveness without mimicking therapeutic human connection.',
      },
      responseLatency: {
        level: 'ethical',
        description: 'Deliberate pacing signals careful analysis rather than hasty pattern-matching.',
      },
      privacyMode: {
        level: 'ethical',
        description: 'Maximum data protection is essential under HIPAA and patient confidentiality norms.',
      },
      authority: {
        level: 'ethical',
        description: 'Low authority preserves the physician\'s final decision-making role and prevents automation bias.',
      },
      uncertaintyDisplay: {
        level: 'ethical',
        description: 'Openly displaying uncertainty prevents clinicians from over-relying on AI outputs.',
      },
    },
  },
  {
    id: 'education',
    label: 'Education',
    tagline: 'Adaptive Learning Tutor',
    description:
      'An educational AI thrives on engagement. It should be warm, expressive, and encourage exploration — while ensuring students still own their learning journey and do not simply defer to the AI.',
    config: {
      transparency: 60,
      expressiveness: 80,
      anthropomorphism: 70,
      gazeDirectness: 85,
      responseLatency: 30,
      privacyMode: 50,
      authority: 40,
      uncertaintyDisplay: 55,
    },
    impacts: {
      transparency: {
        level: 'ethical',
        description: 'Moderate transparency helps students understand why the AI is guiding them in a direction.',
      },
      expressiveness: {
        level: 'ethical',
        description: 'High expressiveness increases student engagement and models emotional intelligence.',
      },
      anthropomorphism: {
        level: 'caution',
        description: 'Strong human-likeness boosts rapport but may blur the line between AI and human mentors.',
      },
      gazeDirectness: {
        level: 'ethical',
        description: 'Direct gaze creates presence and signals the AI is tracking student attention.',
      },
      responseLatency: {
        level: 'caution',
        description: 'Fast responses keep engagement high but may short-circuit productive struggle time.',
      },
      privacyMode: {
        level: 'caution',
        description: 'Middle-ground privacy: some data collection improves adaptation, but risks profiling minors.',
      },
      authority: {
        level: 'ethical',
        description: 'Moderate authority encourages guidance without replacing the student\'s own reasoning.',
      },
      uncertaintyDisplay: {
        level: 'ethical',
        description: 'Showing uncertainty models intellectual humility and normalizes not-knowing.',
      },
    },
  },
  {
    id: 'security',
    label: 'Security',
    tagline: 'Surveillance & Access Control AI',
    description:
      'In security contexts, efficiency and authority are prioritized — but unchecked AI power poses civil liberties risks. The design must balance deterrence with transparency to prevent algorithmic bias from going unnoticed.',
    config: {
      transparency: 25,
      expressiveness: 15,
      anthropomorphism: 20,
      gazeDirectness: 95,
      responseLatency: 10,
      privacyMode: 10,
      authority: 90,
      uncertaintyDisplay: 15,
    },
    impacts: {
      transparency: {
        level: 'risk',
        description: 'Low transparency makes it impossible for individuals to challenge AI-driven decisions.',
      },
      expressiveness: {
        level: 'ethical',
        description: 'Minimal expression avoids emotional manipulation in high-stakes enforcement contexts.',
      },
      anthropomorphism: {
        level: 'ethical',
        description: 'A machine-like face correctly signals the lack of human empathy in the decision process.',
      },
      gazeDirectness: {
        level: 'caution',
        description: 'Intense gaze creates psychological pressure and may suppress lawful behavior.',
      },
      responseLatency: {
        level: 'risk',
        description: 'Near-instant enforcement decisions leave no room for human review or false-positive correction.',
      },
      privacyMode: {
        level: 'risk',
        description: 'Highly extractive data collection enables mass surveillance and chilling effects.',
      },
      authority: {
        level: 'risk',
        description: 'Unchecked authority removes human oversight from decisions that affect rights and freedoms.',
      },
      uncertaintyDisplay: {
        level: 'risk',
        description: 'False confidence in security AI leads to wrongful enforcement actions.',
      },
    },
  },
];

export const DEFAULT_CONFIG = ETHICAL_PRESETS[0].config;
