import React from "react";
import {
  DndContext,
  useDraggable,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { canBond, createCompound } from "./bondingRules";
import "./LabPad.css";

const LabPad = ({
  elements,
  compounds,
  updateElementPosition,
  updateCompoundPosition,
  addCompound,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { delta } = event;

    if (!id || !delta) return;

    // Update the position of either an element or a compound
    const isCompound = id.startsWith("compound-");
    if (isCompound) {
      updateCompoundPosition(id, (prevPosition) => ({
        x: prevPosition.x + delta.x,
        y: prevPosition.y + delta.y,
      }));
    } else {
      updateElementPosition(id, (prevPosition) => ({
        x: prevPosition.x + delta.x,
        y: prevPosition.y + delta.y,
      }));
      detectCollisions(id); // Detect collisions for bonding
    }
  };

  const detectCollisions = (draggedId) => {
    const draggedElement = elements.find((el) => el.id === draggedId);
    if (!draggedElement || !draggedElement.position) return; // Ensure the dragged element exists and has a position

    elements.forEach((el) => {
      if (
        el.id !== draggedId &&
        el.position && // Ensure the other element has a valid position
        isColliding(draggedElement, el)
      ) {
        handleBonding(draggedElement, el);
      }
    });
  };

  const handleBonding = (element1, element2) => {
    if (canBond(element1.id, element2.id)) {
      const newCompound = {
        id: `compound-${Date.now()}`, // Unique ID for the compound
        ...createCompound(element1.id, element2.id),
        position: element1.position, // Compound takes the position of the first element
      };

      addCompound(newCompound);
      removeElement(element1.id);
      removeElement(element2.id);
    }
  };

  const removeElement = (id) => {
    updateElementPosition(id, () => null); // Safely remove element
  };

  const isColliding = (el1, el2) => {
    if (!el1.position || !el2.position) return false; // Ensure both elements have valid positions

    const dx = el1.position.x - el2.position.x;
    const dy = el1.position.y - el2.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < 50; // Example threshold, adjust as needed
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
        {compounds.map((compound) => (
          <DraggableCompound
            key={compound.id}
            id={compound.id}
            compound={compound}
          />
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

const DraggableCompound = ({ id, compound }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate(${compound.position.x + (transform?.x || 0)}px, ${
      compound.position.y + (transform?.y || 0)
    }px)`,
    position: "absolute",
    zIndex: 10,
    backgroundColor: compound.type === "ionic" ? "lightgreen" : "lightyellow",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  return (
    <div
      ref={setNodeRef}
      className="compound"
      style={style}
      {...listeners}
      {...attributes}
    >
      {compound.formula}
    </div>
  );
};

export default LabPad;
