"use client";

import { useEffect, useState } from "react";
import { X, HelpCircle, ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { usePathname } from "next/navigation";
import { SupportModal } from "./support-modal";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  title: string;
  slug: string;
  type: string;
}

export function ArticleBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [nextArticle, setNextArticle] = useState<Article | null>(null);
  const [hasShownAfterReading, setHasShownAfterReading] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();
  const isReadingPage = pathname?.startsWith("/guides/") || pathname?.startsWith("/blog/");

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Listen for reading completion on reading pages
  useEffect(() => {
    if (!isReadingPage || isMobile || hasShownAfterReading) return;

    let readingComplete = false;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

      // Show banner when user reaches 85% of the page
      if (scrollPercentage >= 85 && !readingComplete) {
        readingComplete = true;
        
        // Mark current article as read
        const currentSlug = pathname.split("/").pop();
        if (currentSlug) {
          const seenSlugs = JSON.parse(localStorage.getItem("seen_articles") || "[]");
          if (!seenSlugs.includes(currentSlug)) {
            localStorage.setItem("seen_articles", JSON.stringify([...seenSlugs, currentSlug]));
          }
        }

        // Trigger banner to show
        setHasShownAfterReading(true);
        const dismissed = sessionStorage.getItem("banner_dismissed");
        if (!dismissed) {
          setIsVisible(true);
          setIsMinimized(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReadingPage, isMobile, pathname, hasShownAfterReading]);

  useEffect(() => {
    // Don't show on mobile
    if (isMobile) {
      setIsVisible(false);
      return;
    }

    // Check if was dismissed or minimized in this session
    const dismissed = sessionStorage.getItem("banner_dismissed");
    if (dismissed === "minimized") {
      setIsMinimized(true);
      setIsVisible(true);
    }

    async function fetchArticles() {
      const { data: articles } = await supabase
        .from("pages")
        .select("title, slug, type")
        .in("type", ["guide", "blog"])
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (articles && articles.length > 0) {
        const seenSlugs = JSON.parse(localStorage.getItem("seen_articles") || "[]");
        
        // Filter out current page if it's an article
        const filteredArticles = articles.filter(a => !pathname.includes(a.slug));
        
        // Unread are those not in seenSlugs
        const unread = articles.filter(a => !seenSlugs.includes(a.slug));
        setUnreadCount(unread.length);

        // Next article is the first unread one that is not the current page
        const next = unread.find(a => !pathname.includes(a.slug)) || filteredArticles[0];
        
        if (next) {
          setNextArticle(next);
          // Only auto-show if not on reading page (reading page will trigger via scroll)
          if (!isReadingPage) {
            const dismissed = sessionStorage.getItem("banner_dismissed");
            if (!dismissed) {
              setIsVisible(true);
            } else if (dismissed === "minimized") {
              setIsVisible(true);
              setIsMinimized(true);
            }
          }
        }
      }
    }

    fetchArticles();
    
    // Reset reading completion flag when pathname changes
    setHasShownAfterReading(false);
  }, [pathname, supabase, isMobile, isReadingPage]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("banner_dismissed", "true");
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    sessionStorage.setItem("banner_dismissed", "minimized");
  };

  const handleNext = () => {
    if (nextArticle) {
      const seenSlugs = JSON.parse(localStorage.getItem("seen_articles") || "[]");
      if (!seenSlugs.includes(nextArticle.slug)) {
        localStorage.setItem("seen_articles", JSON.stringify([...seenSlugs, nextArticle.slug]));
      }
    }
    handleMinimize();
    // Reset reading completion flag when navigating to new article
    setHasShownAfterReading(false);
  };

  // Don't render anything on mobile
  if (isMobile) return null;

  if (!isVisible) return (
    <div className="hidden md:flex fixed bottom-6 left-6 z-[100]">
      <button 
        onClick={() => { setIsVisible(true); setIsMinimized(true); }}
        className="w-12 h-12 bg-black border border-white/10 rounded-full shadow-2xl flex items-center justify-center text-white/40 hover:text-accent-vibrant transition-all hover:scale-110"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  );

  return (
    <>
      <div className="hidden md:flex fixed bottom-6 left-6 z-[100]">
        <AnimatePresence mode="wait">
          {isMinimized ? (
            <motion.div
              key="pill"
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              className="flex items-center gap-2 p-1.5 bg-[#0a0a0a] border border-white/10 rounded-full shadow-2xl"
            >
              <button 
                onClick={() => setIsMinimized(false)}
                className="flex items-center gap-3 pl-4 pr-2 py-1.5 hover:bg-white/5 rounded-full transition-colors group"
              >
                <div className="relative">
                  <div className="w-2 h-2 bg-accent-vibrant rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-accent-vibrant rounded-full animate-ping opacity-50" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">
                  {unreadCount > 0 ? `${unreadCount} News` : "Updates"}
                </span>
                <div className="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent-vibrant transition-colors">
                  <ChevronRight className="w-3 h-3 text-white" />
                </div>
              </button>
              
              <div className="w-px h-4 bg-white/10 mx-1" />
              
              <button 
                onClick={() => setIsSupportOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 text-white/40 hover:text-accent-vibrant transition-all"
                title="Support & Feedback"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="banner"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-5 relative w-[360px]"
            >
              <button 
                onClick={handleMinimize}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                      Articles Today
                    </p>
                    <p className="text-2xl font-bold text-white leading-tight">
                      <span className="text-accent-vibrant">{unreadCount}</span> unread
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsSupportOpen(true)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-accent-vibrant transition-all"
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="h-px bg-white/5" />

                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    Next
                  </p>
                  <h3 className="text-lg font-bold text-white leading-tight pr-8">
                    {nextArticle?.title || "Keine neuen Artikel"}
                  </h3>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleMinimize}
                    className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-colors"
                  >
                    Skip
                  </button>
                  {nextArticle && (
                    <Link
                      href={nextArticle.type === 'guide' ? `/guides/${nextArticle.slug}` : `/blog/${nextArticle.slug}`}
                      onClick={handleNext}
                      className="flex-1 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-accent-vibrant hover:text-white transition-all text-center"
                    >
                      Next
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}
