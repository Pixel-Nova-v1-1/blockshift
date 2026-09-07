export interface Project {
  id: string;
  flashbackTitle: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  stars: number;
  githubUrl: string;
  demoUrl: string;
  architects: string[];
  status: "Shipped" | "In Production" | "Open Source";
}

export const PROJECTS: Project[] = [
  {
    id: "chrono-canvas",
    flashbackTitle: "FLASHBACK // ARC 2025.1",
    title: "Chrono-Canvas",
    tagline: "Real-time collaborative manga sketchbook with git-like branching",
    description: "Built in 48 hours for Global Game Jam. Allows multiple artists and storytellers to branch comic panels, collaborate in real time with CRDTs, and export formatted webtoon strips.",
    tags: ["Next.js", "WebSockets", "Canvas API", "Tailwind"],
    stars: 184,
    githubUrl: "https://github.com/gdg-pixelnova/chrono-canvas",
    demoUrl: "https://chrono-canvas.example.com",
    architects: ["Alex Rivera", "Maya Lin"],
    status: "Shipped",
  },
  {
    id: "novavoice-ai",
    flashbackTitle: "FLASHBACK // ARC 2025.2",
    title: "NovaVoice Copilot",
    tagline: "Sub-200ms voice dialogue companion using Gemini 2.0 Flash Multimodal Live",
    description: "Enables natural voice interruption, context caching, and real-time screen awareness for visually impaired coders navigating terminal outputs and git conflicts.",
    tags: ["Python", "WebRTC", "Gemini 2.0 Live", "FastAPI"],
    stars: 320,
    githubUrl: "https://github.com/gdg-pixelnova/novavoice-copilot",
    demoUrl: "https://novavoice.example.com",
    architects: ["Kenji Sato", "Priya Sharma"],
    status: "In Production",
  },
  {
    id: "guildpass-mobile",
    flashbackTitle: "FLASHBACK // ARC 2025.3",
    title: "GuildPass Campus NFC",
    tagline: "Instant check-in and dynamic quest badge reward companion app",
    description: "Used by 1,200+ campus club attendees. Tapping an NFC token unlocks digital trading cards, verifies workshop attendance, and distributes proof-of-knowledge tokens on Cloud Run.",
    tags: ["Flutter", "Firebase", "Cloud Run", "Go"],
    stars: 145,
    githubUrl: "https://github.com/gdg-pixelnova/guildpass-mobile",
    demoUrl: "https://guildpass.example.com",
    architects: ["Taro Chen", "Zara Al-Mansoor"],
    status: "Shipped",
  },
  {
    id: "pixeldocs-manga",
    flashbackTitle: "FLASHBACK // ARC 2025.4",
    title: "PixelDocs: Manga Engine",
    tagline: "Transforms markdown docs into readable Japanese manga comic panels",
    description: "An open-source developer documentation theme that arranges technical code snippets, callouts, and API specifications into dynamic comic frames with speech bubbles.",
    tags: ["TypeScript", "MDX", "AST", "Framer Motion"],
    stars: 490,
    githubUrl: "https://github.com/gdg-pixelnova/pixeldocs-manga",
    demoUrl: "https://pixeldocs.example.com",
    architects: ["Alex Rivera", "Kenji Sato"],
    status: "Open Source",
  },
];
