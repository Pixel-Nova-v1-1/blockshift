// Web Audio API paper page-turn sound synthesizer
// No external MP3 files needed; zero latency, crisp, works offline

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPageTurnSound(isMuted: boolean = false) {
  if (isMuted || typeof window === "undefined") return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.22; // 220ms page flip

    // 1. White noise buffer for paper friction/rustle
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // 2. Bandpass filter to sculpt the airy paper rustle
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(1200, now);
    bandpass.frequency.exponentialRampToValueAtTime(350, now + duration);
    bandpass.Q.setValueAtTime(2.0, now);

    // 3. Gain envelope with quick attack and smooth decay
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Connect noise path
    whiteNoise.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    // 4. Subtle low-end snap (when page settles)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = "sine";
    snapOsc.frequency.setValueAtTime(140, now + 0.08);
    snapOsc.frequency.exponentialRampToValueAtTime(45, now + duration);

    snapGain.gain.setValueAtTime(0.001, now + 0.08);
    snapGain.gain.linearRampToValueAtTime(0.08, now + 0.11);
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);

    // Trigger
    whiteNoise.start(now);
    snapOsc.start(now + 0.08);
    whiteNoise.stop(now + duration);
    snapOsc.stop(now + duration);
  } catch {
    // Graceful fallback if user hasn't interacted or audio not allowed
  }
}
