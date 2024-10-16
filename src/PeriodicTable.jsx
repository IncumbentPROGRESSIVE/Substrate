// PeriodicTable.jsx
import React, { useState } from "react";
import { mergePeriodicTableData } from "./mergePeriodicTableData";
import "./periodicTable.css";

function PeriodicTable() {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const elements = mergePeriodicTableData(); // Get the merged data

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleTableVisibility}>
        {isTableVisible ? "Hide Table" : "Show Table"}
      </button>

      {isTableVisible && (
        <div className="periodic-table-wrapper">
          <div className="periodic-table">
            {elements.map((element) => (
              <div
                key={element.symbol}
                className={`element ${element.category}`}
                style={{
                  gridColumn: element.xpos,
                  gridRow: element.ypos,
                }}
              >
                <span className="number">{element.number}</span>
                <span className="symbol">{element.symbol}</span>
                <span className="name">{element.name}</span>
                <span className="atomic-mass">
                  {parseFloat(element.atomic_mass).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PeriodicTable;
