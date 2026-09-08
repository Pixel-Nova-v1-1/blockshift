import type { Metadata } from "next";
import { Bangers, Comic_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixel Nova | GDG Manga Chapter — Panel Mode",
  description:
    "Official GDG club interactive manga chapter. Read through our crew, quests, flashback projects, and join the guild in Panel Mode.",
  keywords: ["GDG", "Google Developer Groups", "Pixel Nova", "Manga", "Comic", "Next.js", "Anime"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${comicNeue.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF6EE] text-[#121214] font-sans selection:bg-[#FF5E57] selection:text-white">
        {children}
      </body>
    </html>
  );
}
