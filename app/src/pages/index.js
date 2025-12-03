import { useState } from "react";
import DesktopScene from "components/DesktopScene";
import Domain from "components/Domain";
import Drone from "components/Drone";
import Missions from "components/Missions";
import TuyauxDisplay from "components/Tuyaux";
import BigMonitor from "components/BigMonitor"; 

const Index = () => {
    const [isDroneReady, setIsDroneReady] = useState(false);
    const [showBigMonitor, setShowBigMonitor] = useState(false); 
      const [isBigMonitorClosing, setIsBigMonitorClosing] = useState(false);
        const openBigMonitor = () => {
    setIsBigMonitorClosing(false);
    setShowBigMonitor(true);
  };

  const closeBigMonitor = () => {
    setIsBigMonitorClosing(true);
    setTimeout(() => {
      setShowBigMonitor(false);
      setIsBigMonitorClosing(false);
    }, 200);
    };

    return (
        <div className="relative w-full overflow-x-hidden">
            {/* Drone flottant */}
            <Drone isVisible={isDroneReady} />

            {/* Section 1: Desktop Scene (fixed, première section) */}
            <div className="fixed inset-0 z-10">
                <DesktopScene onLoadingComplete={() => setIsDroneReady(true)} />
            </div>
            {/* Section 2: Domain (affichée seulement après validation/fin du chargement) */}
            {isDroneReady && (
                <div className="relative z-20" style={{ marginTop: "100vh" }}>
                <Domain onOpenBigMonitor={openBigMonitor} />
                </div>
            )}
            {isDroneReady && (
                <div className="relative z-30" style={{ }}>
                    <TuyauxDisplay />
                </div>
            )}


            {/* Section 3: Missions (affichée seulement après validation/fin du chargement) */}
            {isDroneReady && (
                <div className="relative z-20">
                    <Missions />
                </div>
            )}
      {showBigMonitor && (
        <div className="big-monitor-overlay" onClick={closeBigMonitor}>
          <div
            className="big-monitor-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
<BigMonitor isClosing={isBigMonitorClosing}>
  <iframe
    className="big-monitor-video"
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/O9C1s-G8-LM"
    title="YouTube video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</BigMonitor>
          </div>
        </div>
      )}

        </div>
    );
};

export default Index;
