import './DesktopScene.css';

const DesktopScene = () => {
  return (
    <div className="desktop-scene">
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
              {/* Screen Content - VR Interface frozen */}
              <div className="screen-content"> </div>

              {/* Monitor LED */}
              <div className="monitor-led" />
            </div>

            {/* Monitor Brand */}
            <div className="monitor-brand">
              VR TECH
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopScene;
