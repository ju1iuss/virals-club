"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function PostedAdCard() {
  return (
    <Link
      href="https://posted.dev"
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-accent-vibrant/30 transition-all group"
    >
      <div className="relative aspect-video bg-black/[0.02] dark:bg-white/[0.02]">
        <Image
          src="/ad1.png"
          alt="Posted.dev – Screenshot der App"
          fill
          quality={95}
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          sizes="(min-width: 1024px) 480px, 240px"
        />
      </div>
      <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-black dark:text-white">posted.dev</span>
          <ExternalLink className="w-3.5 h-3.5 text-black/40 dark:text-white/40 flex-shrink-0" />
        </div>
        <p className="text-[11px] text-black/50 dark:text-white/40 mt-1 leading-relaxed">
          TikTok Account Management und Bulk Post Creation - Try Now!
        </p>
      </div>
    </Link>
  );
}
