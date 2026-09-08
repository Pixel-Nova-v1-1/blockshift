"use client";

import React, { useState, useEffect } from "react";
import { useFocusTimer, GlitchTier } from "../context/FocusTimerContext";
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Zap, 
  FileWarning,
  Maximize,
  Minimize,
  Skull
} from "lucide-react";

export const DevToolbar: React.FC = () => {
  const {
    devMode,
    toggleDevMode,
    effectiveTier,
    tierOverride,
    setGlitchTierOverride,
    soundEnabled,
    toggleSound,
    resetTimer,
    triggerAnomaly,
    isAnomalyActive,
    streak,
    totalFocusMinutes,
  } = useFocusTimer();

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Browser restriction fallback
    }
  };

  return (
    <header className="w-full z-40 bg-black/90 backdrop-blur-md border-b border-red-950 px-4 py-2.5 text-xs text-neutral-300 flex flex-wrap items-center justify-between gap-3 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      {/* Brand & Concept Tag */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#ff0022]" />
          <h1 className="font-bold tracking-wider text-sm text-white flex items-center gap-1.5 font-mono">
            DEADPIXEL
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-700 uppercase font-sans font-semibold">
              Classroom 404
            </span>
          </h1>
        </div>

        {/* Focus Stats Mini Pill */}
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-red-950 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1">
            <Skull className="w-3 h-3 text-red-500" />
            Streak: <strong className="text-red-300 font-semibold">{streak}</strong>
          </span>
          <span className="text-white/20">•</span>
          <span>
            Survived: <strong className="text-red-300 font-semibold">{totalFocusMinutes}m</strong>
          </span>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="flex items-center flex-wrap gap-2">
        {/* DEV_MODE Toggle */}
        <button
          onClick={toggleDevMode}
          title="Toggle between 60s Demo Mode and 25m Standard Interval"
          className={`px-2.5 py-1 rounded border font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            devMode
              ? "bg-red-950/80 text-red-400 border-red-600 shadow-[0_0_12px_rgba(255,0,34,0.4)]"
              : "bg-black text-neutral-400 border-red-950 hover:border-red-800"
          }`}
        >
          <Zap className="w-3 h-3 text-red-500" />
          <span>{devMode ? "DEMO (60s)" : "PROD (25m)"}</span>
        </button>

        {/* Glitch Tier Scrubber for instant testing */}
        <div className="flex items-center bg-black rounded border border-red-950 p-0.5">
          <span className="px-2 text-[10px] uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1">
            <Terminal className="w-3 h-3 text-red-600" /> Tier:
          </span>
          {([0, 1, 2, 3] as GlitchTier[]).map((tier) => {
            const isActive = tierOverride === tier || (tierOverride === null && effectiveTier === tier);
            const labels = ["Pristine", "Micro", "Severe", "Climax Takeover"];
            return (
              <button
                key={tier}
                onClick={() => setGlitchTierOverride(tierOverride === tier ? null : tier)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                  isActive
                    ? "bg-red-600 text-black font-bold shadow-[0_0_10px_#ff0022]"
                    : "text-neutral-400 hover:text-white hover:bg-red-950/40"
                }`}
                title={`Simulate Tier ${tier} (${labels[tier]})`}
              >
                T{tier}
              </button>
            );
          })}
        </div>

        {/* Trigger Corrupted Note Anomaly */}
        <button
          onClick={triggerAnomaly}
          disabled={isAnomalyActive}
          title="Test corrupted note popup interaction"
          className={`px-2 py-1 rounded border text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
            isAnomalyActive
              ? "bg-red-900 text-red-200 border-red-500"
              : "bg-black text-neutral-400 border-red-950 hover:text-red-300 hover:border-red-800"
          }`}
        >
          <FileWarning className="w-3 h-3 text-red-500" />
          <span className="hidden sm:inline">Anomaly</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="p-1.5 rounded bg-black border border-red-950 hover:border-red-700 text-neutral-300 transition-colors cursor-pointer"
        >
          {isFullscreen ? (
            <Minimize className="w-3.5 h-3.5 text-red-400" />
          ) : (
            <Maximize className="w-3.5 h-3.5 text-red-400" />
          )}
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? "Mute horror ambient & glitch sound" : "Enable horror sound"}
          className="p-1.5 rounded bg-black border border-red-950 hover:border-red-700 text-neutral-300 transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-red-500" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-neutral-600" />
          )}
        </button>

        {/* Reset Session */}
        <button
          onClick={() => resetTimer()}
          title="Reset Session"
          className="p-1.5 rounded bg-black border border-red-950 hover:border-red-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
