"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Chalkboard } from "./Chalkboard";
import { useFocusTimer } from "../context/FocusTimerContext";
import { motion } from "framer-motion";

export const Classroom: React.FC = () => {
  const { effectiveTier } = useFocusTimer();

  // Floating eerie ash / spectral motes
  const ashParticles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: `${(i * 37) % 96 + 2}%`,
      y: `${(i * 41) % 92 + 4}%`,
      size: (i % 3) * 1.5 + 2,
      duration: 10 + (i % 7) * 3,
      delay: (i % 5) * 0.9,
    }));
  }, []);

  return (
    <main className="relative flex-1 w-full min-h-[calc(100vh-48px)] flex items-center justify-center p-2 sm:p-6 overflow-hidden bg-[#040705]">
      {/* Dark Eerie Classroom Backdrop with Desaturation & Darkness */}
      <div className="absolute inset-0 opacity-15 pointer-events-none filter contrast-125 brightness-50 grayscale-40 scale-105">
        <Image
          src="/assets/classroom.jpg"
          alt="Haunted Classroom"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Spooky Fluorescent Flickering Light Overhead */}
      <div
        aria-hidden="true"
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[70vw] max-w-3xl h-36 bg-gradient-to-b from-red-500/10 via-[#ff3b14]/5 to-transparent blur-2xl pointer-events-none horror-light-flicker"
      />

      {/* Sinister Cold Window Light Beam */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[45vw] h-[85vh] pointer-events-none opacity-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(140, 200, 220, 0.25) 0%, rgba(255, 50, 20, 0.12) 40%, transparent 70%)",
        }}
      />

      {/* Floating Ghostly Ash Motes */}
      <div className="absolute inset-0 pointer-events-none z-15">
        {ashParticles.map((mote) => (
          <motion.div
            key={mote.id}
            className="absolute rounded-full bg-red-200/50 shadow-[0_0_8px_rgba(255,59,20,0.8)]"
            style={{
              width: mote.size,
              height: mote.size,
              left: mote.x,
              top: mote.y,
            }}
            animate={{
              y: ["0px", "-60px", "0px"],
              x: ["0px", (mote.id % 2 === 0 ? 20 : -20) + "px", "0px"],
              opacity: [0.1, 0.75, 0.1],
            }}
            transition={{
              duration: mote.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: mote.delay,
            }}
          />
        ))}
      </div>

      {/* Central Haunted Chalkboard */}
      <Chalkboard />

      {/* Foreground Desk Silhouette with Creepy Ambient Shadow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[75vw] max-w-4xl h-16 bg-[#020403] rounded-t-2xl pointer-events-none border-t border-red-950/40 opacity-95 shadow-[0_-20px_50px_rgba(0,0,0,0.95)] z-20 flex justify-center"
      >
        <div
          className={`w-1/3 h-1 rounded-full mt-2 transition-colors ${
            effectiveTier >= 2 ? "bg-red-600/50 shadow-[0_0_15px_red]" : "bg-[#ff3b14]/20"
          }`}
        />
      </div>
    </main>
  );
};
