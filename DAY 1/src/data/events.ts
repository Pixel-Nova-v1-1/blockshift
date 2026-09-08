export interface QuestEvent {
  id: string;
  chapterBeat: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  attendees: string;
  blurb: string;
  clearedStamp?: string;
  isUpcoming?: boolean;
  lootReward: string;
  tags: string[];
  bannerAccent: string;
}

export const QUEST_EVENTS: QuestEvent[] = [
  {
    id: "quest-01",
    chapterBeat: "BEAT 01: ORIGIN ARC",
    title: "The Genesis Hackathon",
    subtitle: "Build the Impossible in 48 Hours",
    date: "OCTOBER 12-14, 2025",
    location: "Main Tech Hall & Discord",
    attendees: "180+ Hackers",
    blurb: "18 teams entered the arena to construct AI civic tools and web apps. 3 legendary artifacts shipped, fuel consumed: 400 energy drinks.",
    clearedStamp: "MISSION CLEARED",
    isUpcoming: false,
    lootReward: "+500 EXP • Rare Contributor Badge",
    tags: ["Hackathon", "AI", "Fast Prototype"],
    bannerAccent: "bg-emerald-500",
  },
  {
    id: "quest-02",
    chapterBeat: "BEAT 02: THE AWAKENING",
    title: "Google I/O Extended: Anime Protocol",
    subtitle: "Multimodal Gemini & Agentic Runtimes",
    date: "DECEMBER 05, 2025",
    location: "Auditorium Delta & YouTube Live",
    attendees: "240+ Guild Members",
    blurb: "Deep dive workshops exploring Gemini 2.0 Flash, function calling, and self-hosted vector embeddings with real-time manga synthesis.",
    clearedStamp: "BOSS DEFEATED",
    isUpcoming: false,
    lootReward: "+750 EXP • Gemini Pro Certificate",
    tags: ["Workshop", "Gemini API", "Agents"],
    bannerAccent: "bg-blue-500",
  },
  {
    id: "quest-03",
    chapterBeat: "BEAT 03: THE CITADEL RAID",
    title: "Cloud Study Jam: Rise of Cloud Run",
    subtitle: "Container Mastery & Zero-to-Production",
    date: "JANUARY 20, 2026",
    location: "CyberLab 04",
    attendees: "130+ Cloud Runners",
    blurb: "Intensive 6-hour hands-on lab on Google Kubernetes Engine, Serverless Cloud Run scaling, and automated GitOps CI/CD pipelines.",
    clearedStamp: "DUNGEON CONQUERED",
    isUpcoming: false,
    lootReward: "+600 EXP • Cloud Skill Badge",
    tags: ["Cloud", "DevOps", "Kubernetes"],
    bannerAccent: "bg-amber-500",
  },
  {
    id: "quest-04",
    chapterBeat: "BEAT 04: THE COMING STORM",
    title: "Pixel Hack 2026: The Spring Gauntlet",
    subtitle: "Cross-Campus Inter-Guild Tournament",
    date: "MARCH 28-30, 2026",
    location: "Innovation Hub Alpha",
    attendees: "300+ Expected",
    blurb: "Classified challenge briefs will be unsealed at 09:00 UTC. Guild teams will build next-gen interactive tools and open-source models.",
    isUpcoming: true,
    lootReward: "??? Mystery Trophy & $3,000 Prize Pool",
    tags: ["Tournament", "Cash Bounty", "Open-Source"],
    bannerAccent: "bg-coral-500",
  },
  {
    id: "quest-05",
    chapterBeat: "BEAT 05: THE MULTIVERSE",
    title: "DevFest 2026: Multiverse Nexus",
    subtitle: "Annual Grand Developer Festival",
    date: "MAY 15-16, 2026",
    location: "Metropolis Expo Center",
    attendees: "500+ Registrations",
    blurb: "The largest campus developer gathering in the region. 4 tracks: AI Supercomputing, Modern Web, Mobile Ecosystems, and Career Forge.",
    isUpcoming: true,
    lootReward: "??? Legendary Guild Cape & Swag Pack",
    tags: ["Conference", "Keynote", "Career"],
    bannerAccent: "bg-purple-500",
  },
  {
    id: "quest-06",
    chapterBeat: "BEAT 06: TO BE CONTINUED...",
    title: "AI Agent Colosseum & Summer Raid",
    subtitle: "Autonomous Agent Battleground",
    date: "JULY 2026",
    location: "[REDACTED SECTOR]",
    attendees: "All Guild Survivors",
    blurb: "Autonomous LLM agents written by competing teams will engage in negotiation, problem solving, and code golfing in a live arena.",
    isUpcoming: true,
    lootReward: "??? Mythic Hall of Fame Induction",
    tags: ["Experimental", "Autonomous Agents", "Colosseum"],
    bannerAccent: "bg-zinc-600",
  },
];
