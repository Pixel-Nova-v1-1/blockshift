"use client";

import { useState, useEffect } from "react";
import { GlitchTier } from "../context/FocusTimerContext";

const GLITCH_GLYPHS = "01#%&*+!=~?/[]{}<>$@¥§Δø£░▒▓X_";

export function useGlitchScramble(
  originalText: string,
  tier: GlitchTier,
  forceScramble: boolean = false
): string {
  const [scrambled, setScrambled] = useState<string>(originalText);

  useEffect(() => {
    // If pristine (tier 0) and not forced, keep original
    if (tier === 0 && !forceScramble) {
      setScrambled(originalText);
      return;
    }

    // Full climax (tier 3) or forced
    if (tier === 3 || forceScramble) {
      const interval = setInterval(() => {
        const chars = originalText.split("");
        const corrupted = chars
          .map((ch) => {
            if (ch === " ") return " ";
            return Math.random() > 0.45
              ? GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)]
              : ch;
          })
          .join("");
        setScrambled(corrupted);
      }, 90);

      return () => clearInterval(interval);
    }

    // Tier 1: Very rare 1-2 character glitch for 200ms every ~10s
    if (tier === 1) {
      const interval = setInterval(() => {
        if (Math.random() < 0.25) {
          const chars = originalText.split("");
          const index = Math.floor(Math.random() * chars.length);
          if (chars[index] !== " ") {
            chars[index] = GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
            setScrambled(chars.join(""));
            setTimeout(() => setScrambled(originalText), 220);
          }
        }
      }, 4000);
      return () => clearInterval(interval);
    }

    // Tier 2: Frequent short bursts of corruption
    if (tier === 2) {
      const interval = setInterval(() => {
        if (Math.random() < 0.45) {
          const chars = originalText.split("");
          const corruptCount = Math.max(1, Math.floor(chars.length * 0.35));
          for (let i = 0; i < corruptCount; i++) {
            const idx = Math.floor(Math.random() * chars.length);
            if (chars[idx] !== " ") {
              chars[idx] = GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
            }
          }
          setScrambled(chars.join(""));
          setTimeout(() => setScrambled(originalText), 380);
        }
      }, 2500);
      return () => clearInterval(interval);
    }

    setScrambled(originalText);
  }, [originalText, tier, forceScramble]);

  return scrambled;
}
