"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { ComicPanel } from "./ComicPanel";
import { InkButton } from "./InkButton";
import { SpeechBubble } from "./SpeechBubble";
import { ShieldCheck, Sparkles, User, Mail, Compass, Award, AlertCircle, Loader2, Cpu, Palette, Cloud, Smartphone, Zap } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function JoinPanel() {
  const [formData, setFormData] = useState({
    heroName: "",
    email: "",
    classRole: "ai-summoner",
    experience: "Journeyman (Lv. 15)",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recruitId, setRecruitId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.heroName || !formData.email) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Save hero recruit to Firestore database collection 'guild_recruits'
      const docRef = await addDoc(collection(db, "guild_recruits"), {
        heroName: formData.heroName.trim(),
        email: formData.email.trim(),
        classRole: formData.classRole,
        experience: formData.experience,
        createdAt: serverTimestamp(),
        status: "enlisted",
        source: "pixel-nova-web",
      });

      const formattedId = docRef.id.slice(0, 6).toUpperCase();
      setRecruitId(formattedId);

      // Trigger comic confetti burst
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#FF5E57", "#FBBC05", "#4285F4", "#34A853", "#121214"],
      });

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Firebase Firestore enlistment error:", err);
      const msg = err instanceof Error ? err.message : "Failed to record recruit signal in Firestore database.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {!submitted ? (
        <ComicPanel
          caption="CHARACTER CREATION SHEET // NEW GUILD RECRUIT"
          captionBg="coral"
          halftone="default"
          elevation="lg"
          className="p-6 md:p-8 bg-[#FFFDF8]"
        >
          {/* Header instructions with speech bubble */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6 pb-4 border-b-2 border-[#121214]/20">
            <div className="w-16 h-16 shrink-0 bg-[#FF5E57] ink-border ink-shadow flex items-center justify-center -rotate-3">
              <User className="w-9 h-9 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-black font-comic tracking-wide text-[#121214]">
                ENLIST IN THE PIXEL NOVA GUILD
              </h3>
              <p className="text-xs text-zinc-600 font-medium">
                Fill out your hero credentials to receive our secret chapter transmissions, hackathon invitations, and workshop access codes.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hero Codename */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black font-comic uppercase tracking-wider text-[#121214] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FF5E57]" />
                  Hero Codename / Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Satoshi or Alex Rivera"
                  value={formData.heroName}
                  onChange={(e) =>
                    setFormData({ ...formData, heroName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white ink-border-2 text-sm font-medium text-[#121214] focus:outline-none focus:bg-[#FFF9E6] transition-colors ink-shadow-sm"
                />
              </div>

              {/* Email / Frequency */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black font-comic uppercase tracking-wider text-[#121214] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#4285F4]" />
                  Comm Beacon / Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@student.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white ink-border-2 text-sm font-medium text-[#121214] focus:outline-none focus:bg-[#FFF9E6] transition-colors ink-shadow-sm"
                />
              </div>
            </div>

            {/* Class Role Select */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black font-comic uppercase tracking-wider text-[#121214] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#34A853]" />
                Choose Your Guild Specialization
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  {
                    id: "ai-summoner",
                    label: "AI & ML",
                    icon: <Cpu className="w-5 h-5 text-[#34A853]" />,
                  },
                  {
                    id: "pixel-paladin",
                    label: "Frontend & UI",
                    icon: <Palette className="w-5 h-5 text-[#4285F4]" />,
                  },
                  {
                    id: "cloud-sorcerer",
                    label: "Cloud & DevOps",
                    icon: <Cloud className="w-5 h-5 text-[#FBBC05]" />,
                  },
                  {
                    id: "mobile-ranger",
                    label: "Android & IoT",
                    icon: <Smartphone className="w-5 h-5 text-[#A855F7]" />,
                  },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setFormData({ ...formData, classRole: item.id })}
                    className={`p-2.5 text-left ink-border-2 transition-all cursor-pointer ${
                      formData.classRole === item.id
                        ? "bg-[#FEF08A] ink-shadow scale-[1.02] font-black"
                        : "bg-white hover:bg-zinc-50 opacity-80"
                    }`}
                  >
                    <div className="p-1 inline-block">{item.icon}</div>
                    <div className="text-xs font-black font-comic uppercase mt-1">
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Bracket */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black font-comic uppercase tracking-wider text-[#121214] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#FBBC05]" />
                Current Adventurer Level
              </label>
              <select
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-white ink-border-2 text-xs font-bold font-comic uppercase text-[#121214] focus:outline-none ink-shadow-sm"
              >
                <option>Novice Recruit (Lv. 1 — Eager to learn)</option>
                <option>Journeyman (Lv. 15 — Shipped class projects)</option>
                <option>Dungeon Raider (Lv. 30 — Hackathon veteran)</option>
                <option>Guild Archmage (Lv. 50 — Open source contributor)</option>
              </select>
            </div>

            {/* Error Message Warning Banner */}
            {errorMessage && (
              <div className="p-3 bg-[#FEF2F2] ink-border-2 text-xs text-[#DC2626] font-bold flex items-start gap-2 ink-shadow-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626] mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="font-comic font-black uppercase tracking-wider">
                    FIRESTORE TRANSMISSION NOTICE
                  </div>
                  <div className="text-[11px] font-sans text-zinc-700">
                    {errorMessage}
                  </div>
                  <div className="pt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        confetti({
                          particleCount: 70,
                          spread: 80,
                          origin: { y: 0.6 },
                        });
                        setRecruitId("LOCAL");
                        setSubmitted(true);
                      }}
                      className="text-[10px] uppercase font-black font-comic underline text-[#121214] hover:text-[#FF5E57] cursor-pointer"
                    >
                      [DEV: PROCEED TO HERO LICENSE ANYWAY]
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button with Dynamic Comic Impact Burst */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-zinc-500 font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FF5E57]" />
                <span>Real-time synchronization powered by Firebase & Google Cloud.</span>
              </div>

              <div className="relative">
                <InkButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  withBurst={!isSubmitting}
                  burstColor="#FBBC05"
                  soundEffect={isSubmitting ? "SYNC!" : "SUBMIT!"}
                  icon={
                    isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )
                  }
                >
                  {isSubmitting ? "SAVING TO CLOUD..." : "FORGE CHARACTER ➔"}
                </InkButton>
              </div>
            </div>
          </form>
        </ComicPanel>
      ) : (
        /* Minted Hero License Comic Card */
        <ComicPanel
          caption="OFFICIAL GUILD PASSPORT // VERIFIED HERO"
          captionBg="yellow"
          halftone="coral"
          elevation="lg"
          className="p-8 text-center bg-[#FFFDF8]"
        >
          <div className="max-w-md mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 -rotate-6 px-4 py-1.5 bg-[#22C55E] text-white ink-border text-base font-black font-comic tracking-widest uppercase ink-shadow">
              <ShieldCheck className="w-5 h-5" />
              <span>HERO LICENSE MINTED</span>
            </div>

            <h3 className="text-3xl font-black font-comic tracking-wide text-[#121214]">
              WELCOME TO PIXEL NOVA, {formData.heroName.toUpperCase()}!
            </h3>

            <div className="bg-white p-4 ink-border-2 text-left space-y-2 ink-shadow-sm">
              <div className="flex justify-between border-b pb-1 text-xs">
                <span className="font-bold text-zinc-500">RECRUIT ID:</span>
                <span className="font-black font-mono text-[#FF5E57]">
                  #NOVA-{recruitId || "ENLISTED"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1 text-xs">
                <span className="font-bold text-zinc-500">HERO DESIGNATION:</span>
                <span className="font-black font-comic">{formData.heroName}</span>
              </div>
              <div className="flex justify-between border-b pb-1 text-xs">
                <span className="font-bold text-zinc-500">COMM BEACON:</span>
                <span className="font-mono text-[11px]">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b pb-1 text-xs">
                <span className="font-bold text-zinc-500">CLASS GUILD:</span>
                <span className="font-black text-[#FF5E57] uppercase font-comic">
                  {formData.classRole.replace("-", " ")}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold text-zinc-500">RANK:</span>
                <span className="font-bold">{formData.experience}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 font-medium">
              Data successfully transmitted to Firebase Firestore. We've beamed a welcome packet to your comm beacon. Prepare for the next chapter quest!
            </p>

            <div className="pt-2">
              <InkButton
                variant="black"
                size="md"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    heroName: "",
                    email: "",
                    classRole: "ai-summoner",
                    experience: "Journeyman (Lv. 15)",
                  });
                }}
              >
                ← ENLIST ANOTHER ADVENTURER
              </InkButton>
            </div>
          </div>
        </ComicPanel>
      )}
    </div>
  );
}
