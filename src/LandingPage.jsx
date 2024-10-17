// LandingPage.jsx
import React, { useState } from "react";
import AccountState from "./AccountState";
import LabPad from "./LabPad";
import PeriodicTable from "./PeriodicTable";
import "./App.css";

const LandingPage = () => {
  const [isLabPadVisible, setIsLabPadVisible] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);

  const handleElementDragEnd = (id) => {
    if (id) {
      setDraggedElement(id);
      setIsLabPadVisible(true);
    }
  };

  const handleToggleClick = () => {
    setIsLabPadVisible((prev) => !prev);
  };

  return (
    <div className="landing-page">
      <AccountState />

      <button className="toggle-button" onClick={handleToggleClick}>
        {isLabPadVisible ? "Back to Table" : "Show LabPad"}
      </button>

      {isLabPadVisible ? (
        <LabPad element={draggedElement} />
      ) : (
        <PeriodicTable onElementDragEnd={handleElementDragEnd} />
      )}
    </div>
  );
};

export default LandingPage;
