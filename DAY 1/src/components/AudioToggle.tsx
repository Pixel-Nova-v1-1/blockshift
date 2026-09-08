"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export function AudioToggle({ isMuted, onToggle }: AudioToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isMuted ? "Unmute comic sound effects" : "Mute comic sound effects"}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FAF6EE] ink-border-2 ink-shadow-sm text-xs font-black font-comic uppercase tracking-wider text-[#121214] hover:bg-[#FEF08A] transition-colors cursor-pointer select-none"
      title={isMuted ? "Sound: Off (Click to enable manga page sounds)" : "Sound: On"}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-4 h-4 text-zinc-500" />
          <span className="text-[10px] text-zinc-600">FX OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-[#FF5E57] animate-pulse" />
          <span className="text-[10px] text-[#FF5E57]">FX ON</span>
        </>
      )}
    </button>
  );
}
