'use client';

import { motion } from 'framer-motion';
import Eyes from './Eyes';
import Mouth from './Mouth';
import type { AnimState } from '@/lib/types';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface FaceCanvasProps {
  animState: AnimState;
  isBlinking: boolean;
  gazeOffset: { x: number; y: number };
}

function buildBrowPath(x1: number, y1: number, x2: number, y2: number, bendAmount: number): string {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - bendAmount;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
}

export default function FaceCanvas({ animState, isBlinking, gazeOffset }: FaceCanvasProps) {
  const {
    glowColor,
    glowStrength,
    faceOpacity,
    strokeWeight,
    mouthCurvature,
    pupilScale,
    browAngle,
    eyeSizeScale,
    eyeRoundness,
    paletteHueShift,
    mouthDetailLevel,
    faceCornerSoftness,
    cutenessLift,
    asymmetryAmount,
  } = animState;

  const faceStroke = `rgba(${glowColor},0.8)`;
  const faceFill = `rgba(${glowColor},0.04)`;
  const hueRotate = `hue-rotate(${paletteHueShift}deg)`;
  const filterStyle = glowStrength > 1
    ? `${hueRotate} drop-shadow(0 0 ${glowStrength}px rgba(${glowColor},0.55))`
    : hueRotate;

  // Softness widens/rounds the jaw; cuteness shortens the lower face —
  // both read against the same base proportions used by the eyes/mouth.
  const faceRx = 118 * lerp(0.92, 1.08, faceCornerSoftness);
  const faceRy = 135 * lerp(1.06, 0.94, faceCornerSoftness) * lerp(1, 0.88, cutenessLift);

  // Symmetry drives how differently the two brows curve/tilt from one another.
  const browBend = lerp(6, 18, faceCornerSoftness);
  const leftBrowPath = buildBrowPath(68, 95, 112, 90, browBend + asymmetryAmount * 0.4);
  const rightBrowPath = buildBrowPath(188, 90, 232, 95, browBend - asymmetryAmount * 0.4);
  const leftBrowRotate = browAngle + asymmetryAmount * 0.5;
  const rightBrowRotate = -browAngle + asymmetryAmount * 0.5;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.svg
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[360px] max-h-[360px]"
        style={{ filter: filterStyle }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Face outline */}
        <motion.ellipse
          cx={150}
          cy={155}
          rx={faceRx}
          ry={faceRy}
          fill={faceFill}
          stroke={faceStroke}
          strokeWidth={strokeWeight}
          opacity={faceOpacity}
          animate={{
            rx: faceRx,
            ry: faceRy,
            fill: faceFill,
            stroke: faceStroke,
            strokeWidth: strokeWeight,
            opacity: faceOpacity,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Forehead / cranium accent */}
        <motion.ellipse
          cx={150}
          cy={90}
          rx={80}
          ry={40}
          fill={`rgba(${glowColor},0.03)`}
          stroke="none"
          opacity={faceOpacity * 0.6}
          animate={{ fill: `rgba(${glowColor},0.03)`, opacity: faceOpacity * 0.6 }}
          transition={{ duration: 0.6 }}
        />

        {/* Nose bridge — minimal line */}
        <motion.line
          x1={150}
          y1={135}
          x2={150}
          y2={158}
          stroke={`rgba(${glowColor},0.3)`}
          strokeWidth={strokeWeight * 0.5}
          strokeLinecap="round"
          opacity={faceOpacity * 0.7}
          animate={{
            stroke: `rgba(${glowColor},0.3)`,
            opacity: faceOpacity * 0.7,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Nostrils */}
        <motion.ellipse
          cx={142}
          cy={162}
          rx={5}
          ry={3}
          fill={`rgba(${glowColor},0.25)`}
          opacity={faceOpacity * 0.6}
          animate={{ fill: `rgba(${glowColor},0.25)`, opacity: faceOpacity * 0.6 }}
          transition={{ duration: 0.6 }}
        />
        <motion.ellipse
          cx={158}
          cy={162}
          rx={5}
          ry={3}
          fill={`rgba(${glowColor},0.25)`}
          opacity={faceOpacity * 0.6}
          animate={{ fill: `rgba(${glowColor},0.25)`, opacity: faceOpacity * 0.6 }}
          transition={{ duration: 0.6 }}
        />

        {/* Eyebrow arcs — angle encodes authority (soft/raised vs furrowed/stern);
            curve encodes facial softness; the two sides differ slightly as
            symmetry drops, so asymmetry is visible in the brows too. */}
        <motion.path
          d={leftBrowPath}
          fill="none"
          stroke={`rgba(${glowColor},0.6)`}
          strokeWidth={strokeWeight * 0.9}
          strokeLinecap="round"
          opacity={faceOpacity}
          style={{ originX: '112px', originY: '90px' }}
          animate={{
            d: leftBrowPath,
            stroke: `rgba(${glowColor},0.6)`,
            opacity: faceOpacity,
            rotate: leftBrowRotate,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d={rightBrowPath}
          fill="none"
          stroke={`rgba(${glowColor},0.6)`}
          strokeWidth={strokeWeight * 0.9}
          strokeLinecap="round"
          opacity={faceOpacity}
          style={{ originX: '188px', originY: '90px' }}
          animate={{
            d: rightBrowPath,
            stroke: `rgba(${glowColor},0.6)`,
            opacity: faceOpacity,
            rotate: rightBrowRotate,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Eyes */}
        <Eyes
          isBlinking={isBlinking}
          gazeOffset={gazeOffset}
          pupilScale={pupilScale}
          glowColor={glowColor}
          strokeWeight={strokeWeight}
          faceOpacity={faceOpacity}
          eyeSizeScale={eyeSizeScale}
          eyeRoundness={eyeRoundness}
          asymmetryAmount={asymmetryAmount}
        />

        {/* Mouth */}
        <Mouth
          curvature={mouthCurvature}
          glowColor={glowColor}
          strokeWeight={strokeWeight}
          faceOpacity={faceOpacity}
          mouthDetailLevel={mouthDetailLevel}
          asymmetryAmount={asymmetryAmount}
        />

        {/* Ear lines */}
        <motion.path
          d="M 32 140 Q 24 160 32 180"
          fill="none"
          stroke={faceStroke}
          strokeWidth={strokeWeight * 0.7}
          strokeLinecap="round"
          opacity={faceOpacity * 0.7}
          animate={{ stroke: faceStroke, opacity: faceOpacity * 0.7 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M 268 140 Q 276 160 268 180"
          fill="none"
          stroke={faceStroke}
          strokeWidth={strokeWeight * 0.7}
          strokeLinecap="round"
          opacity={faceOpacity * 0.7}
          animate={{ stroke: faceStroke, opacity: faceOpacity * 0.7 }}
          transition={{ duration: 0.6 }}
        />
      </motion.svg>
    </div>
  );
}
