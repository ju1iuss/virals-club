import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/home/hero";
import { Feed } from "@/components/home/feed";
import { Sidebar } from "@/components/layout/sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto max-w-[1200px] px-4">
        <Hero />
        <Navigation />
        
        <main className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 py-10">
          <Feed />
          <Sidebar />
        </main>
      </div>
      
      <footer className="border-t divider-subtle py-10 mt-20">
        <div className="container mx-auto max-w-[1200px] px-4 text-center text-xs text-white/30">
          &copy; 2026 Virals Club Deutschland. Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
}
