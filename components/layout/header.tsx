"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, User, Bell, Plus, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchModal } from "./search-modal";
import { useSearch } from "./search-context";
import { useAuth } from "@/components/auth/auth-context";
import { useEffect, useState } from "react";
import { ReadingProgressBar } from "./reading-progress-bar";
import { useTheme } from "./theme-context";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isReadingPage = pathname?.startsWith("/guides/") || 
                        pathname?.startsWith("/blog/") || 
                        pathname?.startsWith("/tips/");
  const { openModal: openSearch } = useSearch();
  const { user, isAdmin, openModal: openAuth, openProfile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isReadingPage && <ReadingProgressBar />}
      <header className={cn(
        "sticky top-0 z-50 h-14 flex items-center transition-all duration-300 border-b bg-white dark:bg-black",
        isScrolled 
          ? "bg-white dark:bg-black border-black/10 dark:border-white/10 shadow-sm" 
          : "bg-white/80 dark:bg-black/60 backdrop-blur-xl border-black/5 dark:border-white/[0.05]"
      )}>
        <div className="container mx-auto max-w-[1200px] px-6 flex justify-between items-center relative">
          <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
            {/* Logo + Title - Always visible on mobile, conditional on desktop */}
            <Link 
              href="/" 
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 flex-shrink-0",
                "md:hidden" // Always visible on mobile
              )}
            >
              <Image 
                src={theme === "dark" ? "/YC-white.png" : "/YC-black.png"}
                alt="Virals Club Logo"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="font-serif font-bold tracking-tight hover:text-black/80 dark:hover:text-white/80 transition-all whitespace-nowrap text-black dark:text-white text-sm truncate">
                Virals Club Deutschland
              </span>
            </Link>

            {/* Mobile Search Button */}
            <button
              onClick={openSearch}
              className="md:hidden p-1.5 -ml-1"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-black/60 dark:text-white/30" />
            </button>

            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/"
                className="text-sm font-bold uppercase tracking-wider text-black/70 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <button
                onClick={openSearch}
                className="relative group"
              >
                <Search className="w-3.5 h-3.5 text-black/60 dark:text-white/30 group-hover:text-black/80 dark:group-hover:text-white/60 transition-colors cursor-pointer" />
                <kbd className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] text-white/20 border border-white/10 rounded-md pointer-events-none font-sans">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>

          {/* Desktop: Logo + Title centered when scrolled or on reading page */}
          {(isReadingPage || isScrolled) && (
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-auto">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src={theme === "dark" ? "/YC-white.png" : "/YC-black.png"}
                  alt="Virals Club Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <span className={cn(
                  "font-serif font-bold tracking-tight hover:text-black/80 dark:hover:text-white/80 transition-all whitespace-nowrap text-black dark:text-white",
                  isScrolled ? "text-base" : "text-sm"
                )}>
                  Virals Club Deutschland
                </span>
              </Link>
            </div>
          )}
        
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link 
              href="/create"
              className="flex items-center gap-1.5 bg-accent-vibrant text-black px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
              title="Create New Page"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 dark:bg-white/5 bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-white/60 dark:text-white/60" />
            ) : (
              <Moon className="w-4 h-4 text-black/60" />
            )}
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={openProfile}
                className="w-8 h-8 rounded-full bg-accent-vibrant/20 border border-accent-vibrant/30 flex items-center justify-center text-xs font-bold text-accent-vibrant hover:scale-110 transition-transform active:scale-95"
              >
                {user.email?.[0].toUpperCase()}
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={openAuth}
                className="hidden md:block text-sm font-bold uppercase tracking-wider text-black/70 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
              >
                Login
              </button>
              <button 
                onClick={openAuth}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 md:px-4 md:py-1.5 p-2 rounded-full text-xs font-black uppercase tracking-wider hover:bg-accent-vibrant hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">Join Club</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
    </>
  );
}

