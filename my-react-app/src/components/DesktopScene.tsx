const DesktopScene = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-orange-400 via-pink-300 to-blue-400 flex items-center justify-center p-8 overflow-hidden">
      {/* Dawn sky effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,200,100,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(100,150,255,0.2),transparent_60%)]" />

      {/* Desk Surface */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl">
        {/* Computer Monitor */}
        <div className="relative mx-auto" style={{ perspective: "2000px" }}>
          {/* Monitor Stand */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-lg" 
               style={{ transform: "translateX(-50%) translateY(50%)" }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-4 bg-slate-800 rounded-full shadow-2xl" />
          </div>

          {/* Monitor Frame */}
          <div 
            className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl border-4 border-slate-700"
            style={{ 
              transform: "rotateX(5deg)",
              boxShadow: "0 50px 100px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.1)"
            }}
          >
            {/* Monitor Bezel */}
            <div className="relative bg-black rounded-xl overflow-hidden shadow-inner">
              {/* Screen Content - VR Interface frozen */}
              <div className="aspect-video bg-background relative overflow-hidden">
                {/* VR Grid Background (static) */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),hsl(var(--vr-grid)/0.3)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_30px]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_calc(50%-1px),hsl(var(--vr-grid)/0.3)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:30px_100%]" />
                </div>

                {/* Central Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,hsl(var(--primary)/0.15)_0%,transparent_70%)]" />

                {/* Welcome Message (small version) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border border-primary/50 rounded-lg p-6 bg-card/60 backdrop-blur-sm max-w-xs">
                    <h3 className="text-lg font-bold text-center text-foreground mb-3">
                      Bonjour, <span className="text-primary text-sm">utilisateur</span>
                    </h3>
                    <div className="text-xs text-center text-primary/70 font-mono">
                      SYSTÈME ACTIF
                    </div>
                  </div>
                </div>

                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Monitor LED */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))] animate-pulse-glow" />
            </div>

            {/* Monitor Brand */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-500 text-xs font-semibold">
              VR TECH
            </div>
          </div>
        </div>

        {/* Desk Items */}
        <div className="absolute -bottom-20 left-0 right-0 flex justify-around items-end px-12">
          {/* Coffee Mug */}
          <div className="w-16 h-20 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-2xl shadow-xl relative">
            <div className="absolute top-0 left-0 right-0 h-3 bg-slate-600 rounded-t-2xl" />
            <div className="absolute top-1/4 -right-3 w-6 h-8 border-4 border-slate-700 rounded-r-full" />
          </div>

          {/* Plant */}
          <div className="relative">
            <div className="w-12 h-16 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-t-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-amber-800 to-amber-900 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-fade-in">
        <p className="text-slate-700 font-mono text-sm drop-shadow-lg">
          Bienvenue dans l'expérience VR
        </p>
      </div>
    </div>
  );
};

export default DesktopScene;
