"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type GlitchTier = 0 | 1 | 2 | 3; // 0 = pristine, 1 = micro, 2 = medium, 3 = climax takeover

interface FocusTimerContextType {
  timeLeft: number;
  duration: number;
  isRunning: boolean;
  isCompleted: boolean;
  progress: number; // 0 to 1
  glitchTier: GlitchTier;
  tierOverride: GlitchTier | null;
  effectiveTier: GlitchTier;
  devMode: boolean;
  soundEnabled: boolean;
  climaxActive: boolean;
  streak: number;
  totalFocusMinutes: number;
  isAnomalyActive: boolean;
  anomalyFixedCount: number;
  
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: (newDuration?: number) => void;
  toggleDevMode: () => void;
  setDuration: (seconds: number) => void;
  setGlitchTierOverride: (tier: GlitchTier | null) => void;
  toggleSound: () => void;
  triggerAnomaly: () => void;
  resolveAnomaly: () => void;
}

const FocusTimerContext = createContext<FocusTimerContextType | undefined>(undefined);

const DEV_DEFAULT_DURATION = 60; // 60 seconds for rapid evaluation
const PROD_DEFAULT_DURATION = 25 * 60; // 25 minutes Pomodoro

export const FocusTimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devMode, setDevMode] = useState<boolean>(true); // Default to true per requirements for judges/demo
  const [duration, setDurationState] = useState<number>(DEV_DEFAULT_DURATION);
  const [timeLeft, setTimeLeft] = useState<number>(DEV_DEFAULT_DURATION);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [climaxActive, setClimaxActive] = useState<boolean>(false);
  const [tierOverride, setTierOverride] = useState<GlitchTier | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(1);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState<number>(24);
  const [isAnomalyActive, setIsAnomalyActive] = useState<boolean>(false);
  const [anomalyFixedCount, setAnomalyFixedCount] = useState<number>(0);

  // Calculate progress: 0 at start, 1 at finish
  const progress = duration > 0 ? Math.min(1, Math.max(0, (duration - timeLeft) / duration)) : 0;

  // Determine glitch tier
  let calculatedTier: GlitchTier = 0;
  if (isCompleted || timeLeft <= 0) {
    calculatedTier = 3;
  } else if (progress >= 0.66) {
    calculatedTier = 2;
  } else if (progress >= 0.33) {
    calculatedTier = 1;
  } else {
    calculatedTier = 0;
  }

  const effectiveTier: GlitchTier = tierOverride !== null ? tierOverride : calculatedTier;

  // Anomaly trigger in Tier 1 & 2
  useEffect(() => {
    // If we transition into tier 1 or 2 while running, trigger anomaly once per session
    if (isRunning && (calculatedTier === 1 || calculatedTier === 2) && !isAnomalyActive && anomalyFixedCount === 0) {
      const timer = setTimeout(() => {
        setIsAnomalyActive(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [calculatedTier, isRunning, isAnomalyActive, anomalyFixedCount]);

  // Main tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer just hit 0
            setIsRunning(false);
            setIsCompleted(true);
            setClimaxActive(true);
            setStreak((s) => s + 1);
            setTotalFocusMinutes((m) => m + Math.round(duration / 60));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, duration]);

  // Climax auto-dismiss after 4.5 seconds
  useEffect(() => {
    if (climaxActive) {
      const timer = setTimeout(() => {
        setClimaxActive(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [climaxActive]);

  const startTimer = useCallback(() => {
    if (timeLeft === 0) {
      setTimeLeft(duration);
      setIsCompleted(false);
      setClimaxActive(false);
    }
    setIsRunning(true);
  }, [timeLeft, duration]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback((newDuration?: number) => {
    setIsRunning(false);
    setIsCompleted(false);
    setClimaxActive(false);
    setIsAnomalyActive(false);
    const target = newDuration !== undefined ? newDuration : duration;
    setTimeLeft(target);
  }, [duration]);

  const toggleDevMode = useCallback(() => {
    setDevMode((prev) => {
      const next = !prev;
      const target = next ? DEV_DEFAULT_DURATION : PROD_DEFAULT_DURATION;
      setDurationState(target);
      setTimeLeft(target);
      setIsRunning(false);
      setIsCompleted(false);
      setClimaxActive(false);
      setIsAnomalyActive(false);
      return next;
    });
  }, []);

  const setDuration = useCallback((seconds: number) => {
    setDurationState(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
    setIsCompleted(false);
    setClimaxActive(false);
  }, []);

  const setGlitchTierOverride = useCallback((tier: GlitchTier | null) => {
    setTierOverride(tier);
    if (tier === 3) {
      setClimaxActive(true);
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const triggerAnomaly = useCallback(() => {
    setIsAnomalyActive(true);
  }, []);

  const resolveAnomaly = useCallback(() => {
    setIsAnomalyActive(false);
    setAnomalyFixedCount((c) => c + 1);
  }, []);

  return (
    <FocusTimerContext.Provider
      value={{
        timeLeft,
        duration,
        isRunning,
        isCompleted,
        progress,
        glitchTier: calculatedTier,
        tierOverride,
        effectiveTier,
        devMode,
        soundEnabled,
        climaxActive,
        streak,
        totalFocusMinutes,
        isAnomalyActive,
        anomalyFixedCount,
        startTimer,
        pauseTimer,
        resetTimer,
        toggleDevMode,
        setDuration,
        setGlitchTierOverride,
        toggleSound,
        triggerAnomaly,
        resolveAnomaly,
      }}
    >
      {children}
    </FocusTimerContext.Provider>
  );
};

export const useFocusTimer = () => {
  const context = useContext(FocusTimerContext);
  if (!context) {
    throw new Error("useFocusTimer must be used within a FocusTimerProvider");
  }
  return context;
};
