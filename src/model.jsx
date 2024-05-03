import React from "react";
import "./MainImage.css"; // Import CSS file for styling

function MainImage({ imageUrl }) {
  return (
    <div className="MainImage">
      <a
        href="LINK_TO_GOOGLE_SHEETS_PROJECTION"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={imageUrl} alt="Main" />
      </a>
    </div>
  );
}

export default MainImage;
