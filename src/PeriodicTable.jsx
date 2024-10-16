// PeriodicTable.jsx
import React from "react";
import { mergePeriodicTableData } from "./mergePeriodicTableData";
import "./periodicTable.css";

function PeriodicTable() {
  const elements = mergePeriodicTableData(); // Get the merged data

  return (
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
            <span className="symbol">{element.symbol}</span>
            <span className="number">{element.number}</span>
            <span className="name">{element.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeriodicTable;
