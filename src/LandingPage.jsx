import React, { useState } from "react";
import LabPad from "./LabPad";
import PeriodicTable from "./PeriodicTable";
//import AccountState from "./AccountState";
import { DndContext } from "@dnd-kit/core";
import "./App.css";

const LandingPage = () => {
  const [isLabPadVisible, setIsLabPadVisible] = useState(false);
  const [elementsOnLabPad, setElementsOnLabPad] = useState([]);
  const [compoundsOnLabPad, setCompoundsOnLabPad] = useState([]);

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

  const updateCompoundPosition = (id, positionUpdater) => {
    setCompoundsOnLabPad((prev) =>
      prev.map((compound) =>
        compound.id === id
          ? { ...compound, position: positionUpdater(compound.position) }
          : compound
      )
    );
  };

  const addCompound = (compound) => {
    setCompoundsOnLabPad((prev) => [...prev, compound]);
  };

  const handleBackToTable = () => {
    setIsLabPadVisible(false);
  };

  return (
    <div className="landing-page">
      {/*<AccountState /> */}
      <DndContext>
        {isLabPadVisible ? (
          <>
            <LabPad
              elements={elementsOnLabPad}
              compounds={compoundsOnLabPad}
              updateElementPosition={updateElementPosition}
              updateCompoundPosition={updateCompoundPosition}
              addCompound={addCompound}
            />
            <button className="toggle-button" onClick={handleBackToTable}>
              Back to Periodic Table
            </button>
          </>
        ) : (
          <PeriodicTable onElementDragEnd={handleElementDragEnd} />
        )}
      </DndContext>
    </div>
  );
};

export default LandingPage;
