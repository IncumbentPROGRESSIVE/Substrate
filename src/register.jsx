import React, { useState } from "react";
import "./App.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        alert("Registration successful");
      } else {
        const errorText = await response.text();
        alert("Registration failed: " + errorText);
      }
    } catch (error) {
      alert("An error occurred. Please try again. Error: " + error.message);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        const errorText = await response.text();
        alert("Login failed: " + errorText);
      }
    } catch (error) {
      alert("An error occurred. Please try again. Error: " + error.message);
    }
  };

  const handleGreyButtonClick = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      {isAuthenticated ? (
        <GreyButton onClick={handleGreyButtonClick} />
      ) : (
        <div className="form">
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="button"
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </button>
        </div>
      )}
    </div>
  );
}

function GreyButton({ onClick }) {
  return <button className="grey-button" onClick={onClick}></button>;
}

export default Register;
