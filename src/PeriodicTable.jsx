// PeriodicTable.jsx
import React from "react";
import {
  useDraggable,
  DndContext,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import { mergePeriodicTableData } from "./mergePeriodicTableData";
import "./periodicTable.css";

function PeriodicTable({ onElementDragEnd }) {
  const elements = mergePeriodicTableData();
  const sensors = [
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  ]; // Noticeable drag detection.

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={(event) => onElementDragEnd(event.active.id)}
    >
      <div className="periodic-table-wrapper">
        <div className="periodic-table">
          {elements.map((element) => (
            <DraggableElement key={element.symbol} element={element} />
          ))}
        </div>
      </div>
    </DndContext>
  );
}

function DraggableElement({ element }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: element.symbol,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    gridColumn: element.xpos,
    gridRow: element.ypos,
    zIndex: isDragging ? 999 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      className={`element ${element.category}`}
      style={style}
      {...listeners}
      {...attributes}
    >
      <span className="number">{element.number}</span>
      <span className="symbol">{element.symbol}</span>
      <span className="name">{element.name}</span>
      <span className="atomic-mass">{element.atomic_mass.toFixed(3)}</span>
    </div>
  );
}

export default PeriodicTable;
