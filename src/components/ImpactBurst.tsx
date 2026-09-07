"use client";

import React from "react";
import { motion } from "framer-motion";

interface ImpactBurstProps {
  className?: string;
  color?: string;
  size?: number;
  points?: number;
  rotate?: number;
  animate?: boolean;
}

export function ImpactBurst({
  className = "",
  color = "#FF5E57",
  size = 180,
  points = 16,
  rotate = 0,
  animate = true,
}: ImpactBurstProps) {
  // Generate multi-point comic starburst polygon
  const radiusOuter = size / 2;
  const radiusInner = size * 0.28;
  const center = size / 2;
  const numVertices = points * 2;
  const angleStep = (Math.PI * 2) / numVertices;

  const pointStrings: string[] = [];
  for (let i = 0; i < numVertices; i++) {
    // vary the outer radius slightly for hand-drawn comic punch
    const isOuter = i % 2 === 0;
    const randomVariation = isOuter ? ((i % 3) * 0.1 - 0.05) * radiusOuter : 0;
    const r = isOuter ? radiusOuter + randomVariation : radiusInner;
    const angle = i * angleStep;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    pointStrings.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  const polygonPoints = pointStrings.join(" ");

  return (
    <motion.div
      initial={animate ? { scale: 0.85, rotate: rotate - 10 } : undefined}
      animate={animate ? { scale: [0.95, 1.05, 1], rotate: rotate } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="overflow-visible drop-shadow-[3px_3px_0px_#121214]"
      >
        <polygon
          points={polygonPoints}
          fill={color}
          stroke="#121214"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
