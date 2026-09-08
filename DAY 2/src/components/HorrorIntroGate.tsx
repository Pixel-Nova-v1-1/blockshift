"use client";

import React, { useState, useEffect } from "react";
import { Headphones, Skull, Zap, Volume2, AlertTriangle, Maximize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioEffects } from "../hooks/useAudioEffects";

interface HorrorIntroGateProps {
  onEnter: () => void;
}

const TERMINAL_LOGS = [
  "INITIALIZING VOID_KERNEL 0xDEADPIXEL...",
  "ATTACHING SOUND SYNTHESIZER [45Hz SUB-DRONE]...",
  "WARNING: CLASSROOM 404 DETECTED WITH NO RECORDED EXIT...",
  "CALIBRATING NEURAL CHALKBOARD SLATE...",
  "SYNCHRONIZING CRT SCANLINE GENERATOR...",
  "DO NOT LOOK BEHIND YOUR DESK.",
  "CONNECTION ESTABLISHED. WELCOME TO STUDY HALL.",
];

export const HorrorIntroGate: React.FC<HorrorIntroGateProps> = ({ onEnter }) => {
  const [stage, setStage] = useState<"warning" | "loading">("warning");
  const [logIndex, setLogIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { playGlitchStatic, playHeartbeat } = useAudioEffects();

  const handleStart = async () => {
    // Request Fullscreen
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Ignore if browser restricts auto-fullscreen
    }

    playHeartbeat();
    playGlitchStatic(300, 0.4);
    setStage("loading");
  };

  // Loading animation sequence
  useEffect(() => {
    if (stage !== "loading") return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onEnter();
          }, 600);
          return 100;
        }
        // Jump intermittently
        const jump = Math.floor(Math.random() * 22) + 12;
        return Math.min(100, prev + jump);
      });

      setLogIndex((prev) => Math.min(TERMINAL_LOGS.length - 1, prev + 1));
      if (Math.random() < 0.6) {
        playGlitchStatic(90, 0.2);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [stage, onEnter, playGlitchStatic]);

  return (
    <div className="fixed inset-0 z-[9990] bg-black flex items-center justify-center p-4 select-none overflow-hidden font-mono">
      {/* Red Ambient Pulse Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-red-950/30 pointer-events-none" />

      {/* Subtle Scanlines Overlay */}
      <div className="absolute inset-0 scanlines-overlay opacity-60 pointer-events-none" />

      <AnimatePresence mode="wait">
        {stage === "warning" ? (
          <motion.div
            key="warning"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 max-w-lg w-full bg-[#050001] border-2 border-red-700/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,0,34,0.4)] text-center text-red-100"
          >
            {/* Warning Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-600/60 text-red-400 text-xs font-bold uppercase tracking-widest mb-5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Sensory Advisory</span>
            </div>

            {/* Glowing Headphones Icon */}
            <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-red-950/70 border-2 border-red-500 flex items-center justify-center shadow-[0_0_30px_#ff0022]">
                <Headphones className="w-8 h-8 text-red-400 stroke-[2.5]" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider mb-2 font-mono glitch-rgb-active">
              HEADPHONES RECOMMENDED
            </h1>

            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              For full psychological immersion, put on headphones. This virtual study hall features binaural room tone, heartbeats, analog CRT glitches, and sudden audio-visual distortions.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-2 mb-6 text-[11px] text-neutral-400">
              <div className="bg-black/60 border border-red-900/50 rounded-lg p-2 flex items-center justify-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-red-500" />
                <span>Horror Web Audio</span>
              </div>
              <div className="bg-black/60 border border-red-900/50 rounded-lg p-2 flex items-center justify-center gap-1.5">
                <Maximize className="w-3.5 h-3.5 text-red-500" />
                <span>Runs Fullscreen</span>
              </div>
            </div>

            {/* Enter Button */}
            <button
              onClick={handleStart}
              className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-black font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,0,34,0.7)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Skull className="w-4 h-4" />
              <span>ENTER STUDY HALL [FULLSCREEN]</span>
            </button>

            <div className="text-[10px] text-neutral-500 mt-3 font-mono">
              DEADPIXEL // CLASSROOM 404 • THE SLATE IS WATCHING
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 max-w-md w-full bg-black/90 border border-red-800 rounded-xl p-6 shadow-[0_0_50px_rgba(255,0,34,0.6)] text-left font-mono"
          >
            {/* Loading Header */}
            <div className="flex items-center justify-between border-b border-red-900/60 pb-3 mb-4 text-xs">
              <span className="text-red-500 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-red-500 animate-bounce" />
                INITIALIZING STATION 404
              </span>
              <span className="text-red-400 font-extrabold text-sm">{loadingProgress}%</span>
            </div>

            {/* Glitchy Progress Bar */}
            <div className="w-full h-3 bg-red-950/60 rounded-full overflow-hidden mb-4 border border-red-700/60 p-0.5">
              <motion.div
                className="h-full bg-red-600 rounded-full shadow-[0_0_15px_#ff0022]"
                style={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Terminal Scramble Logs */}
            <div className="space-y-1.5 min-h-[110px] text-xs">
              {TERMINAL_LOGS.slice(0, logIndex + 1).map((log, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${
                    idx === logIndex ? "text-red-400 font-bold" : "text-neutral-500"
                  }`}
                >
                  <span className="text-red-600 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-red-900/40 text-[10px] text-neutral-500 flex items-center justify-between">
              <span>SECURITY PROTOCOL: ENGAGED</span>
              <span className="text-red-500 animate-pulse">DO NOT BLINK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
