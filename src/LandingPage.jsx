// LandingPage.jsx
import React from "react";
import "./App.css"; // Import the App.css file
import Flair from "./flair.jsx";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="custom-heading">Election Preview</h1>{" "}
      {/* Added className */}
      <Flair />
    </div>
  );
}

export default LandingPage;
