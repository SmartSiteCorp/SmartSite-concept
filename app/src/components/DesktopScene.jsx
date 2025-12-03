import { useState, useEffect, useRef } from "react";
import VRLoadingScreen from "./VRLoadingScreen";
import "./styles/DesktopScene.css";
import rockImage from "../assets/desktop/rock.png";
import building1Image from "../assets/desktop/buliding1.png";
import building2Image from "../assets/desktop/building2.png";
import buildingbackImage from "../assets/desktop/buildingback.png";
import cloudImage from "../assets/desktop/cloud.png";
import grueImage from "../assets/desktop/grue.png";
import "./styles/fonts.css"
import SmartSiteLogo from "../assets/desktop/playButton.png";
const DesktopScene = ({ onLoadingComplete }) => {
  const [isZoomedIn, setIsZoomedIn] = useState(true);
  const [showVRLoading, setShowVRLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const building1Ref = useRef(null);
  const building2Ref = useRef(null);
  const grueRef = useRef(null);

    useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.001;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Scroll-driven horizontal parallax for buildings
  useEffect(() => {
    let rafId = null;

    const maxTranslate = 420; // px max translation for buildings
    const startOffset = 0; // px scroll at which animation starts

    const shouldDisable = () => {
      // disable on small screens (mobile)
      return window.innerWidth < 768;
    };

    if (shouldDisable()) {
      if (building1Ref.current) building1Ref.current.style.transform = "translate3d(0,0,0)";
      if (building2Ref.current) building2Ref.current.style.transform = "translate3d(0,0,0)";
      if (grueRef.current) grueRef.current.style.transform = "translate3d(0,0,0)";

      return;
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const range = window.innerHeight || document.documentElement.clientHeight;
        let progress = 0;
        if (scrollY > startOffset) progress = Math.min((scrollY - startOffset) / range, 1);
        // optional ease-out curve
        const eased = progress * (2 - progress);
        const tx = Math.round(eased * maxTranslate);

        if (building1Ref.current) {
          building1Ref.current.style.transform = `translate3d(${tx}px, 0, 0)`;
        }
        if (building2Ref.current) {
          building2Ref.current.style.transform = `translate3d(${-tx}px, 0, 0)`;
        }
        if (grueRef.current) {
          grueRef.current.style.transform = `translate3d(${tx}px, 0, 0)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // init
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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
      } ${isScrolled ? "is-scrolled" : ""}`}
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
                    <img src={SmartSiteLogo} alt="SmartSite Logo" className="smartsite-logo" />
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
      <img ref={building1Ref} src={building1Image} alt="Building" className="building1-asset" />

      {/* Building 2 Asset */}
      <img ref={building2Ref} src={building2Image} alt="Building 2" className="building2-asset" />

      {/* Building Back Asset */}
      <img src={buildingbackImage} alt="Building Background" className="buildingback-asset" />

      {/* Cloud Asset */}
      <img src={cloudImage} alt="Cloud" className="cloud-asset" />

      {/* Grue Asset */}
      <img ref={grueRef} src={grueImage} alt="Grue" className="grue-asset" />



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