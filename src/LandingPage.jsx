// LandingPage.js
import React from "react";
import "./App.css"; // General app styling
import AccountState from "./AccountState";
import PeriodicTable from "./PeriodicTable.jsx";

function LandingPage() {
  return (
    <div className="landing-page">
      <AccountState />
      <PeriodicTable />
    </div>
  );
}

export default LandingPage;
