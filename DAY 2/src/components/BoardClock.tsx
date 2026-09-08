"use client";

import React, { useState } from "react";
import { useFocusTimer } from "../context/FocusTimerContext";
import { useAudioEffects } from "../hooks/useAudioEffects";
import { useGlitchScramble } from "../hooks/useGlitchScramble";
import { Play, Pause, RotateCcw, Clock, Sliders, Skull, Flame } from "lucide-react";
import { motion } from "framer-motion";

export const BoardClock: React.FC = () => {
  const {
    timeLeft,
    duration,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    setDuration,
    effectiveTier,
    progress,
  } = useFocusTimer();

  const { playChalkClick, playHeartbeat } = useAudioEffects();
  const [showCustomSlider, setShowCustomSlider] = useState(false);

  const currentMinutesVal = Math.round(duration / 60);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Scramble clock readout during severe glitch tiers
  const scrambledTime = useGlitchScramble(timeFormatted, effectiveTier as any);

  const presets = [
    { label: "1m (Test)", value: 60 },
    { label: "10m", value: 600 },
    { label: "25m", value: 1500 },
    { label: "45m", value: 2700 },
    { label: "60m (Max)", value: 3600 },
  ];

  const handleTogglePlay = () => {
    playChalkClick();
    if (isRunning) {
      pauseTimer();
    } else {
      playHeartbeat();
      startTimer();
    }
  };

  const handleReset = () => {
    playChalkClick();
    resetTimer();
  };

  const handlePresetSelect = (val: number) => {
    playChalkClick();
    setDuration(val);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(e.target.value, 10);
    if (!isNaN(mins) && mins >= 1 && mins <= 60) {
      setDuration(mins * 60);
    }
  };

  // SVG Circular progress values
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center select-none py-1">
      {/* Chalk-drawn Clock Ring Container */}
      <div className="relative w-44 h-44 flex items-center justify-center mb-3">
        {/* Background SVG Circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-red-950/40"
            strokeWidth="5"
            strokeDasharray="4 6"
            fill="transparent"
          />
          {/* Animated Chalk Progress Arc */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={effectiveTier >= 2 ? "#ff1133" : "#ff3b14"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "linear" }}
            fill="transparent"
            style={{
              filter:
                effectiveTier >= 2
                  ? "drop-shadow(0 0 10px rgba(255, 17, 51, 0.95))"
                  : "drop-shadow(0 0 8px rgba(255, 59, 20, 0.8))",
            }}
          />
        </svg>

        {/* Center Digital Chalk Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff6633] flex items-center gap-1 mb-1">
            {effectiveTier >= 2 ? (
              <Skull className="w-3 h-3 text-red-500 animate-pulse" />
            ) : (
              <Clock className="w-3 h-3 text-[#ff3b14]" />
            )}
            {effectiveTier >= 2 ? "DREAD CYCLE" : "SURVIVAL TIME"}
          </span>
          <div
            className={`font-chalk text-5xl font-bold tracking-wider chalk-text ${
              effectiveTier >= 2
                ? "font-terminal text-4xl text-[#ff1133] chalk-text-horror animate-pulse"
                : "chalk-text"
            }`}
          >
            {scrambledTime}
          </div>
          <span className="text-[10px] font-mono text-neutral-400 mt-1">
            {Math.round(progress * 100)}% Consumed
          </span>
        </div>
      </div>

      {/* Main Play/Pause/Reset Controls */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleTogglePlay}
          className="px-6 py-2 rounded-full bg-[#ff3b14] hover:bg-[#ff5500] text-black font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(255,59,20,0.6)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span>{timeLeft === 0 ? "Restart" : "Focus"}</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          aria-label="Reset Timer"
          className="p-2.5 rounded-full bg-black/50 hover:bg-white/10 text-neutral-300 border border-white/15 transition-all hover:rotate-[-90deg] cursor-pointer shadow-lg"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowCustomSlider((prev) => !prev)}
          className={`p-2.5 rounded-full border transition-all cursor-pointer shadow-lg ${
            showCustomSlider
              ? "bg-[#ff3b14] text-black border-[#ff3b14] shadow-[0_0_12px_rgba(255,59,20,0.5)]"
              : "bg-black/50 text-neutral-300 border-white/15 hover:border-[#ff3b14]"
          }`}
          title="Customize Time (1 to 60 Minutes)"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>

      {/* Custom Duration Slider (1 to 60 minutes) */}
      {showCustomSlider && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full max-w-[280px] bg-black/80 border border-[#ff3b14]/50 rounded-xl p-3 mb-3 shadow-[0_0_20px_rgba(255,59,20,0.3)] text-left"
        >
          <div className="flex items-center justify-between text-xs font-mono text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1 text-[#ff6633]">
              <Flame className="w-3 h-3" /> Custom Interval:
            </span>
            <span className="font-bold text-white bg-[#ff3b14]/30 px-2 py-0.5 rounded border border-[#ff3b14]">
              {currentMinutesVal} min
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="60"
            step="1"
            value={currentMinutesVal}
            onChange={handleSliderChange}
            className="w-full accent-[#ff3b14] cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
          />

          <div className="flex justify-between text-[9px] font-mono text-neutral-500 mt-1">
            <span>1 min</span>
            <span>15 min</span>
            <span>30 min</span>
            <span>45 min</span>
            <span>60 min</span>
          </div>
        </motion.div>
      )}

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {presets.map((preset) => {
          const isSelected = duration === preset.value;
          return (
            <button
              key={preset.value}
              onClick={() => handlePresetSelect(preset.value)}
              className={`px-2.5 py-1 rounded-full text-xs font-chalk text-base border transition-all cursor-pointer ${
                isSelected
                  ? "border-[#ff3b14] text-[#ff6633] bg-[#ff3b14]/20 shadow-[0_0_10px_rgba(255,59,20,0.4)]"
                  : "border-white/15 text-neutral-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
