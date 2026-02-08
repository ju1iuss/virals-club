"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, X, Send, CheckCircle2 } from "lucide-react";

export function AdCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "advertisement",
          to: "hi@tasy.ai",
          message: `Name: ${formData.name}\n\n${formData.message}`,
          email: formData.email,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to send advertising request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-accent-vibrant/30 transition-all group text-left"
      >
        <div className="w-10 h-10 rounded-full bg-accent-vibrant/10 flex items-center justify-center text-accent-vibrant mb-4 group-hover:scale-110 transition-transform">
          <Megaphone className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-black dark:text-white mb-2">
          Möchten Sie hier werben?
        </h3>
        <p className="text-xs text-black/40 dark:text-white/40 leading-relaxed">
          Erreichen Sie unsere Community von Growth-Engineers und AI-Enthusiasten.
        </p>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-vibrant/10 flex items-center justify-center text-accent-vibrant">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-black dark:text-white">Werbung schalten</h2>
                      <p className="text-xs text-black/40 dark:text-white/40">Senden Sie uns eine Anfrage</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-black/40 dark:text-white/40" />
                  </button>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Gesendet!</h3>
                    <p className="text-sm text-black/60 dark:text-white/40">Wir melden uns in Kürze bei Ihnen.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/20 ml-1">Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ihr Name"
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-vibrant transition-colors text-black dark:text-white"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/20 ml-1">E-Mail</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ihre@mail.de"
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-vibrant transition-colors text-black dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/20 ml-1">Nachricht</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Was möchten Sie bewerben?"
                        className="w-full h-32 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-vibrant transition-colors resize-none text-black dark:text-white"
                      />
                    </div>

                    <button
                      disabled={isSubmitting}
                      className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-accent-vibrant dark:hover:bg-accent-vibrant hover:text-white transition-all disabled:opacity-50 mt-4"
                    >
                      {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
