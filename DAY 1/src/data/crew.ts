export interface CrewMember {
  id: string;
  name: string;
  heroName: string;
  role: string;
  guildClass: string;
  level: number;
  avatarColor: string;
  accentBg: string;
  skills: string[];
  bio: string;
  catchphrase: string;
  stats: {
    code: number;
    design: number;
    caffeine: number;
  };
}

export const CREW_MEMBERS: CrewMember[] = [
  {
    id: "maya-nova",
    name: "Maya Lin",
    heroName: "NovaPrime",
    role: "GDG Lead & Organizer",
    guildClass: "Code Alchemist (Lv. 45)",
    level: 45,
    avatarColor: "#FF5E57",
    accentBg: "from-amber-100 to-orange-200",
    skills: ["System Arch", "Flutter", "Python", "Cloud"],
    bio: "Founding chapter master. Specializes in turning caffeine into multi-region architectures and inspiring new coders.",
    catchphrase: "Every bug is just an unscripted plot twist!",
    stats: { code: 95, design: 80, caffeine: 99 },
  },
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    heroName: "Pixel Samurai",
    role: "Frontend & UI/UX Lead",
    guildClass: "Pixel Paladin (Lv. 41)",
    level: 41,
    avatarColor: "#4285F4",
    accentBg: "from-blue-100 to-cyan-200",
    skills: ["Next.js", "Framer Motion", "Tailwind", "WebGL"],
    bio: "Obsessed with 120 FPS transitions, kinetic typography, and creating digital worlds that feel physically tangible.",
    catchphrase: "If it doesn't spark joy at 60 frames per second, refactor it!",
    stats: { code: 88, design: 98, caffeine: 85 },
  },
  {
    id: "kenji-sato",
    name: "Kenji Sato",
    heroName: "Neural Ghost",
    role: "AI / ML Research Lead",
    guildClass: "Neural Summoner (Lv. 43)",
    level: 43,
    avatarColor: "#34A853",
    accentBg: "from-emerald-100 to-teal-200",
    skills: ["PyTorch", "Gemini API", "LangChain", "Vector DB"],
    bio: "Builds reasoning agents by night and trains diffusion models by day. Believes neural nets have artistic souls.",
    catchphrase: "Loss has reached an all-time minimum; we launch at dawn.",
    stats: { code: 96, design: 72, caffeine: 92 },
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    heroName: "Terraform Valkyrie",
    role: "Cloud & DevOps Sentinel",
    guildClass: "Cloud Sorcerer (Lv. 39)",
    level: 39,
    avatarColor: "#FBBC05",
    accentBg: "from-yellow-100 to-amber-200",
    skills: ["Google Cloud", "Kubernetes", "Docker", "Go"],
    bio: "Summons container clusters in seconds. Defends the guild infrastructure against DDOS goblins and memory leaks.",
    catchphrase: "Serverless isn't magic, but my Kubernetes configs are.",
    stats: { code: 91, design: 65, caffeine: 94 },
  },
  {
    id: "taro-chen",
    name: "Taro Chen",
    heroName: "Droid Ranger",
    role: "Mobile & IoT Captain",
    guildClass: "Mobile Vanguard (Lv. 38)",
    level: 38,
    avatarColor: "#A855F7",
    accentBg: "from-purple-100 to-fuchsia-200",
    skills: ["Jetpack Compose", "Kotlin", "Firebase", "Rust"],
    bio: "Crafts buttery smooth Android experiences and hacks microcontrollers to light up when Git pipelines pass.",
    catchphrase: "One codebase, zero compromises, maximum battery efficiency.",
    stats: { code: 89, design: 78, caffeine: 88 },
  },
  {
    id: "zara-mansoor",
    name: "Zara Al-Mansoor",
    heroName: "Quest Mistress",
    role: "Community & Hackathons Lead",
    guildClass: "Bard of Hackathons (Lv. 40)",
    level: 40,
    avatarColor: "#EC4899",
    accentBg: "from-rose-100 to-pink-200",
    skills: ["DevRel", "Tech Writing", "Pitching", "Open Source"],
    bio: "The guild's social heartbeat. Connects junior developers with mentors and organizes high-octane weekend hackfests.",
    catchphrase: "Your pitch deck needs more comic panels and bolder dreams!",
    stats: { code: 82, design: 90, caffeine: 96 },
  },
];
