"use client";

import React, { useState } from "react";
import { QuestEvent } from "@/data/events";
import { ComicPanel } from "./ComicPanel";
import { SpeechBubble } from "./SpeechBubble";
import { Calendar, MapPin, Users, Gift, Lock, CheckCircle2 } from "lucide-react";

interface QuestPanelProps {
  quest: QuestEvent;
  index: number;
}

export function QuestPanel({ quest, index }: QuestPanelProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Subtle natural comic layout tilt
  const tilt = index % 2 === 0 ? -0.8 : 0.8;

  const isUpcoming = quest.isUpcoming;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((p) => !p)}
    >
      <ComicPanel
        rotation={tilt}
        caption={quest.chapterBeat}
        captionBg={isUpcoming ? "black" : "yellow"}
        halftone={isUpcoming ? "dense" : "default"}
        elevation={isUpcoming ? "sm" : "md"}
        className={`p-4 transition-all duration-200 cursor-pointer ${
          isUpcoming
            ? "grayscale opacity-85 hover:grayscale-0 hover:opacity-100 bg-[#EFE9DC]"
            : "hover:-translate-y-1 hover:shadow-[6px_6px_0px_#121214]"
        }`}
      >
        <div className="flex flex-col h-full justify-between gap-3">
          {/* Top Status & Date Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-black font-comic uppercase tracking-wider text-[#FF5E57]">
                <Calendar className="w-3.5 h-3.5" />
                {quest.date}
              </span>
              <h4 className="text-lg font-black font-comic tracking-wide text-[#121214] leading-tight">
                {quest.title}
              </h4>
            </div>

            {/* Comic Cleared Stamp vs Locked Stamp */}
            {!isUpcoming && quest.clearedStamp && (
              <div className="shrink-0 -rotate-12 px-2.5 py-1 bg-[#22C55E] text-white ink-border-2 text-[10px] font-black tracking-widest uppercase ink-shadow-sm font-comic animate-pulse flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{quest.clearedStamp}</span>
              </div>
            )}

            {isUpcoming && (
              <div className="shrink-0 rotate-6 px-2.5 py-1 bg-[#121214] text-[#FAF6EE] ink-border-2 text-[10px] font-black tracking-widest uppercase ink-shadow-sm font-comic">
                <Lock className="w-3 h-3 inline mr-1" />
                LOCKED ???
              </div>
            )}
          </div>

          {/* Subtitle / Quest Log Description */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-zinc-600 font-comic uppercase tracking-wide">
              {quest.subtitle}
            </p>
            <p className="text-xs text-zinc-700 line-clamp-3 leading-relaxed">
              {quest.blurb}
            </p>
          </div>

          {/* Location & Attendance info */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#121214]/15 text-[11px] font-medium text-zinc-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#4285F4]" />
              {quest.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-[#34A853]" />
              {quest.attendees}
            </span>
          </div>

          {/* Quest Loot / Rewards footer */}
          <div className="mt-1 flex items-center justify-between bg-white/70 ink-border-2 p-2 rounded-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-black text-[#121214] font-comic tracking-wide">
              <Gift className="w-3.5 h-3.5 text-[#FF5E57]" />
              <span>{quest.lootReward}</span>
            </div>

            <div className="flex gap-1">
              {quest.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-[#FAF6EE] text-[9px] font-bold uppercase ink-border-2 text-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ComicPanel>

      {/* Comic Speech Bubble hint for full beat info */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 z-50 pointer-events-none">
        <SpeechBubble
          isVisible={showTooltip}
          tailDirection="bottom-center"
          accent={isUpcoming ? "yellow" : "coral"}
          className="text-xs ink-shadow-lg"
        >
          <div className="font-comic font-black tracking-wide">
            {isUpcoming ? (
              <span>TRANSMISSION ENCRYPTED: Unlock this quest at the next GDG meeting.</span>
            ) : (
              <span>QUEST RECORD: Cleared with highest honors by the Pixel Nova chapter!</span>
            )}
          </div>
        </SpeechBubble>
      </div>
    </div>
  );
}
