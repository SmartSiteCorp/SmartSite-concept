// ImageDisplay.jsx
import React from "react";
import Tuyaux from "../assets/desktop/Tuyaux.png";
import './styles/Tuyaux.css';

export default function TuyauxDisplay() {
  return (
    <div className="tuyaux-wrapper">
      <img src={Tuyaux} alt="Tuyaux" className="tuyaux" />
    </div>
  );
}
