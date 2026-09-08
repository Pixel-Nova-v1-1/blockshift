"use client";

import React, { useState } from "react";
import { FocusTimerProvider } from "../context/FocusTimerContext";
import { DevToolbar } from "../components/DevToolbar";
import { Classroom } from "../components/Classroom";
import { GlitchOverlay } from "../components/GlitchOverlay";
import { StudyAgent } from "../components/StudyAgent";
import { InteractionToast } from "../components/InteractionToast";
import { HorrorIntroGate } from "../components/HorrorIntroGate";
import { GlitchCursor } from "../components/GlitchCursor";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <FocusTimerProvider>
      {/* Functional Glitching Mouse Cursor across entire app */}
      <GlitchCursor />

      {/* Headphone Advisory & Horror Loading Gate */}
      {!hasEntered && <HorrorIntroGate onEnter={() => setHasEntered(true)} />}

      <div className="relative min-h-screen flex flex-col bg-black text-[#dad7ce] selection:bg-red-600 selection:text-black overflow-hidden">
        {/* Top Developer & Demo Control Toolbar */}
        <DevToolbar />

        {/* Core Classroom Scene Centered on Chalkboard */}
        <Classroom />

        {/* Persistent AI Study Buddy Agent Widget (Bottom Right) */}
        <StudyAgent />

        {/* Interactive Mid-Session Corrupted Note Anomaly Popup */}
        <InteractionToast />

        {/* Global Time-Driven Glitch FX Overlay, CRT Climax, & Completion Modal */}
        <GlitchOverlay />
      </div>
    </FocusTimerProvider>
  );
}
