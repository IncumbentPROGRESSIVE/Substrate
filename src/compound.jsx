import React, { useState } from "react";

// Define cations and anions
const CATIONS = ["Na", "K", "Ca", "Mg", "H", "Li"]; // Add more cations
const ANIONS = ["Cl", "F", "Br", "I", "OH", "SO4", "NO3", "PO4"]; // Add more anions

const Compound = ({ compound, updateCompound }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Helper function to format the formula
  const getFormattedFormula = (components) => {
    const [first, second] = components;

    // Ensure cation comes first
    if (CATIONS.includes(first) && ANIONS.includes(second)) {
      return `${first}${second}`; // Correct order
    }
    if (CATIONS.includes(second) && ANIONS.includes(first)) {
      return `${second}${first}`; // Swap order
    }

    // Default case: join as provided (if neither is recognized)
    return components.join("");
  };

  // Handle edits and update the compound
  const handleEdit = (newComponents) => {
    console.log("New Components:", newComponents);
    const formattedFormula = getFormattedFormula(newComponents);
    console.log("Formatted Formula:", formattedFormula);
    updateCompound(compound.formula, {
      ...compound,
      formula: formattedFormula,
    });
    setIsEditing(false);
  };

  return (
    <div className="compound" onClick={() => setIsEditing(true)}>
      {compound.formula} ({compound.type})
      {isEditing && (
        <div className="modal">
          <h3>Edit Compound</h3>
          {/* Example UI for editing */}
          <button onClick={() => handleEdit(["Cl", "Na"])}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Compound;
