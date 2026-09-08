"use client";

import React, { useState } from "react";
import { MangaHeader } from "@/components/MangaHeader";
import { PageFrame } from "@/components/PageFrame";
import { CoverPanel } from "@/components/CoverPanel";
import { CrewPanel } from "@/components/CrewPanel";
import { QuestPanel } from "@/components/QuestPanel";
import { ProjectPanel } from "@/components/ProjectPanel";
import { JoinPanel } from "@/components/JoinPanel";
import { AboutPanel } from "@/components/AboutPanel";
import { ComicPanel } from "@/components/ComicPanel";
import { CREW_MEMBERS } from "@/data/crew";
import { QUEST_EVENTS } from "@/data/events";
import { PROJECTS } from "@/data/projects";
import { Chapter } from "@/components/ChapterIndicator";

const CHAPTERS: Chapter[] = [
  { id: "cover", number: 1, title: "Cover", subtitle: "The Genesis Shift" },
  { id: "crew", number: 2, title: "The Crew", subtitle: "Guild Architects" },
  { id: "questline", number: 3, title: "Questline", subtitle: "Campaign Logs" },
  { id: "projects", number: 4, title: "Projects", subtitle: "Flashback Vault" },
  { id: "join", number: 5, title: "Join Guild", subtitle: "Character Creation" },
  { id: "about", number: 6, title: "About & Lore", subtitle: "The Manifesto" },
];

export default function HomePage() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleSelectChapter = (index: number) => {
    setCurrentChapterIndex(index);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#121214]">
      {/* Top Manga Header Bar */}
      <MangaHeader
        chapters={CHAPTERS}
        currentChapterIndex={currentChapterIndex}
        onSelectChapter={handleSelectChapter}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
      />

      {/* Main 3D Page Flip Reader Container */}
      <PageFrame
        chapters={CHAPTERS}
        currentChapterIndex={currentChapterIndex}
        onPageChange={handleSelectChapter}
        isMuted={isMuted}
      >
        {/* CHAPTER 1: COVER */}
        {currentChapterIndex === 0 && (
          <CoverPanel
            onStartReading={() => handleSelectChapter(1)}
            onJumpToChapter={handleSelectChapter}
          />
        )}

        {/* CHAPTER 2: THE CREW */}
        {currentChapterIndex === 1 && (
          <div className="w-full max-w-6xl mx-auto py-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-3 border-[#121214] pb-2">
              <div>
                <span className="px-2.5 py-0.5 bg-[#FF5E57] text-white text-[10px] font-black uppercase tracking-widest font-comic ink-border-2 inline-block -rotate-1">
                  CHAPTER 02 // CHARACTER PANELS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-comic tracking-wide uppercase text-[#121214]">
                  MEET THE CREW
                </h2>
              </div>
              <p className="text-xs font-comic font-bold text-zinc-600 uppercase tracking-wide">
                Tap or hover characters to inspect stats & bio dialogue
              </p>
            </div>

            {/* Grid of Character Comic Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {CREW_MEMBERS.map((member, index) => (
                <CrewPanel key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* CHAPTER 3: QUESTLINE */}
        {currentChapterIndex === 2 && (
          <div className="w-full max-w-6xl mx-auto py-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-3 border-[#121214] pb-2">
              <div>
                <span className="px-2.5 py-0.5 bg-[#4285F4] text-white text-[10px] font-black uppercase tracking-widest font-comic ink-border-2 inline-block -rotate-1">
                  CHAPTER 03 // STORY BEATS IN READING ORDER
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-comic tracking-wide uppercase text-[#121214]">
                  THE QUESTLINE
                </h2>
              </div>
              <p className="text-xs font-comic font-bold text-zinc-600 uppercase tracking-wide">
                Color = Cleared Quests • Greyscale = Upcoming Locked Missions
              </p>
            </div>

            {/* Grid of Sequential Story Beats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {QUEST_EVENTS.map((quest, index) => (
                <QuestPanel key={quest.id} quest={quest} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* CHAPTER 4: PROJECTS (FLASHBACK VAULT) */}
        {currentChapterIndex === 3 && (
          <div className="w-full max-w-5xl mx-auto py-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-3 border-[#121214] pb-2">
              <div>
                <span className="px-2.5 py-0.5 bg-[#34A853] text-white text-[10px] font-black uppercase tracking-widest font-comic ink-border-2 inline-block -rotate-1">
                  CHAPTER 04 // FLASHBACK PANELS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-comic tracking-wide uppercase text-[#121214]">
                  FLASHBACK VAULT: PAST BUILDS
                </h2>
              </div>
              <p className="text-xs font-comic font-bold text-zinc-600 uppercase tracking-wide">
                Memory snippets from hackathons & open source releases
              </p>
            </div>

            {/* Grid of Flashback Panels with Dashed Borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {PROJECTS.map((project, index) => (
                <ProjectPanel key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* CHAPTER 5: JOIN GUILD (CHARACTER CREATION) */}
        {currentChapterIndex === 4 && (
          <div className="w-full max-w-4xl mx-auto py-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-3 border-[#121214] pb-2">
              <div>
                <span className="px-2.5 py-0.5 bg-[#FBBC05] text-[#121214] text-[10px] font-black uppercase tracking-widest font-comic ink-border-2 inline-block -rotate-1">
                  CHAPTER 05 // CHARACTER CREATION
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-comic tracking-wide uppercase text-[#121214]">
                  ENLIST IN THE GUILD
                </h2>
              </div>
              <p className="text-xs font-comic font-bold text-zinc-600 uppercase tracking-wide">
                Forge your adventurer license and join Pixel Nova GDG
              </p>
            </div>

            <div className="pt-2">
              <JoinPanel />
            </div>
          </div>
        )}

        {/* CHAPTER 6: ABOUT & LORE */}
        {currentChapterIndex === 5 && (
          <div className="w-full max-w-5xl mx-auto py-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-3 border-[#121214] pb-2">
              <div>
                <span className="px-2.5 py-0.5 bg-[#121214] text-[#FAF6EE] text-[10px] font-black uppercase tracking-widest font-comic ink-border-2 inline-block -rotate-1">
                  CHAPTER 06 // EPILOGUE & LORE
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-comic tracking-wide uppercase text-[#121214]">
                  THE NOVA CHRONICLES
                </h2>
              </div>
              <p className="text-xs font-comic font-bold text-zinc-600 uppercase tracking-wide">
                The origin story, manifesto, and community alliances
              </p>
            </div>

            <div className="pt-2">
              <AboutPanel />
            </div>
          </div>
        )}
      </PageFrame>
    </main>
  );
}
