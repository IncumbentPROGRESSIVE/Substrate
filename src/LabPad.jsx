import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { canBond, createCompound } from "./bondingRules";
import "./LabPad.css";

const LabPad = ({ elements, updateElementPosition }) => {
  const [compounds, setCompounds] = useState([]); // Store bonded compounds
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { delta } = event;

    if (!id || !delta) return;

    // Update the dragged element's position
    updateElementPosition(id, (prevPosition) => ({
      x: prevPosition.x + delta.x,
      y: prevPosition.y + delta.y,
    }));

    // Detect collisions and bond elements if needed
    detectCollisions(id);
  };

  const detectCollisions = (draggedId) => {
    const draggedElement = elements.find((el) => el.id === draggedId);
    if (!draggedElement) return;

    elements.forEach((el) => {
      if (el.id !== draggedId && isColliding(draggedElement, el)) {
        handleBonding(draggedElement, el);
      }
    });
  };

  const handleBonding = (element1, element2) => {
    if (canBond(element1.id, element2.id)) {
      const newCompound = {
        ...createCompound(element1.id, element2.id),
        position: element1.position, // Compound takes the position of the first element
      };

      setCompounds((prev) => [...prev, newCompound]);
      removeElement(element1.id);
      removeElement(element2.id);
    }
  };

  const removeElement = (id) => {
    updateElementPosition(id, () => null); // Safely remove element
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="lab-pad">
        {elements
          .filter((element) => element.position) // Filter out invalid elements
          .map((element) => (
            <DraggableElement
              key={element.id}
              id={element.id}
              position={element.position}
            />
          ))}
        {compounds.map((compound, index) => (
          <Compound key={index} compound={compound} />
        ))}
      </div>
    </DndContext>
  );
};

const DraggableElement = ({ id, position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate(${position.x + (transform?.x || 0)}px, ${
      position.y + (transform?.y || 0)
    }px)`,
    position: "absolute",
    zIndex: 10,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      className="lab-element"
      style={style}
      {...listeners}
      {...attributes}
    >
      {id}
    </div>
  );
};

const Compound = ({ compound }) => {
  const { formula, type, position } = compound;

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    position: "absolute",
    zIndex: 10,
    backgroundColor: type === "ionic" ? "lightgreen" : "lightyellow",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  return <div style={style}>{formula}</div>;
};

export default LabPad;

/**
 * Helper function to check if two elements collide
 * @param {object} el1 - First element.
 * @param {object} el2 - Second element.
 * @returns {boolean} - True if they collide.
 */
const isColliding = (el1, el2) => {
  const dx = el1.position.x - el2.position.x;
  const dy = el1.position.y - el2.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < 50; // Example threshold, adjust as needed
};
