// LandingPage.jsx
import React from "react";
import "./App.css"; // Import the App.css file
//import Flair from "./flair.jsx";
import Register from "./register";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* <h1 className="custom-heading">Election Preview 2024</h1>{" "} */}
      {/* Added className */}

      <Register />
    </div>
  );
}

export default LandingPage;
