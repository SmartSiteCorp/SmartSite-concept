import { useState } from "react";
import VRLoadingScreen from "components/VRLoadingScreen";
import DesktopScene from "components/DesktopScene";
import Domain from "components/Domain";

const Index = () => {
    const [showDesktop, setShowDesktop] = useState(false);

    const handleComplete = () => {
        setShowDesktop(true);
    };

    return (
        <div className="relative w-full overflow-x-hidden">
            {/* Section 1: Desktop Scene (fixed, première section) */}
            <div className="fixed inset-0 z-10">
                <DesktopScene />
            </div>

            {/* Section 2: Domain (apparaît après le scroll) */}
            <div className="relative z-20" style={{ marginTop: '100vh' }}>
                <Domain />
            </div>
        </div>
    );
};

export default Index;
