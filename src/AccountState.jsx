import React, { useState, useCallback } from "react";
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
  const [isLogin, setIsLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Start with the login menu hidden
  const [showAccountMenu, setShowAccountMenu] = useState(false); // Start with the account menu hidden
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = useCallback(
    async (url) => {
      if (!username || !password) {
        alert("Username and password cannot be empty");
        return;
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          setShowMenu(false); // Hide the menu after successful login
          setLoggedInUsername(username); // Set the logged-in username
          setIsAuthenticated(true); // Set authentication state
        } else {
          const errorText = await response.text();
          alert(`${isLogin ? "Login" : "Registration"} failed: ${errorText}`);
        }
      } catch (error) {
        alert(`An error occurred. Please try again. Error: ${error.message}`);
      }
    },
    [username, password, isLogin]
  );

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

  return (
    <div className="container">
      <GreyButton onClick={handleGreyButtonClick} />
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
          <button
            className="button"
            onClick={() => {
              handleAuth(
                isLogin
                  ? "http://localhost:8080/login"
                  : "http://localhost:8080/register"
              );
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <CircularButton
            onClick={() => setIsLogin(!isLogin)}
            imageUrl="https://img.icons8.com/ios-filled/50/000000/switch.png"
          />
        </div>
      )}
      {showAccountMenu && (
        <div className="account-menu">
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

function GreyButton({ onClick }) {
  return (
    <button className="grey-button" onClick={onClick}>
      <img
        src="https://img.icons8.com/ios-filled/50/000000/user.png"
        alt="User Profile"
        className="grey-button-icon"
      />
    </button>
  );
}

function CircularButton({ onClick, imageUrl }) {
  return (
    <button className="circular-button" onClick={onClick}>
      <img
        src={imageUrl}
        alt="Toggle Button"
        className="circular-button-image"
      />
    </button>
  );
}

export default AccountState;
