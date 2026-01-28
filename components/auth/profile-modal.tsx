"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, Bookmark, Settings, User as UserIcon, Shield, ChevronLeft, ArrowRight } from "lucide-react";
import { useAuth } from "./auth-context";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";

export function ProfileModal() {
  const { isProfileOpen, closeProfile, user, isAdmin, signOut } = useAuth();
  const [savedCount, setSavedCount] = useState(0);
  const [view, setView] = useState<"menu" | "saved" | "profile" | "settings">("menu");
  const [savedGuides, setSavedGuides] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (user && isProfileOpen) {
      const fetchData = async () => {
        // Fetch count
        const { count } = await supabase
          .from("saved_guides")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);
        setSavedCount(count || 0);

        // Fetch actual guides if in saved view
        if (view === "saved") {
          const { data } = await supabase
            .from("saved_guides")
            .select(`
              guide_id,
              pages (
                title,
                slug,
                type,
                image
              )
            `)
            .eq("user_id", user.id);
          setSavedGuides(data || []);
        }
      };
      fetchData();
    }
  }, [user, isProfileOpen, view, supabase]);

  useEffect(() => {
    if (!isProfileOpen) setView("menu");
  }, [isProfileOpen]);

  if (!isProfileOpen || !user) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-end p-4 md:p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProfile}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        />
        
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
          className="relative w-full max-w-[320px] bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] relative">
            <button 
              onClick={closeProfile} 
              className="absolute top-4 right-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-accent-vibrant/20 border-2 border-accent-vibrant/30 flex items-center justify-center text-xl font-bold text-accent-vibrant shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                {user.email?.[0].toUpperCase()}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-black dark:text-white truncate max-w-[240px]">
                  {user.email}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 border border-black/5 dark:border-white/5">
                    Member
                  </span>
                  {isAdmin && (
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-accent-vibrant/10 text-accent-vibrant border border-accent-vibrant/20 flex items-center gap-1">
                      <Shield className="w-2.5 h-2.5" />
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              {view === "menu" ? (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-2"
                >
                  <div className="grid grid-cols-1 gap-1">
                    <button 
                      onClick={() => setView("saved")}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-accent-vibrant/20 transition-colors">
                          <Bookmark className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-accent-vibrant transition-colors" />
                        </div>
                        <span className="text-sm font-medium text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors">Gespeicherte Guides</span>
                      </div>
                      <span className="text-xs font-bold text-black/20 dark:text-white/20 group-hover:text-accent-vibrant">{savedCount}</span>
                    </button>

                    <button 
                      onClick={() => setView("profile")}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                        <UserIcon className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors">Profil Details</span>
                    </button>

                    <button 
                      onClick={() => setView("settings")}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                        <Settings className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors">Einstellungen</span>
                    </button>
                  </div>

                  <div className="h-px bg-black/5 dark:bg-white/5 my-2" />

                  <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-colors text-black/40 dark:text-white/40 group-hover:text-red-500">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-black/70 dark:text-white/70 group-hover:text-red-500 transition-colors">Abmelden</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="subview"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <button 
                    onClick={() => setView("menu")}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:text-accent-vibrant transition-colors mb-2"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Zurück
                  </button>

                  {view === "saved" && (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                      {savedGuides.length > 0 ? (
                        savedGuides.map((item) => (
                          <Link 
                            key={item.guide_id}
                            href={`/guides/${item.pages.slug}`}
                            onClick={closeProfile}
                            className="flex items-center gap-3 p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-accent-vibrant/50 transition-all group"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                              {item.pages.image ? (
                                <Image src={item.pages.image} alt="" fill className="object-cover" />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/10 font-bold">VC</div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-black dark:text-white truncate group-hover:text-accent-vibrant transition-colors">
                                {item.pages.title}
                              </p>
                              <p className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-widest">{item.pages.type}</p>
                            </div>
                            <ArrowRight className="w-3 h-3 text-black/20 dark:text-white/20 group-hover:text-accent-vibrant transition-all transform group-hover:translate-x-1" />
                          </Link>
                        ))
                      ) : (
                        <div className="text-center py-8 space-y-2">
                          <Bookmark className="w-8 h-8 text-black/10 dark:text-white/10 mx-auto" />
                          <p className="text-xs text-black/40 dark:text-white/40">Noch keine Guides gespeichert.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {view === "profile" && (
                    <div className="space-y-4 p-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-black/30 dark:text-white/20">E-Mail Adresse</label>
                        <p className="text-sm text-black dark:text-white font-medium">{user.email}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-black/30 dark:text-white/20">User ID</label>
                        <p className="text-[10px] font-mono text-black/40 dark:text-white/40 break-all">{user.id}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-black/30 dark:text-white/20">Mitglied seit</label>
                        <p className="text-sm text-black dark:text-white font-medium">
                          {new Date(user.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  )}

                  {view === "settings" && (
                    <div className="space-y-4 p-2">
                      <p className="text-[11px] text-black/40 dark:text-white/40 italic">Account-Einstellungen werden bald verfügbar sein.</p>
                      <div className="space-y-2 opacity-50 pointer-events-none">
                        <div className="h-10 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10" />
                        <div className="h-10 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10" />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Footer branding */}
          <div className="p-4 bg-black/[0.01] dark:bg-white/[0.01] border-t border-black/5 dark:border-white/5 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/10 dark:text-white/10">
              Virals Club Deutschland
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
