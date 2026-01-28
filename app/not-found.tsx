"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <span className="text-accent-vibrant font-black text-6xl md:text-8xl block mb-4">404</span>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-black dark:text-white mb-4">
              Seite nicht gefunden
            </h1>
            <p className="text-black/60 dark:text-white/40 text-lg">
              Die von dir gesuchte Seite existiert nicht oder wurde verschoben.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <Home className="w-4 h-4" />
              Zur Startseite
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 text-black/60 dark:text-white/40 px-8 py-3 rounded-full font-bold transition-all hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>
          </div>
          
          <div className="mt-16 p-8 border border-dashed border-black/10 dark:border-white/10 rounded-3xl">
            <h2 className="text-xs uppercase tracking-[0.2em] font-black text-black/30 dark:text-white/20 mb-4">
              Vielleicht suchst du nach
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["Strategie", "Trends", "Case Studies"].map((cat) => (
                <Link
                  key={cat}
                  href={`/${cat.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-bold text-black/60 dark:text-white/40 hover:text-accent-vibrant transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
