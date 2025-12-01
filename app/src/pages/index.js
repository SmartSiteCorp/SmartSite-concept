import { useState } from "react";
import DesktopScene from "components/DesktopScene";
import Domain from "components/Domain";
import Drone from "components/Drone";
import Missions from "components/Missions";
import TuyauxDisplay from "components/Tuyaux";

const Index = () => {
    const [isDroneReady, setIsDroneReady] = useState(false);

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
                <div className="relative z-20" style={{ marginTop: '100vh' }}>
                    <Domain />
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
        </div>
    );
};

export default Index;
