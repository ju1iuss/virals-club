"use client";

import { useTheme } from "../layout/theme-context";
import Image from "next/image";

export function Hero() {
  const { theme } = useTheme();
  const today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  return (
    <section className="hidden md:flex py-12 md:py-16 flex-col items-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-vibrant/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-black/20 dark:bg-white/10" />
          <span className="text-[10px] text-black/50 dark:text-white/30 tracking-[0.3em] uppercase font-bold">
            {today}
          </span>
          <div className="h-[1px] w-8 bg-black/20 dark:bg-white/10" />
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <Image 
            src={theme === "dark" ? "/YC-white.png" : "/YC-black.png"}
            alt="Virals Club Logo"
            width={48}
            height={48}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain flex-shrink-0"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tighter leading-[0.9] text-black dark:text-white">
            Virals Club <span className="text-black dark:text-white">Deutschland</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
