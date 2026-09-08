"use client";

import React, { useState, useEffect } from "react";
import { useFocusTimer } from "../context/FocusTimerContext";
import { useAudioEffects } from "../hooks/useAudioEffects";
import { Skull, RotateCcw, Award, Flame, Zap, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export const GlitchOverlay: React.FC = () => {
  const {
    effectiveTier,
    climaxActive,
    isCompleted,
    resetTimer,
    streak,
    totalFocusMinutes,
  } = useFocusTimer();

  const { playSuccessChime, playHeartbeat } = useAudioEffects();
  const [microFlash, setMicroFlash] = useState(false);
  const [invertFlash, setInvertFlash] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Trigger celebration confetti when session finishes
  useEffect(() => {
    if (isCompleted && !climaxActive && !hasCelebrated) {
      setHasCelebrated(true);
      playSuccessChime();
      try {
        confetti({
          particleCount: 85,
          spread: 85,
          origin: { y: 0.6 },
          colors: ["#ff0022", "#990014", "#ffffff", "#ff4400"],
        });
      } catch {
        // Safe fallback
      }
    } else if (!isCompleted) {
      setHasCelebrated(false);
    }
  }, [isCompleted, climaxActive, hasCelebrated, playSuccessChime]);

  // Periodic Micro-Flicker for Tier 1 (33% - 66%)
  useEffect(() => {
    if (effectiveTier === 1) {
      const interval = setInterval(() => {
        if (Math.random() < 0.45) {
          setMicroFlash(true);
          setTimeout(() => setMicroFlash(false), 90);
        }
      }, 6000);
      return () => clearInterval(interval);
    }
    setMicroFlash(false);
  }, [effectiveTier]);

  // Periodic Invert & Slice Flash for Tier 2 (66% - 100%)
  useEffect(() => {
    if (effectiveTier === 2) {
      const interval = setInterval(() => {
        const rand = Math.random();
        if (rand < 0.4) {
          setInvertFlash(true);
          setTimeout(() => setInvertFlash(false), 140);
        } else if (rand < 0.75) {
          setMicroFlash(true);
          setTimeout(() => setMicroFlash(false), 160);
        }
      }, 3500);
      return () => clearInterval(interval);
    }
    setInvertFlash(false);
  }, [effectiveTier]);

  return (
    <>
      {/* Hidden SVG Filter Definition for Glitch Displacement */}
      <svg className="hidden">
        <defs>
          <filter id="deadpixel-displacement">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.95"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={effectiveTier >= 2 ? "16" : "4"}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Tier 1 Red Micro-Flash Overlay */}
      {microFlash && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-red-600/15 mix-blend-color-dodge transition-opacity" />
      )}

      {/* Tier 2 Brief Negative Flash */}
      {invertFlash && (
        <div className="fixed inset-0 pointer-events-none z-50 backdrop-invert backdrop-hue-rotate-180 opacity-90 transition-opacity" />
      )}

      {/* Scanlines & CRT Vignette */}
      {(effectiveTier >= 2 || climaxActive) && (
        <div className="fixed inset-0 pointer-events-none z-30 scanlines-overlay opacity-70" />
      )}
      <div className="fixed inset-0 pointer-events-none z-25 vignette-layer" />

      {/* FULL CLIMAX TAKEOVER (4-second Red CRT Static & Screen Tear) */}
      <AnimatePresence>
        {climaxActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden bg-black/85 backdrop-blur-[3px]"
          >
            {/* Violent Red Sliced screen tear */}
            <div className="absolute inset-0 glitch-slice-effect bg-red-600/25 mix-blend-difference" />

            {/* Heavy CRT static overlay */}
            <div
              className="absolute inset-0 climax-static opacity-70 mix-blend-screen pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,50,50,0.85) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />

            {/* Scanline bars */}
            <div className="absolute inset-0 scanlines-overlay opacity-95" />

            {/* Red & Black Terminal Takeover Banner */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.95, 1.06, 0.97, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="relative z-10 px-8 py-6 rounded-xl bg-black border-2 border-red-600 shadow-[0_0_60px_#ff0022] text-center max-w-lg mx-4"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-2 flex items-center justify-center gap-2">
                <Skull className="w-4 h-4 animate-bounce text-red-600" />
                SYSTEM COGNITIVE COLLAPSE // INTERVAL REACHED
              </div>
              <h2 className="font-mono text-3xl font-extrabold text-white tracking-wider mb-2 glitch-rgb-active">
                REALITY DEVIATION PURGE
              </h2>
              <p className="font-mono text-xs text-red-300">
                [0x666] CLASSROOM SLATE PURGED • YOU SURVIVED THE DREAD CYCLE
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SESSION COMPLETE SETTLED STATE MODAL (Red & Black) */}
      <AnimatePresence>
        {isCompleted && !climaxActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-md bg-[#080203] border-2 border-red-600 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,0,34,0.5)] text-center text-[#dad7ce]">
              {/* Skull Badge Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-950 border-2 border-red-600 flex items-center justify-center shadow-[0_0_25px_#ff0022]">
                <ShieldCheck className="w-8 h-8 text-red-500" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-red-950 text-xs font-mono text-red-400 uppercase tracking-wider mb-2 border border-red-800">
                Survival Cleared
              </div>

              <h2 className="text-3xl font-bold font-chalk text-[#dad7ce] chalk-text mb-2">
                Focus Ritual Completed
              </h2>
              <p className="text-sm text-neutral-400 mb-6">
                The glitch recedes into the shadows. The classroom slate is calm again... until your next focus interval.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-black border border-red-950 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-1 text-red-500 text-xs font-mono mb-1">
                    <Flame className="w-3.5 h-3.5" /> Ritual Streak
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">{streak}</div>
                  <div className="text-[10px] text-neutral-500">Intervals survived</div>
                </div>

                <div className="bg-black border border-red-950 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-1 text-red-400 text-xs font-mono mb-1">
                    <Award className="w-3.5 h-3.5" /> Total Focus
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">{totalFocusMinutes}m</div>
                  <div className="text-[10px] text-neutral-500">In dark classroom</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => resetTimer()}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-black font-extrabold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,0,34,0.6)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Begin Next Survival Interval</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
