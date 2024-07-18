import React from "react";
import "./App.css";

const ElectionPreview = () => {
  return (
    <button
      className="election-preview"
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        padding: "20px",
        background: "linear-gradient(to right, blue, red)",
        color: "white",
        fontSize: "1.5em",
        fontWeight: "bold",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.background =
          "linear-gradient(to right, red, blue)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.background =
          "linear-gradient(to right, blue, red)";
      }}
    >
      Election Preview
    </button>
  );
};

export default ElectionPreview;
