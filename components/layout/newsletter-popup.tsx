"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Mail } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { cn } from "@/lib/utils";

const STORAGE_SUBSCRIBED = "vcd_nl_subscribed";
const STORAGE_DISMISSED = "vcd_nl_dismissed_at";
const DISMISS_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;
const MIN_MS_ON_PAGE = 22_000;
const MIN_SCROLL_RATIO = 0.18;

function canShowPopup(): boolean {
  if (typeof window === "undefined") return false;
  if (window.localStorage.getItem(STORAGE_SUBSCRIBED) === "1") return false;
  const dismissed = window.localStorage.getItem(STORAGE_DISMISSED);
  if (dismissed) {
    const t = parseInt(dismissed, 10);
    if (!Number.isNaN(t) && Date.now() - t < DISMISS_COOLDOWN_MS) return false;
  }
  return true;
}

function markDismissed() {
  window.localStorage.setItem(STORAGE_DISMISSED, String(Date.now()));
}

function markSubscribed() {
  window.localStorage.setItem(STORAGE_SUBSCRIBED, "1");
  window.localStorage.removeItem(STORAGE_DISMISSED);
}

export function NewsletterPopup() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const excluded =
    !pathname ||
    pathname.startsWith("/create") ||
    pathname.startsWith("/auth");

  const tryOpen = useCallback(() => {
    if (excluded || user || !canShowPopup()) return;
    setOpen(true);
  }, [excluded, user]);

  useEffect(() => {
    if (excluded || user) return;

    let start = Date.now();
    let maxScroll = 0;
    let fired = false;

    const tick = () => {
      if (fired) return;
      const elapsed = Date.now() - start;
      const doc = document.documentElement;
      const scrollRatio =
        doc.scrollHeight <= doc.clientHeight
          ? 1
          : doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      maxScroll = Math.max(maxScroll, scrollRatio);
      if (elapsed >= MIN_MS_ON_PAGE && maxScroll >= MIN_SCROLL_RATIO) {
        fired = true;
        tryOpen();
      }
    };

    const interval = window.setInterval(tick, 800);
    const onScroll = () => tick();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
    };
  }, [excluded, user, tryOpen]);

  const close = () => {
    setOpen(false);
    markDismissed();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pagePath: pathname ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({
          type: "err",
          text: typeof data.error === "string" ? data.error : "Etwas ist schiefgelaufen.",
        });
        setLoading(false);
        return;
      }
      markSubscribed();
      setMessage({
        type: "ok",
        text:
          data.duplicate === true
            ? "Du bist schon eingetragen — top!"
            : "Danke! Wir halten dich auf dem Laufenden.",
      });
      setTimeout(() => {
        setOpen(false);
      }, 2200);
    } catch {
      setMessage({ type: "err", text: "Netzwerkfehler. Bitte später erneut versuchen." });
    }
    setLoading(false);
  };

  if (excluded || user) return null;

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center p-4"
          aria-hidden={!open}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="nl-popup-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl glow-vibrant"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 text-white/30 transition-colors hover:text-white"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Mail className="h-6 w-6 text-accent-vibrant" />
              </div>
            </div>

            <h2
              id="nl-popup-title"
              className="font-serif text-center text-2xl font-bold tracking-tight text-white md:text-3xl"
            >
              Mehr vom Club?
            </h2>
            <p className="mt-3 text-center text-sm leading-relaxed text-white/50">
              Trag deine E-Mail ein — wir schicken dir ausgewählte Growth-Strategien,
              neue Guides und Updates vom Virals Club. Kein Spam, versprochen.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none ring-accent-vibrant/30 placeholder:text-white/25 focus:border-accent-vibrant/50 focus:ring-2"
                />
              </div>

              {message && (
                <p
                  className={cn(
                    "text-center text-sm",
                    message.type === "ok" ? "text-accent-vibrant" : "text-red-400"
                  )}
                >
                  {message.text}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-vibrant py-3 text-sm font-semibold text-black transition hover:bg-accent-vibrant/90 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Ja, bitte informieren"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-white/35">
              Mit deiner Anmeldung stimmst du zu, dass wir dich per E-Mail kontaktieren.
              Details in der{" "}
              <Link href="/datenschutz" className="text-white/50 underline hover:text-white/70">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
