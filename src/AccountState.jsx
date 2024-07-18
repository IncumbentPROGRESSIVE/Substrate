import React, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

// Custom hook for input handling
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => setValue(e.target.value);
  return [value, handleChange];
};

function AccountState() {
  const [username, handleUsernameChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [showMenu, setShowMenu] = useState(false); // Start with the login menu hidden
  const [showAccountMenu, setShowAccountMenu] = useState(false); // Start with the account menu hidden
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGreyButtonVisible, setIsGreyButtonVisible] = useState(true);
  const idleTimer = useRef(null);
  const accountMenuRef = useRef(null);
  const greyButtonRef = useRef(null);

  const handleAuth = useCallback(async () => {
    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      const loginResponse = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (loginResponse.ok) {
        setShowMenu(false); // Hide the menu after successful login
        setLoggedInUsername(username); // Set the logged-in username
        setIsAuthenticated(true); // Set authentication state
      } else {
        const registerResponse = await fetch("http://localhost:8080/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (registerResponse.ok) {
          setShowMenu(false); // Hide the menu after successful registration
          setLoggedInUsername(username); // Set the logged-in username
          setIsAuthenticated(true); // Set authentication state
        } else {
          const errorText = await registerResponse.text();
          alert(`Registration failed: ${errorText}`);
        }
      }
    } catch (error) {
      alert(`An error occurred. Please try again. Error: ${error.message}`);
    }
  }, [username, password]);

  const handleGreyButtonClick = useCallback(() => {
    setShowAccountMenu((prevShowAccountMenu) => !prevShowAccountMenu);
  }, []);

  const handleReturnToLogin = () => {
    setShowAccountMenu(false); // Hide the account menu
    setShowMenu(true); // Show the login menu
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAccountMenu(false);
    setLoggedInUsername("");
    setShowMenu(false);
    handleUsernameChange({ target: { value: "" } });
    handlePasswordChange({ target: { value: "" } });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickOutside = (event) => {
    if (
      accountMenuRef.current &&
      !accountMenuRef.current.contains(event.target) &&
      greyButtonRef.current &&
      !greyButtonRef.current.contains(event.target)
    ) {
      setShowAccountMenu(false);
    }
  };

  useEffect(() => {
    if (showAccountMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountMenu]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!showMenu && !showAccountMenu) {
        setIsGreyButtonVisible(true);
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
          setIsGreyButtonVisible(false);
        }, 3000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer.current);
    };
  }, [showMenu, showAccountMenu]);

  return (
    <div className="container">
      <div
        className={`grey-button-container ${
          !isGreyButtonVisible || showAccountMenu ? "hide" : ""
        }`}
        ref={greyButtonRef}
      >
        <GreyButton
          onClick={handleGreyButtonClick}
          showAccountMenu={showAccountMenu}
        />
      </div>
      {showMenu && (
        <div className="form">
          <button className="close-button" onClick={() => setShowMenu(false)}>
            X
          </button>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="input password-input"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className="toggle-password-button"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <button className="button" onClick={handleAuth}>
            Login / Register
          </button>
        </div>
      )}
      {showAccountMenu && (
        <div
          className={`account-menu ${showAccountMenu ? "open" : ""}`}
          ref={accountMenuRef}
        >
          <button
            className="close-button"
            onClick={() => setShowAccountMenu(false)}
          >
            X
          </button>
          {isAuthenticated ? (
            <>
              <p className="account-username">
                Logged in as: {loggedInUsername}
              </p>
              {!showMenu && (
                <button className="menu-button" onClick={handleReturnToLogin}>
                  Return to Login
                </button>
              )}
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : showMenu ? (
            <p>Log in to Access Account Settings</p>
          ) : (
            <button
              className="button"
              onClick={() => {
                setShowMenu(true);
                setShowAccountMenu(false); // Hide the account menu on login button click
              }}
            >
              Login / Register
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function GreyButton({ onClick, showAccountMenu }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="grey-button-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {!showAccountMenu && (
        <span className={`hover-text ${isHovered ? "show" : ""}`}>
          Account Setting
        </span>
      )}
      <button className="grey-button">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/gear.png"
          alt="Settings"
          className="grey-button-icon"
        />
      </button>
    </div>
  );
}

export default AccountState;
