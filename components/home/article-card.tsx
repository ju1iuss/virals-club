import Link from "next/link";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ArticleCardProps {
  category: string;
  author: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
  slug: string;
}

export function ArticleCard({ category, author, title, excerpt, date, readTime, image, slug }: ArticleCardProps) {
  return (
    <div className="group py-6 first:pt-0 hover:bg-white/[0.01] dark:hover:bg-white/[0.01] hover:bg-black/5 -mx-4 px-4 transition-all rounded-lg border-b border-white/5 dark:border-white/5 border-black/10 last:border-0">
      <div className="flex justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] text-black/60 dark:text-white/30 mb-2 uppercase tracking-wider font-bold">
            <span className="text-accent-vibrant">{category}</span>
            <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/10" />
            <span>{author}</span>
          </div>
          
          <Link href={`/guides/${slug}`}>
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
            
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-black/50 dark:text-white/20 hover:text-black dark:hover:text-white transition-colors">
                <Bookmark className="w-3.5 h-3.5" />
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
