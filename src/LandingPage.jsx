import React, { useState } from "react";
import LabPad from "./LabPad";
import PeriodicTable from "./PeriodicTable";
import AccountState from "./AccountState";
import { DndContext } from "@dnd-kit/core";
import "./App.css";

const LandingPage = () => {
  const [isLabPadVisible, setIsLabPadVisible] = useState(false);
  const [elementsOnLabPad, setElementsOnLabPad] = useState([]);
  const [compoundsOnLabPad, setCompoundsOnLabPad] = useState([]);
  const [allElements, setAllElements] = useState([
    { id: "H", count: 10 },
    { id: "He", count: 10 },
    { id: "Li", count: 10 },
    { id: "Be", count: 10 },
    { id: "B", count: 10 },
    { id: "C", count: 10 },
    { id: "N", count: 10 },
    { id: "O", count: 10 },
    { id: "F", count: 10 },
    { id: "Ne", count: 10 },
    { id: "Na", count: 10 },
    { id: "Mg", count: 10 },
    { id: "Al", count: 10 },
    { id: "Si", count: 10 },
    { id: "P", count: 10 },
    { id: "S", count: 10 },
    { id: "Cl", count: 10 },
    { id: "Ar", count: 10 },
    { id: "K", count: 10 },
    { id: "Ca", count: 10 },
    { id: "Sc", count: 10 },
    { id: "Ti", count: 10 },
    { id: "V", count: 10 },
    { id: "Cr", count: 10 },
    { id: "Mn", count: 10 },
    { id: "Fe", count: 10 },
    { id: "Co", count: 10 },
    { id: "Ni", count: 10 },
    { id: "Cu", count: 10 },
    { id: "Zn", count: 10 },
    { id: "Ga", count: 10 },
    { id: "Ge", count: 10 },
    { id: "As", count: 10 },
    { id: "Se", count: 10 },
    { id: "Br", count: 10 },
    { id: "Kr", count: 10 },
    { id: "Rb", count: 10 },
    { id: "Sr", count: 10 },
    { id: "Y", count: 10 },
    { id: "Zr", count: 10 },
    { id: "Nb", count: 10 },
    { id: "Mo", count: 10 },
    { id: "Tc", count: 10 },
    { id: "Ru", count: 10 },
    { id: "Rh", count: 10 },
    { id: "Pd", count: 10 },
    { id: "Ag", count: 10 },
    { id: "Cd", count: 10 },
    { id: "In", count: 10 },
    { id: "Sn", count: 10 },
    { id: "Sb", count: 10 },
    { id: "Te", count: 10 },
    { id: "I", count: 10 },
    { id: "Xe", count: 10 },
    { id: "Cs", count: 10 },
    { id: "Ba", count: 10 },
    { id: "La", count: 10 },
    { id: "Ce", count: 10 },
    { id: "Pr", count: 10 },
    { id: "Nd", count: 10 },
    { id: "Pm", count: 10 },
    { id: "Sm", count: 10 },
    { id: "Eu", count: 10 },
    { id: "Gd", count: 10 },
    { id: "Tb", count: 10 },
    { id: "Dy", count: 10 },
    { id: "Ho", count: 10 },
    { id: "Er", count: 10 },
    { id: "Tm", count: 10 },
    { id: "Yb", count: 10 },
    { id: "Lu", count: 10 },
    { id: "Hf", count: 10 },
    { id: "Ta", count: 10 },
    { id: "W", count: 10 },
    { id: "Re", count: 10 },
    { id: "Os", count: 10 },
    { id: "Ir", count: 10 },
    { id: "Pt", count: 10 },
    { id: "Au", count: 10 },
    { id: "Hg", count: 10 },
    { id: "Tl", count: 10 },
    { id: "Pb", count: 10 },
    { id: "Bi", count: 10 },
    { id: "Po", count: 10 },
    { id: "At", count: 10 },
    { id: "Rn", count: 10 },
    { id: "Fr", count: 10 },
    { id: "Ra", count: 10 },
    { id: "Ac", count: 10 },
    { id: "Th", count: 10 },
    { id: "Pa", count: 10 },
    { id: "U", count: 10 },
    { id: "Np", count: 10 },
    { id: "Pu", count: 10 },
    { id: "Am", count: 10 },
    { id: "Cm", count: 10 },
    { id: "Bk", count: 10 },
    { id: "Cf", count: 10 },
    { id: "Es", count: 10 },
    { id: "Fm", count: 10 },
    { id: "Md", count: 10 },
    { id: "No", count: 10 },
    { id: "Lr", count: 10 },
    { id: "Rf", count: 10 },
    { id: "Db", count: 10 },
    { id: "Sg", count: 10 },
    { id: "Bh", count: 10 },
    { id: "Hs", count: 10 },
    { id: "Mt", count: 10 },
    { id: "Ds", count: 10 },
    { id: "Rg", count: 10 },
    { id: "Cn", count: 10 },
    { id: "Nh", count: 10 },
    { id: "Fl", count: 10 },
    { id: "Mc", count: 10 },
    { id: "Lv", count: 10 },
    { id: "Ts", count: 10 },
    { id: "Og", count: 10 },
  ]);

  const handleElementDragEnd = (id) => {
    const element = allElements.find((el) => el.id === id && el.count > 0);
    if (element) {
      setElementsOnLabPad((prev) => [
        ...prev,
        {
          id: `${id}-${Date.now()}`,
          displayName: id,
          position: { x: 50, y: 50 },
        },
      ]);
      setAllElements((prev) =>
        prev.map((el) => (el.id === id ? { ...el, count: el.count - 1 } : el))
      );
      setIsLabPadVisible(true);
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
      <AccountState /> {/* ✅ Reintroduced AccountState */}
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
