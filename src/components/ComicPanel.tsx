"use client";

import React from "react";

interface ComicPanelProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number; // e.g. -1, 1, 0
  caption?: string;
  captionBg?: "yellow" | "coral" | "white" | "black";
  halftone?: "none" | "default" | "dense" | "coral";
  dashed?: boolean;
  elevation?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
  id?: string;
}

export function ComicPanel({
  children,
  className = "",
  rotation = 0,
  caption,
  captionBg = "yellow",
  halftone = "none",
  dashed = false,
  elevation = "md",
  onClick,
  id,
}: ComicPanelProps) {
  const halftoneClass = {
    none: "",
    default: "comic-halftone",
    dense: "comic-halftone-dense",
    coral: "comic-halftone-coral",
  }[halftone];

  const captionColorClass = {
    yellow: "bg-[#FBBC05] text-[#121214]",
    coral: "bg-[#FF5E57] text-white",
    white: "bg-[#FAF6EE] text-[#121214]",
    black: "bg-[#121214] text-[#FAF6EE]",
  }[captionBg];

  const shadowClass = {
    none: "",
    sm: "ink-shadow-sm",
    md: "ink-shadow",
    lg: "ink-shadow-lg",
  }[elevation];

  const borderClass = dashed ? "ink-border-dashed" : "ink-border";

  return (
    <div
      id={id}
      onClick={onClick}
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
      }}
      className={`relative bg-[#FAF6EE] rounded-xs transition-transform duration-200 ${borderClass} ${shadowClass} ${className}`}
    >
      {/* Halftone texture overlay layer */}
      {halftoneClass && (
        <div
          className={`absolute inset-0 pointer-events-none rounded-xs ${halftoneClass} opacity-65`}
        />
      )}

      {/* Caption Box on Panel Corner (Classic Comic Style) */}
      {caption && (
        <div
          className={`absolute -top-3 left-4 z-20 px-3 py-0.5 ink-border text-xs font-black tracking-wider uppercase ink-shadow-sm font-comic ${captionColorClass}`}
        >
          {caption}
        </div>
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
