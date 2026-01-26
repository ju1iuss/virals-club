"use client";

import { useEffect, useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useSearch } from "./search-context";

interface Guide {
  meta: {
    title: string;
    subtitle?: string;
    category?: string;
    author?: string;
    date?: string;
  };
  slug: string;
}

export function SearchModal() {
  const { isOpen, openModal, closeModal } = useSearch();
  const [query, setQuery] = useState("");
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Load guides on mount
    async function loadGuides() {
      try {
        const response = await fetch("/api/search");
        const allGuides = await response.json();
        setGuides(allGuides as Guide[]);
        setFilteredGuides(allGuides as Guide[]);
      } catch (error) {
        console.error("Failed to load guides:", error);
      }
    }
    loadGuides();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openModal();
      }
      if (e.key === "Escape") {
        closeModal();
        setQuery("");
        setSelectedIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal, closeModal]);


  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredGuides(guides);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = guides.filter((guide) => {
      const title = guide.meta.title?.toLowerCase() || "";
      const subtitle = guide.meta.subtitle?.toLowerCase() || "";
      const category = guide.meta.category?.toLowerCase() || "";
      return (
        title.includes(searchTerm) ||
        subtitle.includes(searchTerm) ||
        category.includes(searchTerm)
      );
    });
    setFilteredGuides(filtered);
    setSelectedIndex(0);
  }, [query, guides]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredGuides.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && filteredGuides[selectedIndex]) {
      e.preventDefault();
      router.push(`/guides/${filteredGuides[selectedIndex].slug}`);
      closeModal();
      setQuery("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
      onClick={() => {
        closeModal();
        setQuery("");
      }}
    >
      <div
        className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-4 h-4 text-white/40" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Suche nach Guides..."
            className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none text-sm"
          />
          <button
            onClick={() => {
              closeModal();
              setQuery("");
            }}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {filteredGuides.length === 0 ? (
            <div className="px-4 py-8 text-center text-white/40 text-sm">
              Keine Ergebnisse gefunden
            </div>
          ) : (
            <div className="py-2">
              {filteredGuides.map((guide, index) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  onClick={() => {
                    closeModal();
                    setQuery("");
                  }}
                  className={`block px-4 py-3 hover:bg-white/5 transition-colors ${
                    index === selectedIndex ? "bg-white/5" : ""
                  }`}
                >
                  <div className="text-sm font-bold text-white mb-1">
                    {guide.meta.title}
                  </div>
                  {guide.meta.subtitle && (
                    <div className="text-xs text-white/40 line-clamp-1">
                      {guide.meta.subtitle}
                    </div>
                  )}
                  {guide.meta.category && (
                    <div className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">
                      {guide.meta.category}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
