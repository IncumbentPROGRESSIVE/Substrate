// LandingPage.jsx
import React from "react";
import "./App.css"; // Import the App.css file
import Flair from "./flair.jsx";
import AccountState from "./AccountState";

function LandingPage() {
  return (
    <div className="landing-page">
      <AccountState />
      <Flair />
    </div>
  );
}

export default LandingPage;
