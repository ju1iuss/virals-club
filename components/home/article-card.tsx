"use client";

import Link from "next/link";
import { Bookmark, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/auth-context";
import { createClient } from "@/lib/supabase/client";

interface ArticleCardProps {
  id: string;
  category: string;
  author: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
  slug: string;
  type?: string;
}

export function ArticleCard({ id, category, author, title, excerpt, date, readTime, image, slug, type = "guide" }: ArticleCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const { user, openModal } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    const checkSaved = async () => {
      if (user && id) {
        const { data } = await supabase
          .from("saved_guides")
          .select("id")
          .eq("user_id", user.id)
          .eq("guide_id", id)
          .single();
        
        if (data) setIsSaved(true);
      }
    };
    checkSaved();
  }, [user, id, supabase]);

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      openModal();
      return;
    }

    try {
      if (isSaved) {
        await supabase
          .from("saved_guides")
          .delete()
          .eq("user_id", user.id)
          .eq("guide_id", id);
        setIsSaved(false);
      } else {
        await supabase
          .from("saved_guides")
          .insert({ user_id: user.id, guide_id: id });
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const url = `${window.location.origin}${getPath()}`;
      const message = `Hey, habe diese Page über AI growth gefunden, check das mal aus:\n\n${url}`;
      await navigator.clipboard.writeText(message);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const getPath = () => {
    if (type === "blog") return `/blog/${slug}`;
    if (type === "page") return `/${slug}`;
    return `/guides/${slug}`;
  };
  return (
    <div className="group py-6 first:pt-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] -mx-4 px-4 transition-all rounded-xl border-b border-black/[0.05] dark:border-white/[0.05] last:border-0">
      <div className="flex justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] text-black/60 dark:text-white/30 mb-2 uppercase tracking-wider font-bold">
            <span className="text-accent-vibrant">{category}</span>
            <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/10" />
            <span>{author}</span>
          </div>
          
          <Link href={getPath()}>
            <h2 className="text-xl md:text-2xl font-bold font-helvetica mb-2 leading-tight group-hover:text-black dark:group-hover:text-white transition-colors text-black dark:text-white/90">
              {title}
            </h2>
          </Link>
          
          <p className="text-sm text-black/70 dark:text-white/40 mb-4 max-w-xl line-clamp-2 leading-relaxed font-sans">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-black/50 dark:text-white/20 uppercase tracking-widest font-medium">
              <span>{date}</span>
              <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/10" />
              <span>{readTime}</span>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={toggleSave}
                className={cn(
                  "p-1.5 rounded-full border transition-all",
                  isSaved ? "bg-accent-vibrant border-accent-vibrant text-black" : "text-black/50 dark:text-white/20 hover:text-black dark:hover:text-white border-transparent hover:border-black/10 dark:hover:border-white/10"
                )}
                title={isSaved ? "Saved" : "Save for later"}
              >
                <Bookmark className={cn("w-3.5 h-3.5", isSaved && "fill-current")} />
              </button>
              <button 
                onClick={handleShare}
                className={cn(
                  "p-1.5 rounded-full border transition-all",
                  isShared ? "bg-green-500/20 border-green-500/50 text-green-500" : "text-black/50 dark:text-white/20 hover:text-black dark:hover:text-white border-transparent hover:border-black/10 dark:hover:border-white/10"
                )}
                title={isShared ? "Link kopiert!" : "Share"}
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
        
        {image && (
          <div className="hidden sm:block w-32 h-24 md:w-40 md:h-28 bg-white/5 dark:bg-white/5 bg-black/5 rounded-lg relative overflow-hidden transition-all duration-500 border border-white/5 dark:border-white/5 border-black/10 group-hover:border-white/10 dark:group-hover:border-white/10 group-hover:border-black/20">
             <Image 
                src={image} 
                alt={title}
                fill
                className="object-cover opacity-100 group-hover:scale-105 transition-all duration-700"
             />
          </div>
        )}
      </div>
    </div>
  );
}
