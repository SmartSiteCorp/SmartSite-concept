import "./styles/BigMonitor.css";

const BigMonitor = ({ children, className = "", isClosing = false }) => {
  return (
    <div
      className={`big-monitor ${
        isClosing ? "big-monitor--closing" : ""
      } ${className}`}
    >
      <div className="big-monitor-frame">
        <div className="big-monitor-bezel">
          <div className="big-monitor-screen">
            <div className="big-monitor-screen-inner">{children}</div>
          </div>
        </div>

        <div className="big-monitor-led" />
      </div>
    </div>
  );
};

export default BigMonitor;
