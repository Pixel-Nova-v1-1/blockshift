"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chapter } from "./ChapterIndicator";
import { PageCornerFold } from "./PageCornerFold";
import { playPageTurnSound } from "@/utils/audio";

interface PageFrameProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onPageChange: (newIndex: number) => void;
  isMuted: boolean;
  children: React.ReactNode;
}

export function PageFrame({
  chapters,
  currentChapterIndex,
  onPageChange,
  isMuted,
  children,
}: PageFrameProps) {
  // Navigation direction: 1 for forward (right), -1 for backward (left)
  const [direction, setDirection] = useState<number>(1);

  const goToNextPage = useCallback(() => {
    if (currentChapterIndex < chapters.length - 1) {
      setDirection(1);
      playPageTurnSound(isMuted);
      onPageChange(currentChapterIndex + 1);
    }
  }, [currentChapterIndex, chapters.length, isMuted, onPageChange]);

  const goToPrevPage = useCallback(() => {
    if (currentChapterIndex > 0) {
      setDirection(-1);
      playPageTurnSound(isMuted);
      onPageChange(currentChapterIndex - 1);
    }
  }, [currentChapterIndex, isMuted, onPageChange]);

  // Keyboard navigation: Left/Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept arrows if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  // Framer Motion 3D Page Turn Variants — Buttery Smooth Physical Paper Flip
  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 60 : -60,
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? "left center" : "right center",
    }),
    center: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: "center center",
      transition: {
        rotateY: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as const },
        x: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as const },
        scale: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as const },
        opacity: { duration: 0.38, ease: "easeOut" as const },
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -60 : 60,
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? "left center" : "right center",
      transition: {
        rotateY: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
        x: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
        scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
        opacity: { duration: 0.3, ease: "easeIn" as const },
      },
    }),
  };

  const hasPrev = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < chapters.length - 1;
  const prevChapter = hasPrev ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = hasNext ? chapters[currentChapterIndex + 1] : null;

  return (
    <div className="relative flex-1 w-full overflow-hidden flex flex-col justify-between perspective-book bg-[#FAF6EE]">
      {/* Subtle Book Spine / Page Texture Illusion on Borders */}
      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none z-30" />
      <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/15 via-black/5 to-transparent pointer-events-none z-30" />

      {/* Main 3D Animated Page Canvas */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 preserve-3d flex items-center justify-center">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentChapterIndex}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              const swipeVelocity = 250;
              if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
                goToNextPage();
              } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
                goToPrevPage();
              }
            }}
            className="w-full h-full flex flex-col justify-center backface-hidden will-change-transform"
          >
            {/* Dynamic Page Curl Drop-Shadow Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 0.52, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-r from-black/15 via-transparent to-black/15 rounded-xs"
            />

            {/* Page Content */}
            <div className="relative w-full h-full">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dog-Ear Corner Fold Navigation Buttons */}
      <PageCornerFold
        direction="left"
        disabled={!hasPrev}
        chapterNumber={prevChapter?.number}
        chapterTitle={prevChapter?.title}
        onClick={goToPrevPage}
      />

      <PageCornerFold
        direction="right"
        disabled={!hasNext}
        chapterNumber={nextChapter?.number}
        chapterTitle={nextChapter?.title}
        onClick={goToNextPage}
      />
    </div>
  );
}
