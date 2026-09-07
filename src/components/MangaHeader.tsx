"use client";

import React from "react";
import { ChapterIndicator, Chapter } from "./ChapterIndicator";
import { AudioToggle } from "./AudioToggle";
import { Sparkles, Terminal } from "lucide-react";

interface MangaHeaderProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function MangaHeader({
  chapters,
  currentChapterIndex,
  onSelectChapter,
  isMuted,
  onToggleMute,
}: MangaHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF6EE]/95 backdrop-blur-xs border-b-4 border-[#121214] px-4 sm:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Club Manga Title Wordmark */}
        <div
          onClick={() => onSelectChapter(0)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 bg-[#FF5E57] ink-border ink-shadow-sm flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black font-comic tracking-wider text-[#121214] group-hover:text-[#FF5E57] transition-colors leading-none">
                PIXEL NOVA
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.5 bg-[#4285F4] text-white text-[9px] font-black uppercase tracking-wider ink-border-2 font-comic -rotate-2">
                GDG CLUB
              </span>
            </div>
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block font-mono">
              VOL. 01 // PANEL MODE
            </span>
          </div>
        </div>

        {/* Center: Chapter Progress Indicator */}
        <div className="flex items-center gap-3">
          <ChapterIndicator
            chapters={chapters}
            currentChapterIndex={currentChapterIndex}
            onSelectChapter={onSelectChapter}
          />
        </div>

        {/* Right: Controls (Sound toggle, Keyboard hint, Quick Join) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-white ink-border-2 text-[10px] font-mono text-zinc-600">
            <span>⌨</span>
            <span>USE</span>
            <kbd className="px-1 py-0.2 bg-zinc-200 text-[#121214] font-bold rounded-xs">←</kbd>
            <kbd className="px-1 py-0.2 bg-zinc-200 text-[#121214] font-bold rounded-xs">→</kbd>
            <span>TO FLIP</span>
          </div>

          <AudioToggle isMuted={isMuted} onToggle={onToggleMute} />

          {currentChapterIndex !== 4 && (
            <button
              type="button"
              onClick={() => onSelectChapter(4)}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-[#FF5E57] text-white ink-border-2 text-xs font-black uppercase tracking-wider font-comic ink-shadow-sm hover:bg-[#ff716b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>JOIN GUILD</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
