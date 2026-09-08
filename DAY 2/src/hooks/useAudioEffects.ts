"use client";

import { useEffect, useRef, useCallback } from "react";
import { useFocusTimer } from "../context/FocusTimerContext";

export function useAudioEffects() {
  const { soundEnabled, effectiveTier, climaxActive, isRunning } = useFocusTimer();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientDroneRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Crisp, tactile chalk scratch sound (amplified)
  const playChalkClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Noise burst for chalk friction
      const bufferSize = ctx.sampleRate * 0.06;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.6;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2400;
      filter.Q.value = 4.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime); // LOUDER
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      // Sharp snap
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);

      oscGain.gain.setValueAtTime(0.28, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.055);
    } catch {
      // Audio context catch
    }
  }, [soundEnabled, getAudioContext]);

  // Aggressive analog horror glitch static / screech
  const playGlitchStatic = useCallback(
    (durationMs: number = 250, volume: number = 0.35) => {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const bufferSize = ctx.sampleRate * (durationMs / 1000);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.9;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        // Harsh distorting filter
        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 800;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume, ctx.currentTime); // Much louder volume
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

        // Add spooky pitch screech
        const screech = ctx.createOscillator();
        const screechGain = ctx.createGain();
        screech.type = "sawtooth";
        screech.frequency.setValueAtTime(1400, ctx.currentTime);
        screech.frequency.linearRampToValueAtTime(320, ctx.currentTime + durationMs / 1000);

        screechGain.gain.setValueAtTime(volume * 0.6, ctx.currentTime);
        screechGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

        screech.connect(screechGain);
        screechGain.connect(ctx.destination);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        whiteNoise.start();
        screech.start();
        screech.stop(ctx.currentTime + durationMs / 1000);
      } catch {
        // Fallback
      }
    },
    [soundEnabled, getAudioContext]
  );

  // Deep horror heartbeat thud (played in Tier 2/3)
  const playHeartbeat = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(75, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.55, ctx.currentTime); // Deep loud thump
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);

      // Second beat of lub-dub
      setTimeout(() => {
        try {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(65, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);

          gain2.gain.setValueAtTime(0.4, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

          osc2.connect(gain2);
          gain2.connect(ctx.destination);

          osc2.start();
          osc2.stop(ctx.currentTime + 0.2);
        } catch {}
      }, 160);
    } catch {}
  }, [soundEnabled, getAudioContext]);

  // Eerie horror completion chime (dissonant chime resolving to dark chord)
  const playSuccessChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const frequencies = [220, 311.13, 440, 622.25]; // Diminished spooky chord resolving
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + idx * 0.14;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.28, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.5);
      });
    } catch {}
  }, [soundEnabled, getAudioContext]);

  // Continuous Low-Frequency Horror Room Tone Drone
  useEffect(() => {
    if (!soundEnabled || !isRunning) {
      if (ambientDroneRef.current) {
        try {
          ambientDroneRef.current.osc1.stop();
          ambientDroneRef.current.osc2.stop();
        } catch {}
        ambientDroneRef.current = null;
      }
      return;
    }

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      if (!ambientDroneRef.current) {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.value = 55; // 55Hz low dread drone
        osc2.type = "triangle";
        osc2.frequency.value = 57.5; // slight detune creates binaural unsettling beat

        gain.gain.setValueAtTime(0.08, ctx.currentTime); // ominous baseline hum

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        ambientDroneRef.current = { osc1, osc2, gain };
      }
    } catch {}

    return () => {
      if (ambientDroneRef.current) {
        try {
          ambientDroneRef.current.osc1.stop();
          ambientDroneRef.current.osc2.stop();
        } catch {}
        ambientDroneRef.current = null;
      }
    };
  }, [soundEnabled, isRunning, getAudioContext]);

  // Modulate drone volume based on glitch tier
  useEffect(() => {
    if (ambientDroneRef.current && audioCtxRef.current) {
      const targetVolume =
        climaxActive ? 0.35 : effectiveTier === 2 ? 0.22 : effectiveTier === 1 ? 0.14 : 0.08;
      ambientDroneRef.current.gain.gain.setTargetAtTime(
        targetVolume,
        audioCtxRef.current.currentTime,
        0.5
      );
    }
  }, [effectiveTier, climaxActive]);

  // Periodic Glitch Static & Heartbeat Thumping
  useEffect(() => {
    if (!soundEnabled) return;

    if (climaxActive) {
      playGlitchStatic(900, 0.45);
      playHeartbeat();
      const interval = setInterval(() => {
        playGlitchStatic(400, 0.5);
        playHeartbeat();
      }, 700);
      return () => clearInterval(interval);
    }

    if (effectiveTier === 2) {
      const interval = setInterval(() => {
        if (Math.random() < 0.6) {
          playGlitchStatic(240, 0.3);
          if (Math.random() < 0.5) playHeartbeat();
        }
      }, 2400);
      return () => clearInterval(interval);
    }

    if (effectiveTier === 1) {
      const interval = setInterval(() => {
        if (Math.random() < 0.3) {
          playGlitchStatic(120, 0.18);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [effectiveTier, climaxActive, soundEnabled, playGlitchStatic, playHeartbeat]);

  return {
    playChalkClick,
    playGlitchStatic,
    playHeartbeat,
    playSuccessChime,
  };
}
