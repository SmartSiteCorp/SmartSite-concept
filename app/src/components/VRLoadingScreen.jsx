import { useState, useEffect } from "react";
import { Button } from "components/ui/button";
import "./styles/VRLoadingScreen.css";

const VRLoadingScreen = ({ onComplete, variant = "standalone" }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const rootClassName = [
    "vr-loading-screen",
    variant === "embedded" ? "vr-loading-screen--embedded" : null,
  ]
    .filter(Boolean)
    .join(" ");

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
    <div className={rootClassName}>
      {/* VR Grid Background */}
      <div className="vr-grid-background">
        <div className="vr-grid-horizontal" />
        <div className="vr-grid-vertical" />
      </div>

      {/* Scanning Line Effect */}
      <div className="scanning-line-container">
        <div className="scanning-line" />
      </div>

      {/* Central Glow */}
      <div className="central-glow" />

      {/* Loading Content */}
      <div className="loading-content">
        {!showWelcome ? (
          <>
            {/* Loading Ring */}
            <div className="loading-ring-container">
              <div className="loading-ring-outer" />
              <div className="loading-ring-spinner" />
              <div className="loading-ring-glow" />
            </div>

            {/* Status Text */}
            <h1 className="status-title">
              {isComplete ? (
                <span className="status-title-complete">TERMINÉ</span>
              ) : (
                "CHARGEMENT"
              )}
            </h1>

            {/* Loading Bar */}
            <div className="loading-bar-container">
              <div
                className="loading-bar-fill"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {/* Percentage */}
            <p className="percentage-text">
              {loadingProgress}%
            </p>
          </>
        ) : (
          /* Welcome Modal */
          <div className="welcome-modal-container">
            <div className="welcome-modal">
              {/* Corner Decorations */}
              <div className="corner-decoration corner-top-left" />
              <div className="corner-decoration corner-top-right" />
              <div className="corner-decoration corner-bottom-left" />
              <div className="corner-decoration corner-bottom-right" />

              <h2 className="welcome-title">
                Bonjour, <span className="welcome-title-highlight">utilisateur</span>
              </h2>

              <Button
                onClick={onComplete}
                className="welcome-button"
              >
                Commencer
              </Button>
            </div>
          </div>
        )}

        {/* HUD Elements */}
        <div className="hud-element hud-top-left">
          <p>SYSTÈME: ACTIF</p>
          <p>STATUT: {isComplete ? "PRÊT" : "INITIALISATION"}</p>
        </div>

        <div className="hud-element hud-bottom-right">
          <p>VR MODE: ENABLED</p>
          <p>RES: 3840x2160</p>
        </div>
      </div>
    </div>
  );
};

export default VRLoadingScreen;
