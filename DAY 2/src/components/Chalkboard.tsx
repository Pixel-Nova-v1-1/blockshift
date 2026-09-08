"use client";

import React from "react";
import Image from "next/image";
import { TodoChecklist } from "./TodoChecklist";
import { BoardClock } from "./BoardClock";
import { useFocusTimer } from "../context/FocusTimerContext";

export const Chalkboard: React.FC = () => {
  const { effectiveTier } = useFocusTimer();

  return (
    <div className="relative w-full max-w-5xl mx-auto my-auto z-10 p-2 sm:p-4 select-none">
      {/* Dark Haunted Wooden Frame */}
      <div className="chalk-board-frame rounded-2xl p-4 sm:p-6 shadow-2xl relative border-4 border-[#25130b]">
        {/* Inner Chalkboard Slate */}
        <div
          className={`relative rounded-xl overflow-hidden bg-[#09130e] min-h-[460px] p-6 sm:p-8 flex flex-col justify-between border-2 border-black/80 shadow-inner transition-all duration-300 ${
            effectiveTier === 1 ? "animate-micro-jitter" : ""
          } ${effectiveTier >= 2 ? "glitch-rgb-active border-red-900/60" : ""}`}
        >
          {/* Real Generated Chalkboard Texture Background Darkened */}
          <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-color-dodge filter contrast-150 brightness-40">
            <Image
              src="/assets/chalkboard.jpg"
              alt="Dark Chalkboard"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Ominous Vignette & Scratch overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%), radial-gradient(circle at 80% 20%, rgba(255,20,20,0.08) 0%, transparent 45%)",
            }}
          />

          {/* Chalkboard Header Title Stamp */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-chalk text-xl chalk-text tracking-wider opacity-90 text-red-100/90 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping" />
                Deadpixel // Classroom 404 — Don&apos;t Turn Around
              </span>
            </div>
            <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2">
              <span className="text-red-500 font-bold">VOID_OS</span>
              <span>v6.66</span>
            </div>
          </div>

          {/* Board Content: 2-Column Split */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-1">
            {/* Left: Interactive Todo List (7 cols) */}
            <div className="md:col-span-7 h-full flex flex-col justify-between md:border-r border-white/10 md:pr-6">
              <TodoChecklist />
            </div>

            {/* Right: Chalkboard Clock / Focus Timer (5 cols) */}
            <div className="md:col-span-5 h-full flex flex-col justify-center items-center">
              <BoardClock />
            </div>
          </div>
        </div>

        {/* Bottom Chalk Tray */}
        <div className="chalk-tray h-6 mt-2 rounded-md mx-6 flex items-center justify-between px-6 border-t border-[#482819]">
          {/* Left Chalk Pieces */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-2.5 bg-[#dad7ce] rounded-sm shadow-sm transform -rotate-2 opacity-80"
              title="Bone Chalk"
            />
            <div
              className="w-10 h-2.5 bg-[#ff3b14] rounded-sm shadow-sm transform rotate-3 shadow-[0_0_8px_rgba(255,59,20,0.6)]"
              title="Blood-Red Chalk"
            />
          </div>

          {/* Felt Chalkboard Eraser */}
          <div className="flex items-center">
            <div
              className="w-16 h-3.5 bg-[#171312] border-t-2 border-[#54301d] rounded-sm shadow-md flex items-center justify-center cursor-default"
              title="Weathered Eraser"
            >
              <div className="w-12 h-1 bg-[#090706] rounded-full opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
