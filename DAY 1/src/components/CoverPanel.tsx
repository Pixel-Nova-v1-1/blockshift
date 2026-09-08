"use client";

import React from "react";
import { ComicPanel } from "./ComicPanel";
import { InkButton } from "./InkButton";
import { ImpactBurst } from "./ImpactBurst";
import { Sparkles, Terminal, BookOpen, Flame, Compass, Shield, ArrowRight } from "lucide-react";

interface CoverPanelProps {
  onStartReading: () => void;
  onJumpToChapter: (index: number) => void;
}

export function CoverPanel({ onStartReading, onJumpToChapter }: CoverPanelProps) {
  return (
    <div className="w-full max-w-5xl mx-auto py-2">
      {/* Outer Comic Book Cover Frame */}
      <ComicPanel
        caption="ISSUE #001 // COLLECTOR'S EDITION"
        captionBg="coral"
        halftone="default"
        elevation="lg"
        className="p-5 sm:p-8 md:p-10 bg-[#FAF6EE] relative overflow-hidden"
      >
        {/* Manga Cover Top Bar (Like Shonen Jump / Marvel) */}
        <div className="flex items-center justify-between border-b-4 border-[#121214] pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#121214] text-[#FAF6EE] text-xs font-black font-comic uppercase tracking-widest -rotate-2">
              GDG COMICS
            </span>
            <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest font-mono hidden sm:inline">
              VOL. 1 • MARCH 2026
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-black font-comic tracking-wider text-zinc-700">
            <span className="hidden md:inline text-[#FF5E57]">100% OPEN SOURCE</span>
            <span className="px-2 py-0.5 bg-[#FEF08A] ink-border-2 text-[10px] uppercase ink-shadow-sm">
              RATED: ALL DEVELOPERS
            </span>
          </div>
        </div>

        {/* Center Splash Layout: Grid of Comic Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left / Main Splash Column */}
          <div className="lg:col-span-8 space-y-5 text-left relative">
            {/* Impact sticker in corner */}
            <div className="absolute -top-6 -left-2 sm:-left-6 pointer-events-none z-20">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FEF08A] ink-border text-xs font-black uppercase text-[#121214] -rotate-12 ink-shadow font-comic">
                <Flame className="w-3.5 h-3.5 text-[#FF5E57]" />
                <span>NEW CHAPTER ARC</span>
              </span>
            </div>

            {/* Giant Comic Wordmark */}
            <div className="space-y-1">
              <div className="text-xs sm:text-sm font-black font-comic uppercase tracking-widest text-[#FF5E57] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>GOOGLE DEVELOPER GROUPS ON CAMPUS</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-comic tracking-wider text-[#121214] uppercase leading-none drop-shadow-[4px_4px_0px_#FF5E57]">
                PIXEL NOVA
              </h1>
              <p className="text-xl sm:text-2xl font-black font-comic text-[#121214] tracking-wide">
                ARC I: <span className="text-[#4285F4]">THE GENESIS SHIFT</span>
              </p>
            </div>

            {/* Comic Caption Box Tagline */}
            <div className="relative p-4 bg-white/90 ink-border ink-shadow font-sans text-xs sm:text-sm text-zinc-800 leading-relaxed max-w-xl">
              <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-[#121214] text-white text-[9px] font-black uppercase font-comic">
                CAPTION: PROLOGUE
              </div>
              "In a world flooded with dry slides and solitary terminals, a guild of campus pioneers unite to forge AI agents, buttery-smooth interfaces, and high-octane hacks. Welcome to Panel Mode."
            </div>

            {/* Big Action CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <div className="relative">
                <InkButton
                  variant="primary"
                  size="xl"
                  withBurst={true}
                  burstColor="#FBBC05"
                  soundEffect="START!"
                  onClick={onStartReading}
                  icon={<ArrowRight className="w-6 h-6 stroke-[3]" />}
                >
                  START READING ➔
                </InkButton>
              </div>

              <InkButton
                variant="paper"
                size="md"
                onClick={() => onJumpToChapter(1)}
              >
                MEET CREW ➔
              </InkButton>

              <InkButton
                variant="black"
                size="md"
                onClick={() => onJumpToChapter(4)}
              >
                JOIN GUILD ➔
              </InkButton>
            </div>
          </div>

          {/* Right Column: Comic Teaser Badges & Art */}
          <div className="lg:col-span-4 space-y-4">
            {/* Manga Character Preview Panel */}
            <div className="p-3 bg-white ink-border ink-shadow rotate-1 hover:rotate-0 transition-transform">
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-comic border-b pb-1 mb-2 flex justify-between">
                <span>INSPECTED CHAPTERS</span>
                <span>CH. 1 - 6</span>
              </div>
              <div className="space-y-2 text-xs font-comic font-black">
                <div
                  onClick={() => onJumpToChapter(1)}
                  className="p-1.5 bg-[#FAF6EE] ink-border-2 hover:bg-[#FEF08A] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span>CH. 2 — THE CREW</span>
                  <span className="text-[#FF5E57] text-[10px]">6 GUILD LEADS ➔</span>
                </div>
                <div
                  onClick={() => onJumpToChapter(2)}
                  className="p-1.5 bg-[#FAF6EE] ink-border-2 hover:bg-[#FEF08A] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span>CH. 3 — QUESTLINE</span>
                  <span className="text-[#4285F4] text-[10px]">6 STORY BEATS ➔</span>
                </div>
                <div
                  onClick={() => onJumpToChapter(3)}
                  className="p-1.5 bg-[#FAF6EE] ink-border-2 hover:bg-[#FEF08A] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span>CH. 4 — FLASHBACKS</span>
                  <span className="text-[#34A853] text-[10px]">PROJECT VAULT ➔</span>
                </div>
                <div
                  onClick={() => onJumpToChapter(4)}
                  className="p-1.5 bg-[#FAF6EE] ink-border-2 hover:bg-[#FEF08A] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span>CH. 5 — CHARACTER CREATION</span>
                  <span className="text-[#FBBC05] text-[10px]">JOIN GUILD ➔</span>
                </div>
              </div>
            </div>

            {/* Guild Stamp / Colophon Badge */}
            <div className="p-3 bg-[#FF5E57] text-white ink-border ink-shadow -rotate-1 text-center font-comic">
              <div className="text-xl font-black uppercase tracking-wider">
                WEEKLY HACK NIGHTS
              </div>
              <div className="text-xs font-bold opacity-90">
                THURSDAYS @ 18:00 • CAMPUS HUB 402
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar of Cover */}
        <div className="mt-8 pt-3 border-t-2 border-[#121214]/20 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-600">
          <div>PUBLISHED BY PIXEL NOVA GDG CHAPTER • POWERED BY GOOGLE DEVELOPER TECHNOLOGIES</div>
          <div className="flex items-center gap-1 font-bold text-[#121214]">
            <span>PRESS</span>
            <kbd className="px-1 bg-zinc-200 border border-zinc-400">➔</kbd>
            <span>OR CLICK CORNER TO TURN PAGE</span>
          </div>
        </div>
      </ComicPanel>
    </div>
  );
}
