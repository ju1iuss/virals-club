export function Hero() {
  const today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  return (
    <section className="py-12 md:py-16 flex flex-col items-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-vibrant/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-black/20 dark:bg-white/10" />
          <span className="text-[10px] text-black/50 dark:text-white/30 tracking-[0.3em] uppercase font-bold">
            {today}
          </span>
          <div className="h-[1px] w-8 bg-black/20 dark:bg-white/10" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif text-center font-bold tracking-tighter leading-[0.9] mb-4 text-black dark:text-white">
          Virals Club <span className="text-black dark:text-white">Deutschland</span>
        </h1>
      </div>
    </section>
  );
}
