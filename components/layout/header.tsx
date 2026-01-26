"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Bell } from "lucide-react";
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
  const { user, openModal: openAuth, signOut } = useAuth();
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
      <header className="sticky top-0 z-50 bg-black/60 dark:bg-black/60 bg-white/80 backdrop-blur-xl border-b border-white/[0.05] dark:border-white/[0.05] border-black/10 h-14 flex items-center">
        <div className="container mx-auto max-w-[1200px] px-6 flex justify-between items-center relative">
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
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

        {(isReadingPage || isScrolled) && (
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <Link href="/" className={cn(
              "font-serif font-bold tracking-tight hover:text-black/80 dark:hover:text-white/80 transition-all whitespace-nowrap text-black dark:text-white",
              isScrolled ? "text-xl" : "text-sm"
            )}>
              Virals Club Deutschland
            </Link>
          </div>
        )}
        
        <div className="flex items-center gap-4">
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
                onClick={() => signOut()}
                className="text-[11px] font-bold uppercase tracking-wider text-black/70 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
              >
                Logout
              </button>
              <div className="w-7 h-7 rounded-full bg-accent-vibrant/20 border border-accent-vibrant/30 flex items-center justify-center text-[10px] font-bold text-accent-vibrant">
                {user.email?.[0].toUpperCase()}
              </div>
            </div>
          ) : (
            <>
              <button 
                onClick={openAuth}
                className="text-[11px] font-bold uppercase tracking-wider text-black/70 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
              >
                Login
              </button>
              <button 
                onClick={openAuth}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-accent-vibrant hover:text-white transition-all transform hover:scale-105 active:scale-95"
              >
                Join Club
              </button>
            </>
          )}
        </div>
      </div>
    </header>
    </>
  );
}

