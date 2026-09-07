"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type TailDirection =
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "top-left"
  | "top-center"
  | "top-right"
  | "left"
  | "right";

interface SpeechBubbleProps {
  children: React.ReactNode;
  tailDirection?: TailDirection;
  className?: string;
  variant?: "speech" | "thought" | "shout";
  accent?: "paper" | "coral" | "yellow" | "white";
  isVisible?: boolean;
}

export function SpeechBubble({
  children,
  tailDirection = "bottom-left",
  className = "",
  variant = "speech",
  accent = "paper",
  isVisible = true,
}: SpeechBubbleProps) {
  const bgClasses = {
    paper: "bg-[#FFFDF7] text-[#121214]",
    coral: "bg-[#FF5E57] text-white",
    yellow: "bg-[#FEF08A] text-[#121214]",
    white: "bg-white text-[#121214]",
  }[accent];

  // SVG Tail generator based on direction
  const renderTail = () => {
    switch (tailDirection) {
      case "bottom-left":
        return (
          <div className="absolute -bottom-3.5 left-5 w-6 h-4 pointer-events-none">
            <svg viewBox="0 0 24 16" className="w-full h-full overflow-visible">
              <polygon
                points="0,0 18,0 4,16"
                className="fill-[#FFFDF7] stroke-[#121214]"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <line x1="0" y1="0" x2="18" y2="0" stroke="#FFFDF7" strokeWidth="4" />
            </svg>
          </div>
        );
      case "bottom-right":
        return (
          <div className="absolute -bottom-3.5 right-5 w-6 h-4 pointer-events-none">
            <svg viewBox="0 0 24 16" className="w-full h-full overflow-visible">
              <polygon
                points="6,0 24,0 20,16"
                className="fill-[#FFFDF7] stroke-[#121214]"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <line x1="6" y1="0" x2="24" y2="0" stroke="#FFFDF7" strokeWidth="4" />
            </svg>
          </div>
        );
      case "bottom-center":
        return (
          <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-6 h-4 pointer-events-none">
            <svg viewBox="0 0 24 16" className="w-full h-full overflow-visible">
              <polygon
                points="4,0 20,0 12,16"
                className="fill-[#FFFDF7] stroke-[#121214]"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <line x1="4" y1="0" x2="20" y2="0" stroke="#FFFDF7" strokeWidth="4" />
            </svg>
          </div>
        );
      case "top-left":
        return (
          <div className="absolute -top-3.5 left-5 w-6 h-4 pointer-events-none">
            <svg viewBox="0 0 24 16" className="w-full h-full overflow-visible">
              <polygon
                points="0,16 18,16 4,0"
                className="fill-[#FFFDF7] stroke-[#121214]"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <line x1="0" y1="16" x2="18" y2="16" stroke="#FFFDF7" strokeWidth="4" />
            </svg>
          </div>
        );
      case "top-right":
        return (
          <div className="absolute -top-3.5 right-5 w-6 h-4 pointer-events-none">
            <svg viewBox="0 0 24 16" className="w-full h-full overflow-visible">
              <polygon
                points="6,16 24,16 20,0"
                className="fill-[#FFFDF7] stroke-[#121214]"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <line x1="6" y1="16" x2="24" y2="16" stroke="#FFFDF7" strokeWidth="4" />
            </svg>
          </div>
        );
      case "left":
        return (
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-4 h-6 pointer-events-none">
            <svg viewBox="0 0 16 24" className="w-full h-full overflow-visible">
              <polygon
                points="16,0 16,18 0,9"
                className="fill-[#FFFDF7] stroke-[#121214]"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <line x1="16" y1="0" x2="16" y2="18" stroke="#FFFDF7" strokeWidth="4" />
            </svg>
          </div>
        );
      case "right":
        return (
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-6 pointer-events-none">
            <svg viewBox="0 0 16 24" className="w-full h-full overflow-visible">
              <polygon
                points="0,0 0,18 16,9"
                className="fill-[#FFFDF7] stroke-[#121214]"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <line x1="0" y1="0" x2="0" y2="18" stroke="#FFFDF7" strokeWidth="4" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const bubbleShape =
    variant === "shout"
      ? "clip-polygon"
      : "rounded-xl";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 4 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className={`relative z-40 p-3.5 ink-border ink-shadow font-sans text-sm ${bubbleShape} ${bgClasses} ${className}`}
        >
          {children}
          {renderTail()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
