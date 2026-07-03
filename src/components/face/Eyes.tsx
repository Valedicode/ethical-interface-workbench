'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

interface EyesProps {
  isBlinking: boolean;
  gazeOffset: { x: number; y: number };
  pupilScale: number;
  glowColor: string;
  strokeWeight: number;
  faceOpacity: number;
}

interface EyeProps {
  cx: number;
  cy: number;
  isBlinking: boolean;
  gazeOffset: { x: number; y: number };
  pupilScale: number;
  glowColor: string;
  strokeWeight: number;
}

function Eye({ cx, cy, isBlinking, gazeOffset, pupilScale, glowColor, strokeWeight }: EyeProps) {
  const lidControls = useAnimation();

  useEffect(() => {
    if (isBlinking) {
      lidControls.start({ scaleY: 0.04, transition: { duration: 0.07, ease: 'easeIn' } });
    } else {
      lidControls.start({ scaleY: 1, transition: { duration: 0.09, ease: 'easeOut' } });
    }
  }, [isBlinking, lidControls]);

  const eyeRx = 18;
  const eyeRy = 13;
  const basePupilR = 7;
  const pupilR = basePupilR * pupilScale;
  const highlightR = pupilR * 0.32;

  const pupilX = cx + gazeOffset.x * 0.55;
  const pupilY = cy + gazeOffset.y * 0.4;

  return (
    <g>
      {/* Sclera (white of eye) */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        rx={eyeRx}
        ry={eyeRy}
        fill="white"
        stroke={`rgba(${glowColor},0.4)`}
        strokeWidth={strokeWeight * 0.6}
        animate={lidControls}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
      />
      {/* Iris */}
      <motion.circle
        cx={pupilX}
        cy={pupilY}
        r={pupilR * 1.35}
        fill={`rgba(${glowColor},0.75)`}
        animate={{
          cx: pupilX,
          cy: pupilY,
          r: pupilR * 1.35,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />
      {/* Pupil */}
      <motion.circle
        cx={pupilX}
        cy={pupilY}
        r={pupilR}
        fill="#0a0a0a"
        animate={{ cx: pupilX, cy: pupilY, r: pupilR }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />
      {/* Catchlight */}
      <motion.circle
        cx={pupilX - pupilR * 0.3}
        cy={pupilY - pupilR * 0.3}
        r={highlightR}
        fill="rgba(255,255,255,0.85)"
        animate={{ cx: pupilX - pupilR * 0.3, cy: pupilY - pupilR * 0.3, r: highlightR }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />
      {/* Upper eyelid (blink cover) */}
      <motion.ellipse
        cx={cx}
        cy={cy - eyeRy * 0.5}
        rx={eyeRx + 1}
        ry={eyeRy * 1.1}
        fill="currentColor"
        className="text-face-skin"
        animate={isBlinking ? { scaleY: 2 } : { scaleY: 0 }}
        style={{ originX: `${cx}px`, originY: `${cy - eyeRy}px` }}
        transition={{ duration: isBlinking ? 0.07 : 0.09 }}
      />
    </g>
  );
}

export default function Eyes({ isBlinking, gazeOffset, pupilScale, glowColor, strokeWeight, faceOpacity }: EyesProps) {
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
      />
      <Eye
        cx={210}
        cy={115}
        isBlinking={isBlinking}
        gazeOffset={gazeOffset}
        pupilScale={pupilScale}
        glowColor={glowColor}
        strokeWeight={strokeWeight}
      />
    </g>
  );
}
