// PeriodicTable.js
import React from "react";
import { mergePeriodicTableData } from "./mergePeriodicTableData";
import "./periodicTable.css"; // Import the dedicated CSS file for the periodic table

function PeriodicTable() {
  const elements = mergePeriodicTableData(); // Call the function to get merged data

  return (
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
          <span className="symbol">{element.symbol}</span>
          <span className="number">{element.number}</span>
          <span className="name">{element.name}</span>
        </div>
      ))}
    </div>
  );
}

export default PeriodicTable;
