import React from "react";
import {
  DndContext,
  useDraggable,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import "./LabPad.css";

const LabPad = ({ elements, updateElementPosition }) => {
  const sensors = [useSensor(PointerSensor)];

  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { delta } = event;

    const draggedElement = elements.find((el) => el.id === id);
    if (draggedElement) {
      const newPosition = {
        x: Math.max(0, draggedElement.position.x + delta.x),
        y: Math.max(0, draggedElement.position.y + delta.y),
      };

      updateElementPosition(id, newPosition);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="lab-pad">
        {elements.map((element) => (
          <DraggableLabElement
            key={element.id}
            symbol={element.id}
            initialPosition={element.position}
          />
        ))}
      </div>
    </DndContext>
  );
};

const DraggableLabElement = ({ symbol, initialPosition }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: symbol,
  });

  const style = {
    transform: transform
      ? `translate3d(${initialPosition.x + transform.x}px, ${
          initialPosition.y + transform.y
        }px, 0)`
      : `translate3d(${initialPosition.x}px, ${initialPosition.y}px, 0)`,
    position: "absolute",
    zIndex: 10, // Ensure elements are always visible
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
      {symbol}
    </div>
  );
};

export default LabPad;
