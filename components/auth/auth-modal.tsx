"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Github, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./auth-context";
import { cn } from "@/lib/utils";

export function AuthModal() {
  const { isModalOpen, closeModal } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Check dein Postfach für den Login-Link!" });
    }
    setLoading(false);
  };

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl"
        >
          <button
            onClick={closeModal}
            className="absolute right-6 top-6 text-white/20 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-white mb-2">Willkommen im Club</h2>
            <p className="text-sm text-white/40">Logge dich ein, um vollen Zugriff zu erhalten.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] py-3.5 text-sm font-bold text-white transition-all hover:bg-white/[0.08] disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.78 1.85-1.63 2.42v2.84h2.64c1.66-1.53 2.63-3.79 2.63-6.27z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-2.64-2.84c-.73.49-1.66.78-2.64.78-2.04 0-3.77-1.38-4.39-3.25H3.99v3.11C5.81 21.39 8.69 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M7.61 15.03c-.16-.49-.25-1.01-.25-1.53s.09-1.04.25-1.53V8.89H3.99C3.35 10.15 3 11.53 3 13s.35 2.85.99 4.11l3.62-3.08z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 8.69 1 5.81 2.61 3.99 5.38l3.62 3.11c.62-1.87 2.35-3.25 4.39-3.25z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Weiter mit Google
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-white/20 bg-[#0a0a0a] px-2">
                Oder mit E-Mail
              </div>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type="email"
                  required
                  placeholder="Deine E-Mail Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/20 focus:border-accent-vibrant focus:outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-accent-vibrant py-3.5 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-accent-vibrant/90 active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_30px_rgba(34,197,94,0.2)]"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Login Link senden"}
              </button>
            </form>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "text-center text-xs font-medium",
                  message.type === "success" ? "text-accent-vibrant" : "text-red-400"
                )}
              >
                {message.text}
              </motion.p>
            )}
          </div>

          <p className="mt-8 text-center text-[10px] text-white/20 uppercase tracking-widest">
            Mit der Anmeldung akzeptierst du unsere <br />
            <span className="text-white/40 hover:text-white cursor-pointer underline decoration-white/10">Nutzungsbedingungen</span>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
