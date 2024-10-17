// LabPad.jsx
import React from "react";
import {
  DndContext,
  useDraggable,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import "./LabPad.css";

const LabPad = ({ element }) => {
  const sensors = [useSensor(PointerSensor)];

  return (
    <DndContext sensors={sensors}>
      <div className="lab-pad">
        <DraggableLabElement symbol={element} />
      </div>
    </DndContext>
  );
};

const DraggableLabElement = ({ symbol }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: symbol,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
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
