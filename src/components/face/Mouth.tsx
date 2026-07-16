'use client';

import { motion } from 'framer-motion';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface MouthProps {
  curvature: number;   // -0.3 (slight frown) → 0 (flat) → 1.0 (wide smile)
  glowColor: string;
  strokeWeight: number;
  faceOpacity: number;
  mouthDetailLevel: number;  // 0 (minimal single line) → 1 (fuller, detailed lips)
  asymmetryAmount: number;   // 0 (perfect symmetry) → up to ~6px midpoint offset
}

function buildMouthPath(curvature: number, midXOffset: number): string {
  // Mouth spans from x=110 to x=190, centered at y=180
  const x1 = 110;
  const x2 = 190;
  const baseY = 180;

  // Control point vertical offset: negative = smile, positive = frown
  const cpOffset = curvature * 38;
  const cy1 = baseY - cpOffset * 0.5;

  return `M ${x1} ${baseY} C ${x1 + 20 + midXOffset} ${cy1}, ${x2 - 20 + midXOffset} ${cy1}, ${x2} ${baseY}`;
}

function buildMouthFill(curvature: number, midXOffset: number): string {
  if (curvature < 0.1) return 'none';
  // Fill only for noticeable smiles
  const x1 = 110;
  const x2 = 190;
  const baseY = 180;
  const cpOffset = curvature * 38;
  const cy1 = baseY - cpOffset * 0.5;

  return `M ${x1} ${baseY} C ${x1 + 20 + midXOffset} ${cy1}, ${x2 - 20 + midXOffset} ${cy1}, ${x2} ${baseY} Z`;
}

function buildLowerLipPath(curvature: number, midXOffset: number): string {
  // A shallow lower-lip curve sitting just below the main mouth stroke,
  // only meaningful once mouthDetailLevel adds it to the render.
  const x1 = 114;
  const x2 = 186;
  const baseY = 183;
  const cpOffset = curvature * 14 + 6;

  return `M ${x1} ${baseY} Q ${150 + midXOffset} ${baseY + cpOffset}, ${x2} ${baseY}`;
}

export default function Mouth({
  curvature,
  glowColor,
  strokeWeight,
  faceOpacity,
  mouthDetailLevel,
  asymmetryAmount,
}: MouthProps) {
  const midXOffset = asymmetryAmount * 1.1;
  const mouthPath = buildMouthPath(curvature, midXOffset);
  const lowerLipPath = buildLowerLipPath(curvature, midXOffset);
  const lipColor = `rgba(${glowColor},0.6)`;
  const strokeColor = `rgba(${glowColor},0.9)`;

  // A more detailed mouth design reveals teeth at lower curvature thresholds;
  // a minimal design keeps the mouth a plain line even for a wide smile.
  const teethThreshold = lerp(0.85, 0.4, mouthDetailLevel);
  const teethVisible = curvature > teethThreshold;
  const teethOpacity = Math.max(0, (curvature - teethThreshold) / (1 - teethThreshold));
  const lowerLipOpacity = Math.max(0, (mouthDetailLevel - 0.3) / 0.7) * 0.5;

  return (
    <g opacity={faceOpacity}>
      {/* Teeth hint */}
      {teethVisible && (
        <motion.ellipse
          cx={150 + midXOffset}
          cy={183}
          rx={24 * teethOpacity}
          ry={6 * teethOpacity}
          fill="white"
          opacity={teethOpacity * 0.85}
          animate={{ rx: 24 * teethOpacity, ry: 6 * teethOpacity, opacity: teethOpacity * 0.85 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
      {/* Lower lip — only rendered as mouthDesign moves toward "detailed" */}
      {lowerLipOpacity > 0.02 && (
        <motion.path
          d={lowerLipPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWeight * 0.8}
          strokeLinecap="round"
          opacity={lowerLipOpacity}
          animate={{ d: lowerLipPath, opacity: lowerLipOpacity }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
      {/* Mouth stroke */}
      <motion.path
        d={mouthPath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWeight * 1.2}
        strokeLinecap="round"
        animate={{ d: mouthPath, stroke: strokeColor, strokeWidth: strokeWeight * 1.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      {/* Subtle lip color fill for expressive states */}
      {curvature > 0.1 && (
        <motion.path
          d={buildMouthFill(curvature, midXOffset)}
          fill={lipColor}
          opacity={Math.min(curvature * 0.35, 0.3) * lerp(0.5, 1, mouthDetailLevel)}
          animate={{ opacity: Math.min(curvature * 0.35, 0.3) * lerp(0.5, 1, mouthDetailLevel), fill: lipColor }}
          transition={{ duration: 0.5 }}
        />
      )}
    </g>
  );
}
