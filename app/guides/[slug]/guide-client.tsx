"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { SoftGate } from "@/components/content/soft-gate";
import Image from "next/image";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { Editor } from "@/components/admin/editor";
import { Edit2, Save, X, Eye, Upload, Bookmark, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/storage";
import { useAuth } from "@/components/auth/auth-context";
import { createClient } from "@/lib/supabase/client";
import { ArticleCard } from "@/components/home/article-card";
import { AdCard } from "@/components/guides/ad-card";

interface GuideClientProps {
  guide: any;
  isAdmin: boolean;
  mdxElement?: React.ReactNode;
  children?: React.ReactNode;
}

const CATEGORIES = [
  "Strategie",
  "Formate",
  "Trends",
  "Meinung",
  "Newcomer",
  "The Growth Lab",
  "Case Studies",
];

export function GuideClient({ guide: initialGuide, isAdmin: serverIsAdmin, mdxElement, children }: GuideClientProps) {
  const [guide, setGuide] = useState(initialGuide);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const headerImageInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const subtitleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { user, isAdmin: authIsAdmin, openModal } = useAuth();
  const isAdmin = serverIsAdmin || authIsAdmin;
  const supabase = createClient();

  useEffect(() => {
    const checkSaved = async () => {
      if (user && guide.id) {
        const { data, error } = await supabase
          .from("saved_guides")
          .select("id")
          .eq("user_id", user.id)
          .eq("guide_id", guide.id)
          .single();
        
        if (data) setIsSaved(true);
      }
    };
    checkSaved();
  }, [user, guide.id, supabase]);

  const toggleSave = async () => {
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
          .eq("guide_id", guide.id);
        setIsSaved(false);
      } else {
        await supabase
          .from("saved_guides")
          .insert({ user_id: user.id, guide_id: guide.id });
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      const message = `Hey, habe diese Page über AI growth gefunden, check das mal aus:\n\n${url}`;
      await navigator.clipboard.writeText(message);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  useLayoutEffect(() => {
    if (isEditing) {
      if (titleRef.current) {
        titleRef.current.style.height = 'auto';
        titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.height = 'auto';
        subtitleRef.current.style.height = subtitleRef.current.scrollHeight + 'px';
      }
    }
  }, [isEditing, guide.title, guide.subtitle]);

  const extensions = [
    StarterKit.configure({ link: false }),
    ImageExtension,
    Link.configure({ openOnClick: false }),
    TaskList,
    TaskItem,
    Highlight,
    Typography,
  ];

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(guide),
      });

      if (!res.ok) throw new Error("Failed to save changes");
      
      const updatedGuide = await res.json();
      setGuide(updatedGuide);
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleHeaderImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setSaving(true);
        const url = await uploadImage(file);
        setGuide({ ...guide, image: url });
      } catch (err) {
        console.error("Header image upload failed:", err);
        alert("Failed to upload header image.");
      } finally {
        setSaving(false);
      }
    }
  };

  let contentHtml = "";
  let isMdx = false;
  let mdxSource = "";

  if (guide.content) {
    if (typeof guide.content === 'object' && guide.content !== null && 'mdx' in guide.content) {
      isMdx = true;
      mdxSource = guide.content.mdx;
    } else {
      let tiptapContent = guide.content;
      if (Array.isArray(tiptapContent)) {
        tiptapContent = { type: "doc", content: tiptapContent };
      } else if (tiptapContent.type !== "doc") {
        tiptapContent = { type: "doc", content: [] };
      }
      try {
        contentHtml = generateHTML(tiptapContent, extensions);
      } catch (e) {
        contentHtml = "<p>Content could not be loaded.</p>";
      }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guide.title,
        "author": { "@type": "Person", "name": guide.author || "VCD Team" },
        "datePublished": guide.date || "",
        "description": guide.subtitle || guide.title
      }} />
      
      <Header />
      
      <div className="container mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-12 py-12">
          <aside className="hidden lg:block space-y-6 sticky top-32 h-fit">
            <AdCard />
          </aside>

          <article className="max-w-[720px] mx-auto text-black dark:text-white">
            {isAdmin && (
              <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-vibrant text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-all shadow-xl"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Page
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-accent-vibrant text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-all shadow-xl disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/10 text-black dark:text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

            <header className="mb-12">
              <div className="flex items-center gap-2 text-[10px] text-accent-vibrant font-bold tracking-[0.2em] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-vibrant animate-pulse" />
                {isEditing ? (
                  <select 
                    value={guide.category}
                    onChange={(e) => setGuide({ ...guide, category: e.target.value })}
                    className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-2 py-1 focus:outline-none focus:border-accent-vibrant text-black dark:text-white uppercase text-[10px] font-bold"
                  >
                    <option value="">Kategorie wählen</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                ) : guide.category}
              </div>

              {isEditing ? (
                <div className="space-y-4 mb-10">
                  <textarea 
                    ref={titleRef}
                    value={guide.title}
                    onChange={(e) => setGuide({ ...guide, title: e.target.value })}
                    className="text-4xl md:text-6xl font-helvetica font-bold w-full bg-transparent border-b border-black/10 dark:border-white/10 focus:outline-none focus:border-accent-vibrant leading-[1.1] tracking-tight resize-none overflow-hidden text-black dark:text-white"
                    placeholder="Page Title"
                    rows={1}
                  />
                  <textarea 
                    ref={subtitleRef}
                    value={guide.subtitle}
                    onChange={(e) => setGuide({ ...guide, subtitle: e.target.value })}
                    className="text-xl md:text-2xl text-black/50 dark:text-white/50 w-full bg-transparent border-b border-black/10 dark:border-white/10 focus:outline-none focus:border-accent-vibrant font-sans leading-relaxed font-light resize-none overflow-hidden"
                    placeholder="Subtitle"
                    rows={1}
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl md:text-6xl font-helvetica font-bold mb-6 leading-[1.1] tracking-tight">
                    {guide.title}
                  </h1>
                  {guide.subtitle && (
                    <p className="text-xl md:text-2xl text-black/50 dark:text-white/50 mb-10 font-sans leading-relaxed font-light">
                      {guide.subtitle}
                    </p>
                  )}
                </>
              )}

              <div className="flex items-center justify-between py-6 border-y border-black/10 dark:border-white/5 mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold border border-black/10 dark:border-white/5 text-black dark:text-white">
                    {guide.author ? guide.author.split(' ').map((n: string) => n[0]).join('') : 'VC'}
                  </div>
                  <div className="flex flex-col">
                    {isEditing ? (
                      <div className="flex flex-col gap-2">
                        <input 
                          type="text"
                          value={guide.author}
                          onChange={(e) => setGuide({ ...guide, author: e.target.value })}
                          className="text-xs font-bold text-black/90 dark:text-white/90 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-2 py-0.5 focus:outline-none focus:border-accent-vibrant"
                        />
                        <div className="flex gap-2">
                          <select
                            value={guide.type || "guide"}
                            onChange={(e) => setGuide({ ...guide, type: e.target.value })}
                            className="text-[10px] font-bold uppercase tracking-widest bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-2 py-0.5 focus:outline-none focus:border-accent-vibrant text-black/60 dark:text-white/60"
                          >
                            <option value="guide">Guide</option>
                            <option value="blog">Blog</option>
                            <option value="page">Page</option>
                            <option value="tip">Tip</option>
                          </select>
                          <select
                            value={guide.status || "published"}
                            onChange={(e) => setGuide({ ...guide, status: e.target.value })}
                            className="text-[10px] font-bold uppercase tracking-widest bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-2 py-0.5 focus:outline-none focus:border-accent-vibrant text-black/60 dark:text-white/60"
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-black/90 dark:text-white/90">{guide.author || 'VCD Team'}</span>
                    )}
                    <span className="text-[10px] text-black/40 dark:text-white/40">{guide.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleSave}
                      className={`p-2 rounded-full border transition-all ${isSaved ? 'bg-accent-vibrant border-accent-vibrant text-black' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'}`}
                      title={isSaved ? "Saved" : "Save for later"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      onClick={handleShare}
                      className={`p-2 rounded-full border transition-all ${isShared ? 'bg-green-500/20 border-green-500/50 text-green-500' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'}`}
                      title={isShared ? "Link kopiert!" : "Share"}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-black/40 dark:text-white/40 font-medium uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" />
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-black/20 dark:text-white/20 uppercase tracking-widest font-bold">Read Time:</span>
                          <input 
                            type="text"
                            value={guide.read_time}
                            onChange={(e) => setGuide({ ...guide, read_time: e.target.value })}
                            className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-2 py-0.5 focus:outline-none focus:border-accent-vibrant w-24"
                          />
                        </div>
                      ) : guide.read_time}
                    </span>
                  </div>
                </div>
              </div>

              {guide.image && (
                <div className={`relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-16 glow-subtle border border-black/10 dark:border-white/5 ${isEditing ? 'opacity-50' : ''}`}>
                  <Image 
                    src={guide.image} 
                    alt={guide.title}
                    fill
                    className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                    priority
                  />
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        onClick={() => headerImageInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-black/60 dark:bg-black/60 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 hover:bg-black/80 transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        Change Header Image
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {isEditing && !guide.image && (
                <div className="mb-16">
                  <button 
                    onClick={() => headerImageInputRef.current?.click()}
                    className="w-full aspect-[21/9] rounded-xl border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center gap-4 hover:border-accent-vibrant/50 hover:bg-black/5 dark:hover:bg-white/5 transition-all group"
                  >
                    <Upload className="w-8 h-8 text-black/20 dark:text-white/20 group-hover:text-accent-vibrant transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors">Upload Header Image</span>
                  </button>
                </div>
              )}

              <input 
                type="file" 
                ref={headerImageInputRef} 
                onChange={handleHeaderImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              
              {isEditing && (
                <div className="flex flex-col gap-6 mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`flex flex-col gap-3 p-4 rounded-xl border transition-all cursor-pointer ${!guide.gated ? 'bg-green-500/10 border-green-500/50' : 'bg-white/5 border-white/10 opacity-50 hover:opacity-100'}`} onClick={() => setGuide({ ...guide, gated: false })}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500">Open Access</span>
                        {!guide.gated && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
                      </div>
                      <p className="text-xs text-black/40 dark:text-white/40">Anyone can read this guide without logging in.</p>
                    </div>

                    <div className={`flex flex-col gap-3 p-4 rounded-xl border transition-all cursor-pointer ${guide.gated ? 'bg-accent-vibrant/10 border-accent-vibrant/50' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 opacity-50 hover:opacity-100'}`} onClick={() => setGuide({ ...guide, gated: true })}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-vibrant">Closed Access</span>
                        {guide.gated && <div className="w-2 h-2 rounded-full bg-accent-vibrant shadow-[0_0_10px_rgba(255,107,0,0.5)]" />}
                      </div>
                      <p className="text-xs text-black/40 dark:text-white/40">Users must be logged in to read the full guide.</p>
                    </div>
                  </div>

                  {!guide.image && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 mb-2">Header Image URL (Optional)</label>
                      <input 
                        type="text"
                        value={guide.image || ""}
                        onChange={(e) => setGuide({ ...guide, image: e.target.value })}
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-vibrant text-black dark:text-white"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  )}
                </div>
              )}
            </header>
            
            <div className="prose dark:prose-invert prose-p:text-black/80 dark:prose-p:text-white/80 prose-p:leading-[1.8] prose-p:mb-8 prose-headings:text-black dark:prose-headings:text-white prose-headings:font-helvetica prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4 prose-strong:text-black dark:prose-strong:text-white prose-strong:font-bold prose-li:text-black/80 dark:prose-li:text-white/80 prose-li:mb-3 prose-ul:mb-8 prose-ol:mb-8 max-w-none text-[17px] selection:bg-accent-vibrant/30">
              {isEditing ? (
                <Editor 
                  content={guide.content} 
                  onChange={(content) => setGuide({ ...guide, content })} 
                />
              ) : (
                <SoftGate isGated={guide.gated}>
                  {isMdx ? (
                    <div className="mdx-content">
                      {/* For MDX we show a warning that it needs to be converted if editing is desired */}
                      {isAdmin && <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400 mb-8">This is legacy MDX content. Click Edit to convert it to the new editor format.</div>}
                      {mdxElement}
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: contentHtml || "<p>No content available.</p>" }} />
                  )}
                </SoftGate>
              )}
            </div>

            {error && (
              <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                {error}
              </div>
            )}

            {children}
          </article>

          <aside className="hidden lg:block space-y-6 sticky top-32 h-fit">
            <AdCard />
          </aside>
        </div>
      </div>
    </div>
  );
}
