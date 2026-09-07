"use client";

import React from "react";
import { ComicPanel } from "./ComicPanel";
import { InkButton } from "./InkButton";
import { MessageSquare, Heart, Terminal, Compass, Globe, Sparkles } from "lucide-react";

export function AboutPanel() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      {/* Top Banner Story Panel */}
      <ComicPanel
        caption="CHAPTER LORE // ARCHIVE 001"
        captionBg="coral"
        halftone="default"
        elevation="lg"
        rotation={-0.6}
        className="p-6 md:p-8 bg-[#FFFDF8]"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 shrink-0 bg-[#FF5E57] ink-border ink-shadow flex items-center justify-center rotate-3">
            <Terminal className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-2 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5E57] font-comic">
              ORIGIN ARC: THE GENESIS SPARK
            </span>
            <h3 className="text-2xl md:text-3xl font-black font-comic tracking-wide text-[#121214]">
              "WHY SIT IN SILENT LECTURE HALLS WHEN WE CAN SHIP WORLDS TOGETHER?"
            </h3>
            <p className="text-xs md:text-sm text-zinc-700 leading-relaxed">
              Pixel Nova started as a rebel study group in an empty classroom on a rainy Tuesday. Tired of theoretical slide decks, we gathered to build hands-on prototypes: AI companions, mobile tools, and community games. Today, we are the campus Google Developer Group (GDG) chapter — a sanctuary for builders, artists, and code dreamers.
            </p>
          </div>
        </div>
      </ComicPanel>

      {/* 2 Side-by-Side Comic Story Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guild Manifesto Panel */}
        <ComicPanel
          caption="TENETS OF THE GUILD"
          captionBg="yellow"
          halftone="dense"
          elevation="md"
          rotation={0.8}
          className="p-5 md:p-6 bg-[#FAF6EE]"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF5E57]" />
              <h4 className="text-xl font-black font-comic tracking-wide text-[#121214]">
                THE NOVA MANIFESTO
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-800">
              <li className="flex items-start gap-2 bg-white/75 p-2 ink-border-2">
                <span className="font-black text-[#FF5E57] font-comic">01.</span>
                <span><strong>BUILD OVER TALK:</strong> Shipping a scrappy working demo always triumphs over a polished slide presentation.</span>
              </li>
              <li className="flex items-start gap-2 bg-white/75 p-2 ink-border-2">
                <span className="font-black text-[#4285F4] font-comic">02.</span>
                <span><strong>ZERO GATEKEEPING:</strong> Whether you wrote your first line of Python today or deployed K8s yesterday, there is a seat at our table.</span>
              </li>
              <li className="flex items-start gap-2 bg-white/75 p-2 ink-border-2">
                <span className="font-black text-[#34A853] font-comic">03.</span>
                <span><strong>AESTHETICS MATTER:</strong> Software should not be boring. Make it dynamic, playful, and unforgettable.</span>
              </li>
            </ul>
          </div>
        </ComicPanel>

        {/* Global Connection & Allies Panel */}
        <ComicPanel
          caption="AFFILIATION & REACH"
          captionBg="white"
          dashed={true}
          elevation="md"
          rotation={-0.8}
          className="p-5 md:p-6 bg-[#F5EFE0]"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#4285F4]" />
              <h4 className="text-xl font-black font-comic tracking-wide text-[#121214]">
                POWERED BY GDG COMMUNITY
              </h4>
            </div>

            <p className="text-xs text-zinc-700 leading-relaxed">
              We operate under the global Google Developer Groups (GDG) umbrella. Our guild members receive direct access to Google Developer Experts (GDEs), cloud credits, early-access API tiers, and invitations to regional DevFest summits.
            </p>

            {/* Social / Join Action buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="https://gdg.community.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4285F4] text-white ink-border-2 text-xs font-black uppercase font-comic ink-shadow-sm hover:bg-[#3367d6] transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>GDG Chapter Page</span>
              </a>

              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5865F2] text-white ink-border-2 text-xs font-black uppercase font-comic ink-shadow-sm hover:bg-[#4752c4] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Join Discord</span>
              </a>
            </div>

            <div className="text-[11px] font-bold text-zinc-500 font-mono pt-1">
              LOC: CAMPUS LAB 402 • WEEKLY SYNCS THURSDAYS @ 18:00
            </div>
          </div>
        </ComicPanel>
      </div>
    </div>
  );
}
