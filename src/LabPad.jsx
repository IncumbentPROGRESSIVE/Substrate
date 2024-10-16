// LabPad.jsx
import React, { useState } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import "./LabPad.css";

const LabPad = () => {
  const [elements, setElements] = useState([]);
  const { setNodeRef } = useDroppable({ id: "labpad" });

  const handleDrop = (event) => {
    const { active } = event;
    setElements((prev) => [...prev, active.id]);
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div ref={setNodeRef} className="lab-pad">
        {elements.map((element, index) => (
          <div key={index} className="lab-element">
            {element}
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default LabPad;
