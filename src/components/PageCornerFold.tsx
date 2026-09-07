"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageCornerFoldProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  chapterTitle?: string;
  chapterNumber?: number;
}

export function PageCornerFold({
  direction,
  onClick,
  disabled = false,
  chapterTitle,
  chapterNumber,
}: PageCornerFoldProps) {
  if (disabled) return null;

  const isRight = direction === "right";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isRight ? `Turn forward to Chapter ${chapterNumber}` : `Turn back to Chapter ${chapterNumber}`}
      className={`
        fixed z-50 bottom-4 cursor-pointer select-none group
        ${isRight ? "right-4 sm:right-6" : "left-4 sm:left-6"}
      `}
    >
      <div className="relative">
        {/* Comic Corner Fold Shape */}
        <div
          className={`
            relative flex items-center gap-2 px-4 py-2.5 bg-[#FAF6EE] ink-border ink-shadow
            transition-all duration-200 group-hover:bg-[#FF5E57] group-hover:text-white
            ${isRight ? "rounded-l-sm rounded-tr-sm" : "rounded-r-sm rounded-tl-sm"}
          `}
        >
          {!isRight && (
            <ChevronLeft className="w-5 h-5 stroke-[3] group-hover:-translate-x-0.5 transition-transform" />
          )}

          <div className="text-left font-comic leading-none">
            <div className="text-[10px] uppercase font-black tracking-widest text-[#FF5E57] group-hover:text-[#FEF08A]">
              {isRight ? "PAGE TURN ➔" : "❮ TURN BACK"}
            </div>
            {chapterTitle && (
              <div className="text-xs font-black tracking-wider uppercase truncate max-w-[130px] sm:max-w-[180px]">
                {chapterNumber ? `Ch.${chapterNumber} ` : ""}{chapterTitle}
              </div>
            )}
          </div>

          {isRight && (
            <ChevronRight className="w-5 h-5 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
          )}
        </div>

        {/* Diagonal dog-ear crease illusion */}
        <div
          className={`
            absolute -top-2 w-0 h-0 border-solid pointer-events-none
            ${
              isRight
                ? "right-0 border-t-[10px] border-r-[10px] border-t-transparent border-r-[#121214]"
                : "left-0 border-t-[10px] border-l-[10px] border-t-transparent border-l-[#121214]"
            }
          `}
        />
      </div>
    </motion.button>
  );
}
