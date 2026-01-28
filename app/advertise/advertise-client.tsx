"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Megaphone, Target, Zap, TrendingUp } from "lucide-react";

export function AdvertiseClient() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "advertise",
          message: `Name: ${name}\n\n${message}`,
          email: email,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setMessage("");
        setEmail("");
        setName("");
      }
    } catch (error) {
      console.error("Failed to send advertising request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
            Partner des <span className="text-accent-vibrant">Virals Club</span> werden
          </h1>
          <p className="text-lg text-black/60 dark:text-white/40 leading-relaxed">
            Erreiche eine exklusive Community von Growth-Engineers, Marketing-Entscheidern und AI-Enthusiasten.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { icon: <Target className="w-5 h-5" />, title: "Zielgenaues Targeting", desc: "Direkter Zugang zu Experten im Bereich AI & Marketing." },
            { icon: <Zap className="w-5 h-5" />, title: "Hohes Engagement", desc: "Unsere Leser sind Macher, die nach Tools und Strategien suchen." },
            { icon: <TrendingUp className="w-5 h-5" />, title: "Premium Brand", desc: "Positioniere deine Marke in einem hochwertigen, fachlichen Umfeld." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-vibrant/10 flex items-center justify-center text-accent-vibrant flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-black dark:text-white">{item.title}</h3>
                <p className="text-sm text-black/50 dark:text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-accent-vibrant/5 border border-accent-vibrant/20 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-accent-vibrant/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-accent-vibrant" />
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white">Anfrage gesendet!</h2>
            <p className="text-black/60 dark:text-white/40">Vielen Dank für dein Interesse. Julius wird sich in Kürze bei dir melden.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="text-accent-vibrant font-bold text-sm hover:underline"
            >
              Weitere Nachricht senden
            </button>
          </motion.div>
        ) : (
          <div className="p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Megaphone className="w-5 h-5 text-accent-vibrant" />
              <h2 className="text-xl font-bold text-black dark:text-white">Anfrage senden</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/20 ml-1">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dein Name"
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-vibrant transition-colors"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/20 ml-1">E-Mail</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@mail.de"
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-vibrant transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/20 ml-1">Nachricht</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Erzähl uns von deinem Produkt oder deiner Brand..."
                  className="w-full h-32 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-vibrant transition-colors resize-none"
                />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-accent-vibrant dark:hover:bg-accent-vibrant hover:text-white transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Wird gesendet..." : "Anfrage abschicken"}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
