// LandingPage.jsx
import React from "react";
import "./App.css"; // Import the App.css file
//import Flair from "./flair.jsx";
import AccountState from "./AccountState";
import ElectionPreview from "./ElectionPreview";

function LandingPage() {
  return (
    <div className="landing-page">
      <ElectionPreview />
      <AccountState />
    </div>
  );
}

export default LandingPage;
