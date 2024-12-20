import React, { useState } from "react";
import LabPad from "./LabPad";
import PeriodicTable from "./PeriodicTable";
import "./App.css";

const LandingPage = () => {
  const [isLabPadVisible, setIsLabPadVisible] = useState(false);
  const [elementsOnLabPad, setElementsOnLabPad] = useState([]);

  // Handle adding a new element to the LabPad
  const handleElementDragEnd = (id) => {
    if (id) {
      setElementsOnLabPad((prev) => {
        if (prev.find((el) => el.id === id)) return prev; // Avoid duplicates
        return [...prev, { id, position: { x: 0, y: 0 } }];
      });
      setIsLabPadVisible(true); // Show the LabPad when an element is dragged
    }
  };

  // Update the position of an element on the LabPad
  const updateElementPosition = (id, positionUpdater) => {
    setElementsOnLabPad((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, position: positionUpdater(el.position) } : el
      )
    );
  };

  // Handle returning to the Periodic Table
  const handleBackToTable = () => {
    setIsLabPadVisible(false); // Show the Periodic Table
  };

  return (
    <div className="landing-page">
      {isLabPadVisible ? (
        <LabPad
          elements={elementsOnLabPad}
          updateElementPosition={updateElementPosition}
        />
      ) : (
        <PeriodicTable onElementDragEnd={handleElementDragEnd} />
      )}
      {isLabPadVisible && (
        <button className="toggle-button" onClick={handleBackToTable}>
          Back to Periodic Table
        </button>
      )}
    </div>
  );
};

export default LandingPage;
