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

    if (!id || !delta) return;

    // Update the element's position in the state
    updateElementPosition(id, (prevPosition) => ({
      x: prevPosition.x + delta.x,
      y: prevPosition.y + delta.y,
    }));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="lab-pad">
        {elements.map((element) => (
          <DraggableLabElement
            key={element.id}
            id={element.id}
            position={element.position}
          />
        ))}
      </div>
    </DndContext>
  );
};

const DraggableLabElement = ({ id, position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  // Combine the persisted position and the temporary transform
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

export default LabPad;
