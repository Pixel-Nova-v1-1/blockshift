"use client";

import React, { useState } from "react";
import { CrewMember } from "@/data/crew";
import { ComicPanel } from "./ComicPanel";
import { SpeechBubble } from "./SpeechBubble";
import { Sparkles, Zap, Coffee, Code2 } from "lucide-react";

interface CrewPanelProps {
  member: CrewMember;
  index: number;
}

export function CrewPanel({ member, index }: CrewPanelProps) {
  const [isBioOpen, setIsBioOpen] = useState(false);

  // Alternate panel tilt slightly for natural comic feel
  const rotations = [-1.2, 0.8, -0.6, 1.1, -1.0, 0.7];
  const rotation = rotations[index % rotations.length];

  // Stylized SVG character avatar per member
  const renderAvatar = () => {
    return (
      <div
        className={`w-full h-44 relative flex items-center justify-center overflow-hidden bg-gradient-to-b ${member.accentBg} ink-border-2 rounded-xs`}
      >
        {/* Halftone texture inside portrait */}
        <div className="absolute inset-0 comic-halftone opacity-40 pointer-events-none" />

        {/* Speed lines subtle background */}
        <div className="absolute inset-0 manga-action-lines opacity-25 pointer-events-none" />

        {/* Character Illustration SVG */}
        <svg
          viewBox="0 0 160 160"
          className="w-36 h-36 relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Head & Hair */}
          <circle cx="80" cy="70" r="44" fill="#FFE0BD" stroke="#121214" strokeWidth="4" />
          
          {/* Distinctive hair/accessories by member */}
          {member.id === "maya-nova" && (
            <g>
              {/* Anime bangs & high ponytail */}
              <path
                d="M36 60 Q80 20 124 60 Q105 35 80 40 Q55 35 36 60 Z"
                fill="#FF5E57"
                stroke="#121214"
                strokeWidth="4"
              />
              <path
                d="M110 45 C135 30 150 50 145 75 C135 65 125 55 110 45 Z"
                fill="#FF5E57"
                stroke="#121214"
                strokeWidth="3.5"
              />
              {/* Alchemist goggles */}
              <rect x="52" y="55" width="22" height="14" rx="4" fill="#FEF08A" stroke="#121214" strokeWidth="3" />
              <rect x="86" y="55" width="22" height="14" rx="4" fill="#FEF08A" stroke="#121214" strokeWidth="3" />
              <line x1="74" y1="62" x2="86" y2="62" stroke="#121214" strokeWidth="3" />
            </g>
          )}

          {member.id === "alex-rivera" && (
            <g>
              {/* Spiky anime hair */}
              <path
                d="M32 65 L48 28 L64 42 L80 18 L96 42 L112 28 L128 65 Q80 45 32 65 Z"
                fill="#4285F4"
                stroke="#121214"
                strokeWidth="4"
              />
              {/* Cyber visor */}
              <path
                d="M48 64 Q80 58 112 64 L110 74 Q80 70 50 74 Z"
                fill="#38BDF8"
                stroke="#121214"
                strokeWidth="3.5"
              />
            </g>
          )}

          {member.id === "kenji-sato" && (
            <g>
              {/* Messy genius hair */}
              <path
                d="M34 68 Q50 25 80 26 Q110 25 126 68 Q118 45 80 44 Q42 45 34 68 Z"
                fill="#15803D"
                stroke="#121214"
                strokeWidth="4"
              />
              {/* Sleek round wireframe glasses */}
              <circle cx="63" cy="68" r="11" fill="none" stroke="#121214" strokeWidth="3.5" />
              <circle cx="97" cy="68" r="11" fill="none" stroke="#121214" strokeWidth="3.5" />
              <line x1="74" y1="68" x2="86" y2="68" stroke="#121214" strokeWidth="3.5" />
            </g>
          )}

          {member.id === "priya-sharma" && (
            <g>
              {/* Elegant twin braids with cloud pins */}
              <path
                d="M36 62 Q80 26 124 62 Q80 42 36 62 Z"
                fill="#D97706"
                stroke="#121214"
                strokeWidth="4"
              />
              {/* Cloud headpiece badge */}
              <circle cx="118" cy="48" r="7" fill="#FEF08A" stroke="#121214" strokeWidth="3" />
              <circle cx="128" cy="48" r="5" fill="#FEF08A" stroke="#121214" strokeWidth="2.5" />
            </g>
          )}

          {member.id === "taro-chen" && (
            <g>
              {/* Tech headset & cap */}
              <path
                d="M40 50 Q80 30 120 50 L124 58 L36 58 Z"
                fill="#7C3AED"
                stroke="#121214"
                strokeWidth="4"
              />
              {/* Headset arc */}
              <path d="M42 66 Q80 20 118 66" fill="none" stroke="#121214" strokeWidth="4" />
              <rect x="36" y="62" width="10" height="18" rx="3" fill="#A855F7" stroke="#121214" strokeWidth="3" />
              <rect x="114" y="62" width="10" height="18" rx="3" fill="#A855F7" stroke="#121214" strokeWidth="3" />
            </g>
          )}

          {member.id === "zara-mansoor" && (
            <g>
              {/* Wild anime hair with star clip */}
              <path
                d="M30 68 Q50 18 80 20 Q110 18 130 68 Q98 38 80 42 Q62 38 30 68 Z"
                fill="#DB2777"
                stroke="#121214"
                strokeWidth="4"
              />
              {/* Star hairpin */}
              <polygon points="120,40 124,48 132,48 126,53 129,61 121,56 113,61 116,53 110,48 118,48" fill="#FEF08A" stroke="#121214" strokeWidth="2.5" />
            </g>
          )}

          {/* Anime expressive eyes */}
          <ellipse cx="64" cy="72" rx="4.5" ry="6.5" fill="#121214" />
          <ellipse cx="96" cy="72" rx="4.5" ry="6.5" fill="#121214" />
          <circle cx="62.5" cy="70" r="2" fill="white" />
          <circle cx="94.5" cy="70" r="2" fill="white" />

          {/* Cheerful anime smile */}
          <path d="M72 88 Q80 94 88 88" fill="none" stroke="#121214" strokeWidth="3.5" strokeLinecap="round" />

          {/* Comic blush marks */}
          <line x1="50" y1="80" x2="56" y2="82" stroke="#FF5E57" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="104" y1="82" x2="110" y2="80" stroke="#FF5E57" strokeWidth="2.5" strokeLinecap="round" />

          {/* Torso & collar */}
          <path
            d="M44 114 Q80 106 116 114 L128 160 L32 160 Z"
            fill="#FAF6EE"
            stroke="#121214"
            strokeWidth="4"
          />
          <path d="M70 114 L80 134 L90 114" fill="none" stroke="#121214" strokeWidth="3.5" />
        </svg>

        {/* Level badge in corner of portrait */}
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#121214] text-[#FAF6EE] text-[10px] font-black tracking-wider uppercase ink-border-2 rounded-xs">
          LVL {member.level}
        </div>

        {/* Hero codename tag */}
        <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-white text-[#121214] text-[11px] font-black uppercase ink-border-2 ink-shadow-sm font-comic">
          {member.heroName}
        </div>
      </div>
    );
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsBioOpen(true)}
      onMouseLeave={() => setIsBioOpen(false)}
      onClick={() => setIsBioOpen((prev) => !prev)}
    >
      <ComicPanel
        rotation={rotation}
        caption={member.guildClass}
        captionBg="coral"
        elevation="md"
        className="p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_#121214]"
      >
        {/* Character Portrait */}
        {renderAvatar()}

        {/* Member Details */}
        <div className="mt-3 space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-black font-comic tracking-wide text-[#121214]">
              {member.name}
            </h3>
            <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
              {member.role.split("&")[0]}
            </span>
          </div>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {member.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 bg-[#FFFDF7] ink-border-2 text-[10px] font-black tracking-wide uppercase text-[#121214]"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Quick Stats Meters */}
          <div className="pt-2 border-t-2 border-[#121214]/15 grid grid-cols-3 gap-1.5 text-[10px] font-mono">
            <div className="flex items-center gap-1">
              <Code2 className="w-3 h-3 text-[#FF5E57]" />
              <span className="font-bold">{member.stats.code}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#FBBC05]" />
              <span className="font-bold">{member.stats.design}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Coffee className="w-3 h-3 text-[#4285F4]" />
              <span className="font-bold">{member.stats.caffeine}%</span>
            </div>
          </div>

          {/* Tap/Hover Hint */}
          <div className="text-[10px] font-bold text-center uppercase tracking-widest text-[#FF5E57] pt-1 opacity-80 group-hover:opacity-100 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{isBioOpen ? "Bio Active" : "Tap for Dialogue"}</span>
          </div>
        </div>
      </ComicPanel>

      {/* Floating Speech Bubble Tooltip with Bio and Catchphrase */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 z-50 pointer-events-none">
        <SpeechBubble
          isVisible={isBioOpen}
          tailDirection="bottom-center"
          accent="white"
          className="ink-shadow-lg"
        >
          <div className="space-y-1.5 text-left">
            <p className="font-comic font-black text-xs text-[#FF5E57] tracking-wider uppercase">
              "{member.catchphrase}"
            </p>
            <p className="text-xs text-zinc-700 leading-snug font-sans">
              {member.bio}
            </p>
          </div>
        </SpeechBubble>
      </div>
    </div>
  );
}
