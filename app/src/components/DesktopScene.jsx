import { useState } from "react";
import VRLoadingScreen from "./VRLoadingScreen";
import "./styles/DesktopScene.css";
import rockImage from "../assets/desktop/rock.png";
import building1Image from "../assets/desktop/buliding1.png";
import buildingbackImage from "../assets/desktop/buildingback.png";
import "./styles/fonts.css"

const DesktopScene = () => {
  const [isZoomedIn, setIsZoomedIn] = useState(true);
  const [showVRLoading, setShowVRLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsZoomedIn(false);
    setTimeout(() => {
      setShowVRLoading(false);
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

      {/* Building Back Asset */}
      <img src={buildingbackImage} alt="Building Background" className="buildingback-asset" />



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