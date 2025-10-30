import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VRLoadingScreenProps {
  onComplete: () => void;
}

const VRLoadingScreen = ({ onComplete }: VRLoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          setTimeout(() => setShowWelcome(true), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* VR Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),hsl(var(--vr-grid)/0.3)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_40px] animate-grid-flow" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_calc(50%-1px),hsl(var(--vr-grid)/0.3)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:40px_100%]" />
      </div>

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-scan-line" />
      </div>

      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--primary)/0.2)_0%,transparent_70%)] animate-pulse-glow" />

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {!showWelcome ? (
          <>
            {/* Loading Ring */}
            <div className="mb-12 relative">
              <div className="w-32 h-32 rounded-full border-4 border-muted" />
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-primary border-t-transparent animate-spin"
                style={{ animationDuration: "1s" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
            </div>

            {/* Status Text */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground tracking-wider">
              {isComplete ? (
                <span className="text-primary animate-fade-in">TERMINÉ</span>
              ) : (
                "CHARGEMENT"
              )}
            </h1>

            {/* Loading Bar */}
            <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full shadow-[0_0_20px_hsl(var(--primary)/0.8)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {/* Percentage */}
            <p className="text-2xl font-mono text-primary animate-pulse-glow">
              {loadingProgress}%
            </p>
          </>
        ) : (
          /* Welcome Modal */
          <div className="animate-fade-in">
            <div className="relative border-2 border-primary rounded-2xl p-12 bg-card/80 backdrop-blur-xl shadow-[0_0_50px_hsl(var(--primary)/0.3)] max-w-lg">
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg" />

              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
                Bonjour, <span className="text-primary">utilisateur</span>
              </h2>

              <Button
                onClick={onComplete}
                className="w-full py-6 text-xl font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 rounded-xl shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)] border-2 border-primary/50"
              >
                Commencer
              </Button>
            </div>
          </div>
        )}

        {/* HUD Elements */}
        <div className="absolute top-8 left-8 text-primary/60 font-mono text-sm">
          <p>SYSTÈME: ACTIF</p>
          <p>STATUT: {isComplete ? "PRÊT" : "INITIALISATION"}</p>
        </div>

        <div className="absolute bottom-8 right-8 text-primary/60 font-mono text-sm text-right">
          <p>VR MODE: ENABLED</p>
          <p>RES: 3840x2160</p>
        </div>
      </div>
    </div>
  );
};

export default VRLoadingScreen;
