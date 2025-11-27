import { useState, useEffect } from "react";
import VRLoadingScreen from "./VRLoadingScreen";
import "./styles/DesktopScene.css";
import rockImage from "../assets/desktop/rock.png";
import building1Image from "../assets/desktop/buliding1.png";
import building2Image from "../assets/desktop/building2.png";
import buildingbackImage from "../assets/desktop/buildingback.png";
import cloudImage from "../assets/desktop/cloud.png";
import grueImage from "../assets/desktop/grue.png";
import "./styles/fonts.css"

const DesktopScene = ({ onLoadingComplete }) => {
  const [isZoomedIn, setIsZoomedIn] = useState(true);
  const [showVRLoading, setShowVRLoading] = useState(true);

  // Empêcher le scroll quand VRLoadingScreen est affiché
  useEffect(() => {
    if (showVRLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showVRLoading]);

  const handleLoadingComplete = () => {
    setIsZoomedIn(false);
    setTimeout(() => {
      setShowVRLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 1000);
  };

  return (
    <div
      className={`desktop-scene ${
        isZoomedIn ? "is-zoomed-in" : "is-zoomed-out"
      }`}
    >
      <h1 className="smartsite">SMARTSITE</h1>
            <div className="scene-wrapper">
        {/* Desk Surface */}
        <div className="desk-surface">
          {/* Computer Monitor */}
          <div className="computer-monitor">
            {/* Monitor Stand */}
            <div className="monitor-stand">
              <div className="monitor-stand-base" />
            </div>

            {/* Monitor Frame */}
            <div className="monitor-frame">
              {/* Monitor Bezel */}
              <div className="monitor-bezel">
                {/* Screen Content - Écran noir vide */}
                <div className="screen-content">
                  <div className="screen-content-inner">
                    {/* Écran vide/noir */}
                  </div>
                </div>

                {/* Monitor LED */}
                <div className="monitor-led" />
              </div>

              {/* Monitor Brand */}
              <div className="monitor-brand">VR TECH</div>
            </div>
          </div>
        </div>
      </div>
      {/* Ground Rectangle */}
      <div className="ground-rectangle" />

      {/* Rock Asset */}
      <img src={rockImage} alt="Rock" className="rock-asset" />

      {/* Building 1 Asset */}
      <img src={building1Image} alt="Building" className="building1-asset" />

      {/* Building 2 Asset */}
      <img src={building2Image} alt="Building 2" className="building2-asset" />

      {/* Building Back Asset */}
      <img src={buildingbackImage} alt="Building Background" className="buildingback-asset" />

      {/* Cloud Asset */}
      <img src={cloudImage} alt="Cloud" className="cloud-asset" />

      {/* Grue Asset */}
      <img src={grueImage} alt="Grue" className="grue-asset" />



      {/* VR Loading Screen - au-dessus en plein écran */}
      {showVRLoading && (
        <div
          className={`vr-loading-overlay ${
            !isZoomedIn ? "vr-loading-overlay--fade-out" : ""
          }`}
        >
          <VRLoadingScreen onComplete={handleLoadingComplete} />
        </div>
      )}
    </div>
  );
};

export default DesktopScene;