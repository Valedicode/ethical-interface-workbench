'use client';

import { motion } from 'framer-motion';

interface MouthProps {
  curvature: number;   // -0.3 (slight frown) → 0 (flat) → 1.0 (wide smile)
  glowColor: string;
  strokeWeight: number;
  faceOpacity: number;
}

function buildMouthPath(curvature: number): string {
  // Mouth spans from x=110 to x=190, centered at y=180
  const x1 = 110;
  const x2 = 190;
  const midX = 150;
  const baseY = 180;

  // Control point vertical offset: negative = smile, positive = frown
  const cpOffset = curvature * 38;

  // For very low curvature (robotic/flat), keep a subtle curve
  const cy1 = baseY - cpOffset * 0.5;
  const cy2 = baseY - cpOffset;

  return `M ${x1} ${baseY} C ${x1 + 20} ${cy1}, ${x2 - 20} ${cy1}, ${x2} ${baseY}`;
}

function buildMouthFill(curvature: number): string {
  if (curvature < 0.1) return 'none';
  // Fill only for noticeable smiles
  const x1 = 110;
  const x2 = 190;
  const baseY = 180;
  const cpOffset = curvature * 38;
  const cy1 = baseY - cpOffset * 0.5;

  return `M ${x1} ${baseY} C ${x1 + 20} ${cy1}, ${x2 - 20} ${cy1}, ${x2} ${baseY} Z`;
}

export default function Mouth({ curvature, glowColor, strokeWeight, faceOpacity }: MouthProps) {
  const mouthPath = buildMouthPath(curvature);
  const lipColor = `rgba(${glowColor},0.6)`;
  const strokeColor = `rgba(${glowColor},0.9)`;

  // Mouth open gap: only visible for high curvature
  const teethVisible = curvature > 0.55;
  const teethOpacity = Math.max(0, (curvature - 0.55) / 0.45);

  return (
    <g opacity={faceOpacity}>
      {/* Teeth hint */}
      {teethVisible && (
        <motion.ellipse
          cx={150}
          cy={183}
          rx={24 * teethOpacity}
          ry={6 * teethOpacity}
          fill="white"
          opacity={teethOpacity * 0.85}
          animate={{ rx: 24 * teethOpacity, ry: 6 * teethOpacity, opacity: teethOpacity * 0.85 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
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
          d={buildMouthFill(curvature)}
          fill={lipColor}
          opacity={Math.min(curvature * 0.35, 0.3)}
          animate={{ opacity: Math.min(curvature * 0.35, 0.3), fill: lipColor }}
          transition={{ duration: 0.5 }}
        />
      )}
    </g>
  );
}
