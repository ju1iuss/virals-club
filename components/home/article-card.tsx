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
    <div className="group py-6 first:pt-0 hover:bg-white/[0.01] -mx-4 px-4 transition-all rounded-lg border-b border-white/5 last:border-0">
      <div className="flex justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] text-white/30 mb-2 uppercase tracking-wider font-bold">
            <span className="text-accent-vibrant">{category}</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>{author}</span>
          </div>
          
          <Link href={`/guides/${slug}`}>
            <h2 className="text-xl md:text-2xl font-bold font-serif mb-2 leading-tight group-hover:text-white transition-colors text-white/90">
              {title}
            </h2>
          </Link>
          
          <p className="text-sm text-white/40 mb-4 max-w-xl line-clamp-2 leading-relaxed font-sans">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-white/20 uppercase tracking-widest font-medium">
              <span>{date}</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>{readTime}</span>
            </div>
            
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white/20 hover:text-white transition-colors">
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
        
        {image && (
          <div className="hidden sm:block w-32 h-24 md:w-40 md:h-28 bg-white/5 rounded-lg relative overflow-hidden transition-all duration-500 border border-white/5 group-hover:border-white/10">
             <Image 
                src={image} 
                alt={title}
                fill
                className="object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </div>
        )}
      </div>
    </div>
  );
}
