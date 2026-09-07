"use client";

import React from "react";
import { Project } from "@/data/projects";
import { ComicPanel } from "./ComicPanel";
import { ExternalLink, Star, Sparkles, Code2 } from "lucide-react";

interface ProjectPanelProps {
  project: Project;
  index: number;
}

export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const rotation = index % 2 === 0 ? 0.9 : -0.9;

  return (
    <ComicPanel
      rotation={rotation}
      dashed={true}
      caption={project.flashbackTitle}
      captionBg="white"
      halftone="dense"
      elevation="md"
      className="p-5 flex flex-col justify-between bg-[#F7F2E7] hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="space-y-3">
        {/* Flashback header badge & stars */}
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5E57] font-comic flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              ARCHIVED MEMORY ARTIFACT
            </span>
            <h4 className="text-2xl font-black font-comic tracking-wide text-[#121214]">
              {project.title}
            </h4>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#FEF08A] ink-border-2 text-xs font-black ink-shadow-sm font-comic">
            <Star className="w-3.5 h-3.5 fill-[#121214] text-[#121214]" />
            <span>{project.stars}</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs font-bold text-zinc-800 font-comic uppercase tracking-wider bg-white/60 p-1.5 ink-border-2">
          "{project.tagline}"
        </p>

        {/* Narrative Description */}
        <p className="text-xs text-zinc-700 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[#FAF6EE] ink-border-2 text-[10px] font-black uppercase text-[#121214] shadow-[1px_1px_0px_#121214]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer with Architects and Links */}
      <div className="mt-4 pt-3 border-t-2 border-dashed border-[#121214]/30 flex items-center justify-between">
        <div className="text-[11px] text-zinc-600 font-medium">
          <span className="font-bold text-[#121214]">Forged by: </span>
          {project.architects.join(", ")}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white ink-border-2 text-[#121214] hover:bg-[#FF5E57] hover:text-white transition-colors ink-shadow-sm inline-flex items-center justify-center"
            title="View Code on GitHub"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 bg-[#FF5E57] text-white ink-border-2 text-xs font-black uppercase tracking-wider font-comic hover:bg-[#121214] transition-colors ink-shadow-sm"
          >
            <span>Inspect</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </ComicPanel>
  );
}
