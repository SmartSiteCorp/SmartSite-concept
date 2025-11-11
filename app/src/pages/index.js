import { useState } from "react";
import VRLoadingScreen from "components/VRLoadingScreen";
import DesktopScene from "components/DesktopScene";

const Index = () => {
    const [showDesktop, setShowDesktop] = useState(false);

    const handleComplete = () => {
        setShowDesktop(true);
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Section 2: Desktop Scene (always visible) */}
            <div className="fixed inset-0 z-10">
                <DesktopScene />
            </div>

            {/* Section 1: VR Loading Screen (zooms out to become monitor screen) */}

        </div>
    );
};

export default Index;
