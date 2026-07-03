'use client';

import { motion } from 'framer-motion';
import Eyes from './Eyes';
import Mouth from './Mouth';
import type { AnimState } from '@/lib/types';

interface FaceCanvasProps {
  animState: AnimState;
  isBlinking: boolean;
  gazeOffset: { x: number; y: number };
}

export default function FaceCanvas({ animState, isBlinking, gazeOffset }: FaceCanvasProps) {
  const {
    glowColor,
    glowStrength,
    faceOpacity,
    strokeWeight,
    mouthCurvature,
    pupilScale,
  } = animState;

  const faceStroke = `rgba(${glowColor},0.8)`;
  const faceFill = `rgba(${glowColor},0.04)`;
  const filterStyle = glowStrength > 1
    ? `drop-shadow(0 0 ${glowStrength}px rgba(${glowColor},0.55))`
    : 'none';

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
          rx={118}
          ry={135}
          fill={faceFill}
          stroke={faceStroke}
          strokeWidth={strokeWeight}
          opacity={faceOpacity}
          animate={{
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

        {/* Eyebrow arcs */}
        <motion.path
          d="M 68 95 Q 90 82 112 90"
          fill="none"
          stroke={`rgba(${glowColor},0.6)`}
          strokeWidth={strokeWeight * 0.9}
          strokeLinecap="round"
          opacity={faceOpacity}
          animate={{
            stroke: `rgba(${glowColor},0.6)`,
            opacity: faceOpacity,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M 188 90 Q 210 82 232 95"
          fill="none"
          stroke={`rgba(${glowColor},0.6)`}
          strokeWidth={strokeWeight * 0.9}
          strokeLinecap="round"
          opacity={faceOpacity}
          animate={{
            stroke: `rgba(${glowColor},0.6)`,
            opacity: faceOpacity,
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
        />

        {/* Mouth */}
        <Mouth
          curvature={mouthCurvature}
          glowColor={glowColor}
          strokeWeight={strokeWeight}
          faceOpacity={faceOpacity}
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
