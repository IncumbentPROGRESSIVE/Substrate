import React, { useState } from "react";

const Compound = ({ compound, updateCompound }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (newComponents) => {
    updateCompound(compound.formula, newComponents);
    setIsEditing(false);
  };

  return (
    <div className="compound" onClick={() => setIsEditing(true)}>
      {compound.formula} ({compound.type})
      {isEditing && (
        <div className="modal">
          <h3>Edit Compound</h3>
          {/* UI for editing components */}
          <button onClick={() => handleEdit(["H", "O"])}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Compound;
