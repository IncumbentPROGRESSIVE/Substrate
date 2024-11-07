import React, { useState } from "react";
import AccountState from "./AccountState";
import LabPad from "./LabPad";
import PeriodicTable from "./PeriodicTable";
import "./App.css";

const LandingPage = () => {
  const [isLabPadVisible, setIsLabPadVisible] = useState(false);
  const [elementsOnLabPad, setElementsOnLabPad] = useState([]);

  const handleElementDragEnd = (id) => {
    if (id) {
      setElementsOnLabPad((prev) => {
        if (prev.find((el) => el.id === id)) return prev;
        return [...prev, { id, position: { x: 0, y: 0 } }];
      });
      setIsLabPadVisible(true);
    }
  };

  const updateElementPosition = (id, position) => {
    setElementsOnLabPad((prev) =>
      prev.map((el) => (el.id === id ? { ...el, position } : el))
    );
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
        <LabPad
          elements={elementsOnLabPad}
          updateElementPosition={updateElementPosition}
        />
      ) : (
        <PeriodicTable onElementDragEnd={handleElementDragEnd} />
      )}
    </div>
  );
};

export default LandingPage;
