"use client";

import { useState, useEffect } from "react";
import { Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

interface SoftGateProps {
  children: React.ReactNode;
  isGated: boolean;
  user: any;
}

export function SoftGate({ children, isGated, user }: SoftGateProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Detect scroll to trigger the gate
  useEffect(() => {
    // Initial loading delay to show skeleton
    const loadTimer = setTimeout(() => setIsLoaded(true), 800);

    // Auto-trigger gate after 5 seconds if gated
    const autoTriggerTimer = setTimeout(() => {
      if (isGated && !user) {
        setHasScrolled(true);
      }
    }, 5000);

    const scrollUnsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.05 && !hasScrolled && isGated && !user) {
        setHasScrolled(true);
      }
    });

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(autoTriggerTimer);
      scrollUnsubscribe();
    };
  }, [scrollYProgress, hasScrolled, isGated, user]);

  if (!isGated || user) return <>{children}</>;

  return (
    <div className="relative">
      {!isLoaded ? (
        <div className="space-y-8 animate-pulse">
          <div className="h-4 bg-white/5 rounded-full w-full" />
          <div className="h-4 bg-white/5 rounded-full w-[90%]" />
          <div className="h-4 bg-white/5 rounded-full w-[95%]" />
          <div className="h-4 bg-white/5 rounded-full w-[85%]" />
        </div>
      ) : (
        <motion.div 
          animate={hasScrolled ? { scale: 0.98, opacity: 0.3, filter: "blur(10px)" } : { scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative",
            hasScrolled ? "max-h-[500px] overflow-hidden" : "max-h-none"
          )}
        >
          {children}
          {hasScrolled && (
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
          )}
        </motion.div>
      )}
      
      <AnimatePresence>
        {hasScrolled && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] pointer-events-none"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 150,
                mass: 0.8
              }}
              className="fixed inset-x-0 bottom-0 z-[100] flex justify-center pointer-events-none"
            >
              <div className="bg-[#0a0a0a] border-t border-white/10 w-full max-w-[800px] rounded-t-[2.5rem] md:rounded-t-[3rem] p-8 md:p-12 pb-12 md:pb-16 pointer-events-auto relative overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
                {/* Drag Handle Decorator */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full" />
                
                {/* Decorative Background Glows */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-vibrant/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-vibrant/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative flex flex-col items-center text-center max-w-md mx-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 rotate-3 hover:rotate-0 transition-transform duration-500"
                  >
                    <Lock className="w-6 h-6 text-accent-vibrant" />
                  </motion.div>

                  <motion.h3 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold font-serif mb-4 text-white tracking-tight"
                  >
                    Weiterlesen?
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-base text-white/50 mb-10 leading-relaxed font-sans"
                  >
                    Melde dich kostenlos an, um Zugriff auf diesen Guide und alle weiteren exklusiven Inhalte zu erhalten.
                  </motion.p>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full space-y-4"
                  >
                    <button className="w-full bg-accent-vibrant text-black font-bold py-4 rounded-2xl hover:bg-accent-vibrant/90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group/btn shadow-[0_10px_30px_rgba(34,197,94,0.3)] text-sm uppercase tracking-widest">
                      GRATIS ANMELDEN
                      <Sparkles className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center justify-center gap-4 text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
                      <span className="h-[1px] w-8 bg-white/5" />
                      <span>Join 5,000+ Growth Engineers</span>
                      <span className="h-[1px] w-8 bg-white/5" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

