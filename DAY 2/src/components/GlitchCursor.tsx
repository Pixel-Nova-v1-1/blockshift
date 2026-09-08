"use client";

import React, { useEffect, useState } from "react";
import { useFocusTimer } from "../context/FocusTimerContext";

export const GlitchCursor: React.FC = () => {
  const { effectiveTier, climaxActive } = useFocusTimer();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Jitter offsets based on glitch tier
  const jitterAmount = climaxActive ? 8 : effectiveTier === 2 ? 4 : effectiveTier === 1 ? 1.5 : 0;
  const jitterX = jitterAmount > 0 ? (Math.random() * 2 - 1) * jitterAmount : 0;
  const jitterY = jitterAmount > 0 ? (Math.random() * 2 - 1) * jitterAmount : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Red Chromatic Ghost (trails left) */}
      {(effectiveTier >= 1 || climaxActive) && (
        <div
          className="absolute w-6 h-6 rounded-full border border-red-600/80 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-screen"
          style={{
            left: `${pos.x - 3 + jitterX}px`,
            top: `${pos.y + 1 + jitterY}px`,
            boxShadow: "0 0 8px rgba(255, 0, 34, 0.7)",
          }}
        />
      )}

      {/* Cyan Chromatic Ghost (trails right) */}
      {(effectiveTier >= 2 || climaxActive) && (
        <div
          className="absolute w-6 h-6 rounded-full border border-cyan-400/70 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 mix-blend-screen"
          style={{
            left: `${pos.x + 3 - jitterX}px`,
            top: `${pos.y - 1 - jitterY}px`,
            boxShadow: "0 0 8px rgba(0, 240, 255, 0.6)",
          }}
        />
      )}

      {/* Core Cursor Reticle / Dot */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{
          left: `${pos.x + jitterX}px`,
          top: `${pos.y + jitterY}px`,
        }}
      >
        {/* Outer Ring */}
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
            climaxActive
              ? "border-red-500 animate-spin bg-red-600/20"
              : effectiveTier >= 2
              ? "border-red-600 bg-red-950/30"
              : "border-red-500/80"
          }`}
          style={{
            boxShadow: "0 0 12px rgba(255, 0, 34, 0.8)",
          }}
        >
          {/* Inner Crosshair Lines */}
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ff0022]" />
        </div>

        {/* Small Crosshairs */}
        <div className="absolute w-9 h-[1px] bg-red-500/40" />
        <div className="absolute h-9 w-[1px] bg-red-500/40" />
      </div>
    </div>
  );
};
