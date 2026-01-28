"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./theme-context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  
  return (
    <footer className="w-full py-12 px-6 border-t border-black/10 dark:border-white/5 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image 
              src={theme === "dark" ? "/YC-white.png" : "/YC-black.png"}
              alt="Virals Club Logo"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <div className="text-black dark:text-white font-serif text-lg font-bold">
              Virals Club Deutschland
            </div>
          </div>
          <p className="text-black/40 dark:text-white/40 text-sm">
            ©{currentYear} Virals Club Deutschland — by Tasy AI
          </p>
        </div>
        
        <nav className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-x-8 gap-y-4">
          <Link href="/about" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm">
            Über uns
          </Link>
          <Link href="/advertise" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm">
            Werben
          </Link>
          <Link href="/resources" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm">
            Ressourcen
          </Link>
          <Link href="/guides" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm">
            Guides
          </Link>
          <Link href="/tools" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm">
            Tools
          </Link>
          <Link href="/datenschutz" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm">
            Datenschutz
          </Link>
          <Link href="/agb" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm">
            AGB
          </Link>
          <Link href="/impressum" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors text-sm">
            Impressum
          </Link>
        </nav>
      </div>
    </footer>
  );
}
