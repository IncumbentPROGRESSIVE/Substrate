// LandingPage.jsx
import React from "react";
import AccountState from "./AccountState";
import LabPad from "./LabPad";
import PeriodicTable from "./PeriodicTable";
import "./App.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <AccountState />

      <PeriodicTable />

      <LabPad />
    </div>
  );
};

export default LandingPage;
