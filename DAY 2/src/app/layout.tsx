import type { Metadata } from "next";
import { Outfit, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deadpixel — Gamified Virtual Study Hall",
  description:
    "A clean, minimal classroom study hall that gently glitches the longer you stay focused. Powered by Next.js, Framer Motion, and Tailwind CSS.",
  keywords: ["Pomodoro", "Study Hall", "Virtual Classroom", "Glitch", "Deadpixel", "Focus Timer"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${caveat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0d1612] text-[#f5f4ef] selection:bg-[#ff6b00] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
