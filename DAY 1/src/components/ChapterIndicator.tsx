"use client";

import React, { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
}

interface ChapterIndicatorProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
}

export function ChapterIndicator({
  chapters,
  currentChapterIndex,
  onSelectChapter,
}: ChapterIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentChapter = chapters[currentChapterIndex];

  return (
    <div className="relative inline-block text-left">
      {/* Chapter pill button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF6EE] ink-border-2 ink-shadow-sm hover:bg-[#FFF9E6] transition-colors cursor-pointer select-none"
      >
        <BookOpen className="w-4 h-4 text-[#FF5E57]" />
        <div className="text-left font-comic leading-none">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#FF5E57] block">
            READING PROGRESS
          </span>
          <span className="text-xs font-black tracking-wider text-[#121214] uppercase">
            Ch. {currentChapter.number} — {currentChapter.title}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-700 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Progress Dots Indicator */}
      <div className="hidden sm:flex items-center gap-1.5 mt-1 px-1">
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onSelectChapter(idx)}
            title={`Ch. ${ch.number}: ${ch.title}`}
            aria-label={`Jump to Ch. ${ch.number}: ${ch.title}`}
            className={`h-1.5 rounded-xs transition-all cursor-pointer ${
              idx === currentChapterIndex
                ? "w-6 bg-[#FF5E57] ink-border-2"
                : "w-2.5 bg-zinc-300 hover:bg-zinc-500 border border-zinc-500"
            }`}
          />
        ))}
      </div>

      {/* Dropdown Menu to jump chapters */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-64 bg-[#FFFDF7] ink-border ink-shadow-lg z-50 p-2 space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2 py-1 font-comic border-b">
              Jump to Manga Chapter
            </div>
            {chapters.map((chapter, index) => {
              const isActive = index === currentChapterIndex;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => {
                    onSelectChapter(index);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 transition-colors flex items-center justify-between text-xs font-comic cursor-pointer ${
                    isActive
                      ? "bg-[#FF5E57] text-white font-black ink-border-2"
                      : "hover:bg-[#FEF08A] text-[#121214] font-bold"
                  }`}
                >
                  <div>
                    <span className="opacity-80 mr-1.5">CH. {chapter.number}</span>
                    <span className="uppercase tracking-wider">{chapter.title}</span>
                  </div>
                  {isActive && <span className="text-[10px]">● CURRENT</span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
