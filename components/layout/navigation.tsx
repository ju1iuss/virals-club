"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Alle", href: "/" },
  { label: "Strategie", href: "/strategie" },
  { label: "Formate", href: "/formate" },
  { label: "Trends", href: "/trends" },
  { label: "Meinung", href: "/meinung" },
  { label: "Newcomer", href: "/newcomer" },
  { label: "The Growth Lab", href: "/lab" },
  { label: "Case Studies", href: "/case-studies" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b divider-subtle flex items-center justify-center gap-8 py-4 overflow-x-auto no-scrollbar">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-xs uppercase tracking-widest font-bold transition-all whitespace-nowrap py-1 relative",
            pathname === item.href 
              ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-vibrant" 
              : "text-white/40 hover:text-white/80 hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[1px] hover:after:bg-white/20"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
