export function Hero() {
  const today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  return (
    <section className="py-16 md:py-24 flex flex-col items-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-vibrant/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-white/10" />
          <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-bold">
            {today}
          </span>
          <div className="h-[1px] w-8 bg-white/10" />
        </div>
        
        <h1 className="text-6xl md:text-9xl font-serif text-center font-bold tracking-tighter leading-[0.9] mb-8">
          Virals Club<br />
          <span className="text-white/20">Deutschland</span>
        </h1>
        
        <p className="text-sm md:text-base text-white/40 max-w-lg text-center leading-relaxed font-sans mb-10">
          Die exklusive Plattform für Growth Hacker, Creator und Marketer. 
          Strategien, die wirklich funktionieren.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-black bg-white/10 flex items-center justify-center text-[8px] font-bold overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
              </div>
            ))}
          </div>
          <span className="text-[11px] text-white/40 font-medium">
            <span className="text-white font-bold">2,400+</span> Mitglieder sind dabei
          </span>
        </div>
      </div>
    </section>
  );
}
