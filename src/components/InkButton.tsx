"use client";

import React from "react";
import { motion } from "framer-motion";
import { ImpactBurst } from "./ImpactBurst";

interface InkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "paper" | "black" | "blue";
  size?: "sm" | "md" | "lg" | "xl";
  withBurst?: boolean;
  burstColor?: string;
  className?: string;
  icon?: React.ReactNode;
  soundEffect?: string; // e.g. "POW!", "CLICK!"
}

export function InkButton({
  children,
  variant = "primary",
  size = "md",
  withBurst = false,
  burstColor = "#FBBC05",
  className = "",
  icon,
  soundEffect,
  disabled,
  onClick,
  ...props
}: InkButtonProps) {
  const variantStyles = {
    primary: "bg-[#FF5E57] text-white hover:bg-[#ff716b]",
    secondary: "bg-[#FBBC05] text-[#121214] hover:bg-[#fcd34d]",
    paper: "bg-[#FAF6EE] text-[#121214] hover:bg-[#F3ECE0]",
    black: "bg-[#121214] text-[#FAF6EE] hover:bg-[#27272a]",
    blue: "bg-[#4285F4] text-white hover:bg-[#5b95f5]",
  }[variant];

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-bold tracking-wide",
    md: "px-5 py-2.5 text-sm font-black tracking-wider uppercase",
    lg: "px-7 py-3.5 text-base font-black tracking-widest uppercase",
    xl: "px-9 py-4.5 text-xl font-black tracking-widest uppercase font-comic",
  }[size];

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Optional Comic Impact Burst behind button */}
      {withBurst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 scale-125">
          <ImpactBurst color={burstColor} size={220} points={14} />
        </div>
      )}

      {/* Sound Effect Comic Label on Top Right if provided */}
      {soundEffect && (
        <span className="absolute -top-3.5 -right-3 z-30 px-2 py-0.5 bg-[#FEF08A] ink-border text-[10px] font-black uppercase text-[#121214] rotate-12 ink-shadow-sm pointer-events-none font-comic">
          {soundEffect}
        </span>
      )}

      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.97, x: 2, y: 2 }}
        disabled={disabled}
        onClick={onClick}
        className={`
          relative z-10 inline-flex items-center justify-center gap-2 cursor-pointer select-none
          ink-border ink-shadow font-comic
          transition-[background-color,border-color] duration-150
          disabled:opacity-50 disabled:cursor-not-allowed
          active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
          ${variantStyles}
          ${sizeStyles}
          ${className}
        `}
        {...(props as any)}
      >
        {children}
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
      </motion.button>
    </div>
  );
}
