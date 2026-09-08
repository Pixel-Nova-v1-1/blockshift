"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useFocusTimer } from "../context/FocusTimerContext";
import { useAudioEffects } from "../hooks/useAudioEffects";
import { ShieldAlert, CheckCircle2, Skull } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const InteractionToast: React.FC = () => {
  const { isAnomalyActive, resolveAnomaly } = useFocusTimer();
  const { playGlitchStatic, playSuccessChime, playHeartbeat } = useAudioEffects();
  const [stabilized, setStabilized] = useState(false);

  const handleFix = () => {
    playGlitchStatic(350, 0.45);
    playHeartbeat();
    setStabilized(true);
    setTimeout(() => {
      playSuccessChime();
      resolveAnomaly();
      setStabilized(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isAnomalyActive && (
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
          className="fixed bottom-20 left-4 sm:left-6 z-50 max-w-sm pointer-events-auto"
        >
          <div className="relative bg-[#0d0605] border-2 border-red-600 rounded-2xl p-4 shadow-[0_0_40px_rgba(255,17,51,0.7)] text-[#dad7ce] overflow-hidden">
            {/* Top header alert */}
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-red-950/80 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-red-500 font-bold tracking-wide animate-pulse">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span>ANOMALOUS ENTITY NOTE</span>
              </div>
              <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-600/60 uppercase">
                URGENT PURGE
              </span>
            </div>

            {/* Visual preview of corrupted note SVG */}
            <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden border border-red-950/60 bg-black flex items-center justify-center">
              <Image
                src="/assets/corrupted_note.svg"
                alt="Corrupted Note Anomaly"
                width={260}
                height={120}
                className="object-contain filter contrast-125"
              />
              {/* Ominous red scanline */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/30 to-transparent h-4 w-full animate-bounce pointer-events-none" />
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              A parasitic memory deviation has adhered to your desk. If not purged, the glitch will swallow the classroom. Click below to exorcise the anomaly.
            </p>

            {/* Button that requires user click */}
            <button
              onClick={handleFix}
              disabled={stabilized}
              className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                stabilized
                  ? "bg-emerald-500 text-black shadow-emerald-500/50"
                  : "bg-red-600 hover:bg-red-500 text-black shadow-[0_0_20px_rgba(255,17,51,0.6)] transform hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {stabilized ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PARASITE PURGED!</span>
                </>
              ) : (
                <>
                  <Skull className="w-4 h-4" />
                  <span>CLICK TO EXORCISE ANOMALY</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
