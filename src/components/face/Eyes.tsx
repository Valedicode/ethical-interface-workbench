'use client';

import { motion } from 'framer-motion';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface EyesProps {
  isBlinking: boolean;
  gazeOffset: { x: number; y: number };
  pupilScale: number;
  glowColor: string;
  strokeWeight: number;
  faceOpacity: number;
  eyeSizeScale: number;
  eyeRoundness: number;
  asymmetryAmount: number;
}

interface EyeProps {
  cx: number;
  cy: number;
  isBlinking: boolean;
  gazeOffset: { x: number; y: number };
  pupilScale: number;
  glowColor: string;
  strokeWeight: number;
  eyeSizeScale: number;
  eyeRoundness: number;
  /** -1 for the left eye, +1 for the right eye — asymmetry is mirrored across the two. */
  side: -1 | 1;
  asymmetryAmount: number;
}

function Eye({
  cx,
  cy,
  isBlinking,
  gazeOffset,
  pupilScale,
  glowColor,
  strokeWeight,
  eyeSizeScale,
  eyeRoundness,
  side,
  asymmetryAmount,
}: EyeProps) {
  // Roundness blends the eye between a flatter, more angular "slit" shape
  // (low roundness) and a fuller, near-circular organic shape (high roundness).
  const rxFactor = lerp(1.15, 0.95, eyeRoundness);
  const ryFactor = lerp(0.75, 1.15, eyeRoundness);
  const eyeRx = 18 * rxFactor * eyeSizeScale;
  const eyeRy = 13 * ryFactor * eyeSizeScale;
  const closedRy = 0.6;
  const basePupilR = 7;
  const pupilR = basePupilR * pupilScale * eyeSizeScale;
  const highlightR = pupilR * 0.32;

  // Symmetry drives a small, mirrored vertical/size offset per side; at
  // asymmetryAmount = 0 (perfect symmetry) both eyes render identically.
  const cyOffset = side * asymmetryAmount * 0.6;
  cy += cyOffset;

  const pupilX = cx + gazeOffset.x * 0.55;
  const pupilY = cy + gazeOffset.y * 0.4;

  // Blinking is animated by shrinking the sclera's ry attribute directly
  // (rather than a CSS scaleY transform), so it always stays perfectly
  // centered on (cx, cy) — no transform-origin mismatch that could make
  // the eye appear to jump outside the face outline.
  const clipId = `eye-clip-${cx}-${cy}`;
  const scleraAnimate = { ry: isBlinking ? closedRy : eyeRy };
  const scleraTransition = {
    duration: isBlinking ? 0.09 : 0.12,
    ease: isBlinking ? ('easeIn' as const) : ('easeOut' as const),
  };

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <motion.ellipse
            cx={cx}
            cy={cy}
            rx={eyeRx}
            initial={false}
            animate={scleraAnimate}
            transition={scleraTransition}
          />
        </clipPath>
      </defs>

      {/* Sclera (white of eye) */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        rx={eyeRx}
        fill="white"
        stroke={`rgba(${glowColor},0.4)`}
        strokeWidth={strokeWeight * 0.6}
        initial={false}
        animate={scleraAnimate}
        transition={scleraTransition}
      />

      {/* Iris, pupil, and catchlight are clipped to the same shrinking
          sclera shape, so they disappear smoothly during a blink instead
          of floating free of the eyelids. */}
      <g clipPath={`url(#${clipId})`}>
        <motion.circle
          cx={pupilX}
          cy={pupilY}
          r={pupilR * 1.35}
          fill={`rgba(${glowColor},0.75)`}
          animate={{ cx: pupilX, cy: pupilY, r: pupilR * 1.35 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
        <motion.circle
          cx={pupilX}
          cy={pupilY}
          r={pupilR}
          fill="#0a0a0a"
          animate={{ cx: pupilX, cy: pupilY, r: pupilR }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
        <motion.circle
          cx={pupilX - pupilR * 0.3}
          cy={pupilY - pupilR * 0.3}
          r={highlightR}
          fill="rgba(255,255,255,0.85)"
          animate={{ cx: pupilX - pupilR * 0.3, cy: pupilY - pupilR * 0.3, r: highlightR }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </g>
    </g>
  );
}

export default function Eyes({
  isBlinking,
  gazeOffset,
  pupilScale,
  glowColor,
  strokeWeight,
  faceOpacity,
  eyeSizeScale,
  eyeRoundness,
  asymmetryAmount,
}: EyesProps) {
  return (
    <g opacity={faceOpacity}>
      <Eye
        cx={90}
        cy={115}
        isBlinking={isBlinking}
        gazeOffset={gazeOffset}
        pupilScale={pupilScale}
        glowColor={glowColor}
        strokeWeight={strokeWeight}
        eyeSizeScale={eyeSizeScale}
        eyeRoundness={eyeRoundness}
        side={-1}
        asymmetryAmount={asymmetryAmount}
      />
      <Eye
        cx={210}
        cy={115}
        isBlinking={isBlinking}
        gazeOffset={gazeOffset}
        pupilScale={pupilScale}
        glowColor={glowColor}
        strokeWeight={strokeWeight}
        eyeSizeScale={eyeSizeScale}
        eyeRoundness={eyeRoundness}
        side={1}
        asymmetryAmount={asymmetryAmount}
      />
    </g>
  );
}
