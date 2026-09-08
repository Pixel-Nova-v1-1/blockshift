"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useFocusTimer } from "../context/FocusTimerContext";
import { useGlitchScramble } from "../hooks/useGlitchScramble";
import { useAudioEffects } from "../hooks/useAudioEffects";
import { ChevronDown, ChevronUp, Skull, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HORROR_DIALOGUES = {
  tier0: [
    "Welcome to Study Hall Station 404. Keep your eyes on the board... no matter what you hear.",
    "The room is quiet. Almost unnaturally quiet. Focus on your objectives.",
    "I'm keeping watch over the corridors. You are safe here... for now.",
  ],
  tier1: [
    "Did you feel that temperature drop? Don't turn around.",
    "The fluorescent bulb is flickering. Keep your focus on the timer.",
    "One-third elapsed. I thought I saw someone sitting in the back row... but it's empty.",
  ],
  tier2: [
    "S-something is bleeding into the chalkboard matrix! [ERROR: 0x666]",
    "DO NOT LOOK AT THE WINDOW. Keep writing. KEEP WRITING!",
    "BZZZZT... The monitor camera has lost signal... WHO IS BEHIND YOU?!",
  ],
  tier3: [
    "[CRITICAL COGNITIVE BREACH] THE CHALKBOARD IS DEVOURING THE ROOM!",
    "0xDEADPIXEL... REBOOTING REALITY MATRIX! YOU SURVIVED THE SESSION!",
  ],
};

export const StudyAgent: React.FC = () => {
  const { effectiveTier, isRunning, progress, isCompleted } = useFocusTimer();
  const { playChalkClick } = useAudioEffects();
  const [isOpen, setIsOpen] = useState(true);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  let activeScript = HORROR_DIALOGUES.tier0;
  if (isCompleted || effectiveTier === 3) {
    activeScript = HORROR_DIALOGUES.tier3;
  } else if (effectiveTier === 2) {
    activeScript = HORROR_DIALOGUES.tier2;
  } else if (effectiveTier === 1) {
    activeScript = HORROR_DIALOGUES.tier1;
  }

  const currentLine = activeScript[dialogueIndex % activeScript.length];
  const displayDialogue = useGlitchScramble(currentLine, effectiveTier as any);

  useEffect(() => {
    const interval = setInterval(() => {
      setDialogueIndex((prev) => prev + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleNextNudge = () => {
    playChalkClick();
    setDialogueIndex((prev) => prev + 1);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm flex flex-col items-end pointer-events-auto select-none">
      {/* Dialogue Speech Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={`mb-2 p-3.5 rounded-2xl shadow-2xl border text-xs max-w-[280px] sm:max-w-[320px] transition-all ${
              effectiveTier >= 2
                ? "bg-black/95 border-red-600 text-red-400 font-terminal shadow-[0_0_25px_rgba(255,17,51,0.5)] animate-pulse"
                : "bg-[#0b120e]/95 backdrop-blur-md border-red-950/70 text-[#dad7ce]"
            }`}
          >
            {/* TA Header Tag */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 mb-2 text-[10px] font-mono text-neutral-400">
              <span className="flex items-center gap-1 text-[#ff3b14] font-semibold uppercase">
                {effectiveTier >= 2 ? (
                  <Skull className="w-3 h-3 text-red-500 animate-bounce" />
                ) : (
                  <Eye className="w-3 h-3 text-[#ff3b14]" />
                )}
                Hall Monitor // Otis [Unit 404]
              </span>
              <span
                className={`px-1 py-0.2 rounded text-[9px] ${
                  effectiveTier >= 2
                    ? "bg-red-950 text-red-300 font-bold border border-red-700"
                    : "bg-black/50 text-neutral-400"
                }`}
              >
                {effectiveTier >= 2 ? "DEMENTED" : "WATCHING"}
              </span>
            </div>

            {/* Speech Content */}
            <p className="leading-relaxed min-h-[40px] break-words">
              &ldquo;{displayDialogue}&rdquo;
            </p>

            {/* Whisper button */}
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
              <button
                onClick={handleNextNudge}
                className="text-[#ff3b14] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Eye className="w-3 h-3" /> Elicit Whisper
              </button>
              <span className="text-neutral-500 font-mono">
                {Math.round(progress * 100)}% elapsed
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Avatar Widget Pill */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex items-center gap-2.5 p-1.5 pr-3 rounded-full cursor-pointer border shadow-2xl transition-all ${
          effectiveTier >= 2
            ? "bg-black border-red-600 shadow-[0_0_20px_rgba(255,17,51,0.8)] animate-pulse"
            : "bg-[#0c1611] border-red-950/80 hover:border-[#ff3b14]"
        }`}
      >
        {/* Mascot Avatar Image */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#ff3b14]/70 bg-black">
          <Image
            src="/assets/hall_monitor.jpg"
            alt="Hall Monitor Mascot"
            fill
            className={`object-cover ${effectiveTier >= 2 ? "filter contrast-150 hue-rotate-180" : ""}`}
          />
          {/* Status Glow Dot */}
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black ${
              effectiveTier >= 2 ? "bg-red-600 animate-ping" : "bg-[#ff3b14]"
            }`}
          />
        </div>

        <div className="text-left">
          <div className="text-xs font-semibold text-white flex items-center gap-1">
            <span>Hall Monitor</span>
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </div>
          <div className="text-[10px] text-neutral-400 font-mono">
            {isRunning ? "Haunting hallways" : "Lurking quietly"}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
