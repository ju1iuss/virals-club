"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isGuidePage = pathname?.startsWith("/guides/");

  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.05] h-14 flex items-center">
      <div className="container mx-auto max-w-[1200px] px-6 flex justify-between items-center relative">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center group-hover:bg-accent-vibrant transition-colors">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            {!isGuidePage && (
              <span className="text-sm font-bold tracking-tighter">VIRALS CLUB</span>
            )}
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <Search className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors cursor-pointer" />
              <kbd className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] text-white/20 border border-white/10 rounded-md pointer-events-none font-sans">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {isGuidePage && (
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <Link href="/" className="text-[10px] font-bold tracking-[0.25em] hover:text-white/80 transition-colors whitespace-nowrap uppercase text-white/40">
              Virals Club <span className="text-white/20">DE</span>
            </Link>
          </div>
        )}
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/apps" className="text-[11px] font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors">Apps</Link>
            <Link href="/unbound" className="text-[11px] font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors">Unbound</Link>
          </nav>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <button className="text-[11px] font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors">Login</button>
          <button className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-accent-vibrant hover:text-white transition-all transform hover:scale-105 active:scale-95">
            Join Club
          </button>
        </div>
      </div>
    </header>
  );
}

