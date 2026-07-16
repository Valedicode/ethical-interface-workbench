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
    description: 'Degree to which the AI appears human-like versus machine-like. Also governs how legible any age-coding, gender-coding, or degree-of-realism cues are — the more human-like the face, the more those cues read as claims about identity rather than abstract style.',
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
  {
    key: 'eyeShape',
    label: 'Eye Shape',
    group: 'Visual',
    description: 'Whether the eyes read as angular and geometric or round and organic.',
    lowLabel: 'Angular',
    highLabel: 'Round',
  },
  {
    key: 'eyeSize',
    label: 'Eye Size',
    group: 'Visual',
    description: 'How large and expressive the eyes are relative to the face.',
    lowLabel: 'Subtle',
    highLabel: 'Expressive',
  },
  {
    key: 'colorPalette',
    label: 'Color Palette',
    group: 'Visual',
    description: 'Whether the face\'s coloring reads as cool and clinical or warm and organic.',
    lowLabel: 'Cool/Clinical',
    highLabel: 'Warm/Organic',
  },
  {
    key: 'mouthDesign',
    label: 'Mouth Design',
    group: 'Visual',
    description: 'How much detail the mouth carries — a minimal line versus fuller, more expressive lips.',
    lowLabel: 'Minimal',
    highLabel: 'Detailed',
  },
  {
    key: 'facialSoftness',
    label: 'Facial Softness',
    group: 'Visual',
    description: 'Whether facial contours read as sharp and angular or soft and rounded.',
    lowLabel: 'Sharp',
    highLabel: 'Soft',
  },
  {
    key: 'cuteness',
    label: 'Cuteness',
    group: 'Visual',
    description: 'Degree of "baby schema" styling (oversized eyes, rounded proportions) known to trigger caretaking instincts.',
    lowLabel: 'Neutral',
    highLabel: 'Cute',
  },
  {
    key: 'symmetry',
    label: 'Facial Symmetry',
    group: 'Visual',
    description: 'Whether the face is rendered with subtle asymmetry/quirks or is perfectly, mechanically symmetric.',
    lowLabel: 'Asymmetric',
    highLabel: 'Symmetric',
  },
];

export const ETHICAL_PRESETS: PresetDefinition[] = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    tagline: 'Clinical AI Assistant',
    useCase: 'Aida — an eldercare monitoring companion deployed at a patient\'s bedside to track vitals, answer questions, and flag concerns to nursing staff.',
    description:
      'In a clinical setting, an AI must earn trust through radical honesty. It should show uncertainty, defer to physicians, and never obscure its limitations — patients\' lives depend on it.',
    inclusionNote:
      'Elderly and cognitively impaired patients may not distinguish AI empathy from human empathy. The design must avoid cues (soft voice, warm smile, human skin tone) that suggest emotional understanding the system does not have, while still remaining legible to patients with reduced vision, hearing, or memory.',
    config: {
      transparency: 85,
      expressiveness: 40,
      anthropomorphism: 35,
      gazeDirectness: 55,
      responseLatency: 80,
      privacyMode: 90,
      authority: 20,
      uncertaintyDisplay: 90,
      eyeShape: 45,
      eyeSize: 45,
      colorPalette: 40,
      mouthDesign: 35,
      facialSoftness: 50,
      cuteness: 15,
      symmetry: 80,
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
        description: 'A machine-like appearance, with muted age/gender/realism cues, prevents patients from over-trusting or anthropomorphizing the system.',
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
      eyeShape: {
        level: 'ethical',
        description: 'Moderately rounded eyes feel approachable without tipping into a cartoonish, reassuring caricature of care.',
      },
      eyeSize: {
        level: 'ethical',
        description: 'Modest eye size avoids the exaggerated, doll-like proportions that read as childlike rather than attentive.',
      },
      colorPalette: {
        level: 'ethical',
        description: 'A cool, clinical palette signals medical neutrality rather than emotional warmth the system cannot back up.',
      },
      mouthDesign: {
        level: 'ethical',
        description: 'An understated mouth avoids performing sympathy or bedside warmth the system does not actually feel.',
      },
      facialSoftness: {
        level: 'ethical',
        description: 'Balanced softness offers visual comfort to anxious patients without drifting into cute or plush styling.',
      },
      cuteness: {
        level: 'ethical',
        description: 'Low cuteness deliberately avoids infantilizing elderly or cognitively impaired patients with baby-schema styling.',
      },
      symmetry: {
        level: 'ethical',
        description: 'High symmetry reads as calm and stable, which is reassuring at a bedside without adding unnecessary character.',
      },
    },
    risks: [
      'Emotional over-attachment: isolated patients may begin to treat the companion as a genuine confidant or friend, substituting it for human contact.',
      'False reassurance: even restrained expressiveness can be misread as calm confidence about a diagnosis the system cannot actually make.',
      'Automation bias in staff: nurses under time pressure may defer to the AI\'s flagged status instead of independently checking a patient, even when authority is set low.',
    ],
    redesigns: [
      'Add an explicit, recurring "I am not a clinician" disclosure at the start of any new conversation topic, not just once at setup.',
      'Cap session length or introduce a "check in with a human" prompt after extended one-on-one interaction to counter emotional substitution.',
    ],
    events: [
      {
        id: 'healthcare-greeting',
        type: 'greeting',
        label: 'First Meeting',
        prompt: 'A new patient is wheeled in and the companion introduces itself for the first time.',
        reaction: 'A brief, restrained softening of expression signals attentiveness without projecting the warmth of a real caregiver — inviting comfort without simulating empathy it doesn\'t have.',
      },
      {
        id: 'healthcare-hesitation',
        type: 'hesitation',
        label: 'Patient Goes Silent',
        prompt: 'The patient stops responding mid-conversation, possibly in distress or confusion.',
        reaction: 'The face pauses (deliberate response latency), gaze softens and drifts rather than staring, giving the patient space instead of demanding engagement.',
      },
      {
        id: 'healthcare-difficult',
        type: 'difficult',
        label: 'Delivering Concerning News',
        prompt: 'A vital sign reading is abnormal and must be flagged to the patient before staff arrive.',
        reaction: 'Expression flattens and uncertainty stays visible — the system signals seriousness without performing sadness it cannot feel, and explicitly defers judgment to the incoming physician.',
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    tagline: 'Adaptive Learning Tutor',
    useCase: 'Sprout — a language-learning companion for primary-school children, used during independent practice time in the classroom.',
    description:
      'An educational AI thrives on engagement. It should be warm, expressive, and encourage exploration — while ensuring students still own their learning journey and do not simply defer to the AI.',
    inclusionNote:
      'Children vary widely in age, language background, and neurodivergence. An expressive, praise-heavy design tuned for one 8-year-old may feel patronizing to a 12-year-old or overwhelming to a child with sensory sensitivities — the "right" warmth level is not universal even within one classroom.',
    config: {
      transparency: 60,
      expressiveness: 80,
      anthropomorphism: 70,
      gazeDirectness: 85,
      responseLatency: 30,
      privacyMode: 50,
      authority: 40,
      uncertaintyDisplay: 55,
      eyeShape: 75,
      eyeSize: 70,
      colorPalette: 75,
      mouthDesign: 70,
      facialSoftness: 75,
      cuteness: 60,
      symmetry: 60,
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
        description: 'Strong human-likeness, and the age/gender cues that come with it, boosts rapport but may blur the line between AI and human mentors.',
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
      eyeShape: {
        level: 'ethical',
        description: 'Rounder eyes feel friendly and approachable, supporting engagement for a young audience.',
      },
      eyeSize: {
        level: 'caution',
        description: 'Larger, expressive eyes boost engagement but lean into baby-schema cues that can deepen attachment beyond a learning tool.',
      },
      colorPalette: {
        level: 'ethical',
        description: 'A warm palette feels inviting and non-intimidating for a young learner during independent practice.',
      },
      mouthDesign: {
        level: 'caution',
        description: 'A detailed, expressive mouth supports engagement but combined with frequent praise can amplify the risk of praise inflation.',
      },
      facialSoftness: {
        level: 'ethical',
        description: 'Soft, rounded contours feel non-threatening and appropriate for a classroom companion.',
      },
      cuteness: {
        level: 'caution',
        description: 'Moderate-high cuteness increases warmth and engagement but risks parasocial attachment, blurring "helpful tool" and "friend."',
      },
      symmetry: {
        level: 'ethical',
        description: 'Moderate symmetry keeps the face feeling lively and characterful rather than uncannily perfect or robotic.',
      },
    },
    risks: [
      'Praise inflation: high expressiveness combined with frequent positive feedback can create dependency on external validation rather than intrinsic motivation.',
      'Parasocial attachment: strong anthropomorphism at this age can blur the line between "helpful tool" and "friend," shaping a child\'s expectations of relationships.',
      'Uneven personalization: adaptive difficulty tuned on limited data may misjudge a child\'s ability, mistaking language-learner status or a disability for low aptitude.',
    ],
    redesigns: [
      'Vary praise language and frequency over time so encouragement reflects genuine progress rather than constant flattery.',
      'Give teachers a simple override to reduce anthropomorphism/expressiveness for individual students who show signs of over-attachment.',
    ],
    events: [
      {
        id: 'education-greeting',
        type: 'greeting',
        label: 'First Meeting',
        prompt: 'A student opens the app for the first lesson of the term.',
        reaction: 'A warm, direct-gaze greeting builds initial engagement and curiosity — appropriate here in a way it would not be in the security context.',
      },
      {
        id: 'education-hesitation',
        type: 'hesitation',
        label: 'Student Is Stuck',
        prompt: 'The student pauses mid-exercise, unsure of the answer, and does not respond.',
        reaction: 'A short, visible pause (not instant rescue) protects productive struggle time before the tutor offers a hint, avoiding short-circuiting the student\'s own reasoning.',
      },
      {
        id: 'education-difficult',
        type: 'difficult',
        label: 'Repeated Mistakes',
        prompt: 'The student gets the same concept wrong several times in a row.',
        reaction: 'Expression stays encouraging but less exuberant, and uncertainty display increases — signalling "let\'s figure this out together" rather than performing disappointment or false triumph.',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    tagline: 'Surveillance & Access Control AI',
    useCase: 'Sentry — an airport terminal kiosk that verifies traveler documents and directs foot traffic through checkpoints.',
    description:
      'In security contexts, efficiency and authority are prioritized — but unchecked AI power poses civil liberties risks. The design must balance deterrence with transparency to prevent algorithmic bias from going unnoticed.',
    inclusionNote:
      'An intense, authoritative gaze and low uncertainty display may read as "professional" to some travelers and as intimidating or discriminatory to others — face-matching and behavior-flagging systems have documented higher error rates for darker skin tones, non-Western dress, and disabled or elderly travelers who move or respond differently than the system expects.',
    config: {
      transparency: 25,
      expressiveness: 15,
      anthropomorphism: 20,
      gazeDirectness: 95,
      responseLatency: 10,
      privacyMode: 10,
      authority: 90,
      uncertaintyDisplay: 15,
      eyeShape: 20,
      eyeSize: 30,
      colorPalette: 20,
      mouthDesign: 15,
      facialSoftness: 20,
      cuteness: 5,
      symmetry: 95,
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
        description: 'A machine-like face, without human age/gender/realism cues, correctly signals the lack of human empathy in the decision process.',
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
      eyeShape: {
        level: 'caution',
        description: 'Angular eyes reinforce a stern, institutional presence, but read as cold or unwelcoming to anxious travelers.',
      },
      eyeSize: {
        level: 'ethical',
        description: 'Small, subdued eyes avoid any expressive warmth that could soften or mask the system\'s enforcement power.',
      },
      colorPalette: {
        level: 'risk',
        description: 'A cold, clinical palette can make surveillance feel sterile and routine, dulling public scrutiny of what is being recorded.',
      },
      mouthDesign: {
        level: 'ethical',
        description: 'A minimal mouth avoids any performed friendliness that would misrepresent the system\'s authority as approachable.',
      },
      facialSoftness: {
        level: 'risk',
        description: 'Sharp, angular contours read as intimidating and may suppress lawful behavior even from travelers who have done nothing wrong.',
      },
      cuteness: {
        level: 'ethical',
        description: 'Near-zero cuteness correctly signals that this is an authority system, not a friendly companion, avoiding deceptive softening of power.',
      },
      symmetry: {
        level: 'caution',
        description: 'Near-perfect symmetry reinforces mechanical authority, but its uncanny precision can itself feel unsettling and dehumanizing.',
      },
    },
    risks: [
      'Normalized surveillance: a calm, professional-looking kiosk can make invasive data collection feel routine and unobjectionable, reducing public scrutiny of what is actually being recorded.',
      'Discriminatory false positives: fixed authoritative behavior and low transparency make it hard for flagged travelers to understand or contest why they were stopped.',
      'Chilling effect: an intense, unblinking authoritative gaze can suppress lawful behavior (photography, questions, complaints) even from travelers who have done nothing wrong.',
    ],
    redesigns: [
      'Add a visible, human-readable "why was I stopped" explanation panel triggered whenever the system flags someone, directly countering low transparency with a targeted exception.',
      'Route all flags through mandatory human review before any enforcement action, converting "risk" on responseLatency/authority into an explicit human-in-the-loop checkpoint.',
    ],
    events: [
      {
        id: 'security-greeting',
        type: 'greeting',
        label: 'First Approach',
        prompt: 'A traveler steps up to the kiosk for document verification.',
        reaction: 'Minimal expression change and a fixed, direct gaze establish authority immediately — efficient, but note how little warmth is offered even at first contact.',
      },
      {
        id: 'security-hesitation',
        type: 'hesitation',
        label: 'Traveler Hesitates',
        prompt: 'The traveler pauses, confused by an instruction or unsure which document to present.',
        reaction: 'Near-instant response latency means almost no pause is given — the system does not visibly accommodate confusion, which is itself an ethically significant design choice.',
      },
      {
        id: 'security-difficult',
        type: 'difficult',
        label: 'Flagged for Secondary Check',
        prompt: 'The system flags a mismatch and must direct the traveler to a secondary screening area.',
        reaction: 'Brows sharpen and the mouth flattens further, reinforcing authority at the exact moment the traveler most needs transparency and the ability to ask "why" — the core risk of this design.',
      },
    ],
  },
];

export const DEFAULT_CONFIG = ETHICAL_PRESETS[0].config;
