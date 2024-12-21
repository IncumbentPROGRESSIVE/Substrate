import React, { useState } from "react";
import LabPad from "./LabPad";
import PeriodicTable from "./PeriodicTable";
import "./App.css";

const LandingPage = () => {
  const [isLabPadVisible, setIsLabPadVisible] = useState(false);
  const [elementsOnLabPad, setElementsOnLabPad] = useState([]);

  const handleElementDragEnd = (id) => {
    if (id) {
      setElementsOnLabPad((prev) => {
        if (prev.find((el) => el.id === id)) return prev; // Avoid duplicates
        return [...prev, { id, position: { x: 50, y: 50 } }]; // Initial position
      });
      setIsLabPadVisible(true); // Show the LabPad
    }
  };

  const updateElementPosition = (id, positionUpdater) => {
    setElementsOnLabPad((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, position: positionUpdater(el.position) } : el
      )
    );
  };

  const handleBackToTable = () => {
    setIsLabPadVisible(false);
  };

  return (
    <div className="landing-page">
      {isLabPadVisible ? (
        <>
          <LabPad
            elements={elementsOnLabPad}
            updateElementPosition={updateElementPosition}
          />
          <button className="toggle-button" onClick={handleBackToTable}>
            Back to Periodic Table
          </button>
        </>
      ) : (
        <PeriodicTable onElementDragEnd={handleElementDragEnd} />
      )}
    </div>
  );
};

export default LandingPage;
