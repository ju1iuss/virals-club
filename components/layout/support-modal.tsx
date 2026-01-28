"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Lightbulb, MessageCircle, HelpCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

type SupportTab = "feature" | "contact" | "help";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [activeTab, setActiveTab] = useState<SupportTab>("help");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          message,
          email: user?.email || "anonymous",
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setMessage("");
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to send support request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "Wie erstelle ich einen Guide?",
      a: "Nur Admins können Guides über den 'Add' Button im Header erstellen."
    },
    {
      q: "Ist Virals Club kostenlos?",
      a: "Ein Großteil unserer Inhalte ist kostenlos. Für Premium-Strategien ist ein Account erforderlich."
    },
    {
      q: "Wie kann ich mein Passwort ändern?",
      a: "Aktuell erfolgt dies über den Supabase Auth Link in deinem Profil-Bereich."
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {activeTab === "feature" && <Lightbulb className="w-5 h-5 text-accent-vibrant" />}
              {activeTab === "contact" && <MessageCircle className="w-5 h-5 text-accent-vibrant" />}
              {activeTab === "help" && <HelpCircle className="w-5 h-5 text-accent-vibrant" />}
              {activeTab === "feature" ? "Feature Request" : activeTab === "contact" ? "Kontakt" : "Hilfe & FAQ"}
            </h2>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5 bg-white/[0.02]">
            {(["help", "feature", "contact"] as SupportTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setIsSuccess(false); }}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                  activeTab === tab ? "text-accent-vibrant bg-white/[0.03]" : "text-white/40 hover:text-white/60"
                }`}
              >
                {tab === "help" ? "FAQ" : tab === "feature" ? "Features" : "Kontakt"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-accent-vibrant/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-accent-vibrant" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Gesendet!</h3>
                  <p className="text-sm text-white/40">Vielen Dank für deine Nachricht. Wir melden uns!</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {activeTab === "help" ? (
                  <div className="space-y-4">
                    <p className="text-sm text-white/60 leading-relaxed">
                      Hast du Fragen? Schau in unsere FAQs oder kontaktiere uns direkt.
                    </p>
                    <div className="space-y-3 pt-2">
                      {faqs.map((faq, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <p className="text-xs font-bold text-white mb-1">{faq.q}</p>
                          <p className="text-[11px] text-white/40 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-white/60">
                      {activeTab === "feature" 
                        ? "Welche Funktion fehlt dir im Virals Club? Wir freuen uns über deine Ideen!" 
                        : "Hast du eine Frage oder willst uns etwas mitteilen? Schreib uns direkt."}
                    </p>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={activeTab === "feature" ? "Beschreibe dein Feature..." : "Deine Nachricht..."}
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-accent-vibrant resize-none"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !message.trim()}
                      className="w-full py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-accent-vibrant hover:text-white transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Sende..." : "Abschicken"}
                      {!isSubmitting && <Send className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
