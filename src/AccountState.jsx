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
  const menuRef = useRef(null);
  const [position, setPosition] = useState({
    top: 20,
    left: window.innerWidth - 70,
    relativeTop: 20 / window.innerHeight,
    relativeLeft: (window.innerWidth - 70) / window.innerWidth,
  });
  const [menuPosition, setMenuPosition] = useState({
    top: window.innerHeight / 2 - 200,
    left: window.innerWidth / 2 - 200,
    relativeTop: (window.innerHeight / 2 - 200) / window.innerHeight,
    relativeLeft: (window.innerWidth / 2 - 200) / window.innerWidth,
  });
  const [accountMenuPosition, setAccountMenuPosition] = useState({
    top: 20,
    left: window.innerWidth - 320,
    relativeTop: 20 / window.innerHeight,
    relativeLeft: (window.innerWidth - 320) / window.innerWidth,
  });
  const [zIndexState, setZIndexState] = useState({
    greyButton: 1,
    registrationMenu: 2,
    accountMenu: 3,
  });
  const dragging = useRef(false);
  const dragStartPosition = useRef({ top: 0, left: 0 });
  const accountMenuDragging = useRef(false);
  const registrationMenuDragging = useRef(false);
  const lastMouseDownTime = useRef(0);

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
      // Adjust account menu position to ensure it is fully visible
      const accountMenuWidth = accountMenuRef.current.clientWidth;
      const accountMenuHeight = accountMenuRef.current.clientHeight;
      const adjustedLeft = Math.min(
        window.innerWidth - accountMenuWidth - 20,
        window.innerWidth - accountMenuWidth
      );
      const adjustedTop = Math.min(
        20,
        window.innerHeight - accountMenuHeight - 20
      );
      setAccountMenuPosition({
        top: adjustedTop,
        left: adjustedLeft,
        relativeTop: adjustedTop / window.innerHeight,
        relativeLeft: adjustedLeft / window.innerWidth,
      });
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountMenu]);

  useEffect(() => {
    if (showMenu) {
      // Adjust registration menu position to ensure it is centered and fully visible
      const menuWidth = menuRef.current.clientWidth;
      const menuHeight = menuRef.current.clientHeight;
      const adjustedLeft = Math.max(
        0,
        Math.min(
          window.innerWidth / 2 - menuWidth / 2,
          window.innerWidth - menuWidth - 20
        )
      );
      const adjustedTop = Math.max(
        0,
        Math.min(
          window.innerHeight / 2 - menuHeight / 2,
          window.innerHeight - menuHeight - 20
        )
      );
      setMenuPosition({
        top: adjustedTop,
        left: adjustedLeft,
        relativeTop: adjustedTop / window.innerHeight,
        relativeLeft: adjustedLeft / window.innerWidth,
      });
    }
  }, [showMenu]);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging.current) {
        const deltaY = e.clientY - dragStartPosition.current.top;
        const deltaX = e.clientX - dragStartPosition.current.left;
        setPosition((prevPosition) => {
          const newLeft = Math.max(
            0,
            Math.min(prevPosition.left + deltaX, window.innerWidth - 50)
          );
          const newTop = Math.max(
            0,
            Math.min(prevPosition.top + deltaY, window.innerHeight - 50)
          );
          return {
            top: newTop,
            left: newLeft,
            relativeTop: newTop / window.innerHeight,
            relativeLeft: newLeft / window.innerWidth,
          };
        });
        dragStartPosition.current = { top: e.clientY, left: e.clientX };
      } else if (accountMenuDragging.current) {
        const deltaY = e.clientY - dragStartPosition.current.top;
        const deltaX = e.clientX - dragStartPosition.current.left;
        setAccountMenuPosition((prevPosition) => {
          const newLeft = Math.max(
            0,
            Math.min(
              prevPosition.left + deltaX,
              window.innerWidth - accountMenuRef.current.clientWidth - 20
            )
          );
          const newTop = Math.max(
            0,
            Math.min(
              prevPosition.top + deltaY,
              window.innerHeight - accountMenuRef.current.clientHeight - 20
            )
          );
          return {
            top: newTop,
            left: newLeft,
            relativeTop: newTop / window.innerHeight,
            relativeLeft: newLeft / window.innerWidth,
          };
        });
        dragStartPosition.current = { top: e.clientY, left: e.clientX };
      } else if (registrationMenuDragging.current) {
        const deltaY = e.clientY - dragStartPosition.current.top;
        const deltaX = e.clientX - dragStartPosition.current.left;
        setMenuPosition((prevPosition) => {
          const newLeft = Math.max(
            0,
            Math.min(
              prevPosition.left + deltaX,
              window.innerWidth - menuRef.current.clientWidth - 20
            )
          );
          const newTop = Math.max(
            0,
            Math.min(
              prevPosition.top + deltaY,
              window.innerHeight - menuRef.current.clientHeight - 20
            )
          );
          return {
            top: newTop,
            left: newLeft,
            relativeTop: newTop / window.innerHeight,
            relativeLeft: newLeft / window.innerWidth,
          };
        });
        dragStartPosition.current = { top: e.clientY, left: e.clientX };
      }
    };

    const handleMouseUp = () => {
      dragging.current = false;
      accountMenuDragging.current = false;
      registrationMenuDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPosition((prevPosition) => ({
        top: prevPosition.relativeTop * window.innerHeight,
        left: Math.min(
          prevPosition.relativeLeft * window.innerWidth,
          window.innerWidth - 50
        ),
        relativeTop: prevPosition.relativeTop,
        relativeLeft: prevPosition.relativeLeft,
      }));
      // Adjust account menu position to stay within screen bounds
      setAccountMenuPosition((prevPosition) => ({
        top: Math.min(
          prevPosition.relativeTop * window.innerHeight,
          window.innerHeight -
            (accountMenuRef.current ? accountMenuRef.current.clientHeight : 0) -
            20
        ),
        left: Math.min(
          prevPosition.relativeLeft * window.innerWidth,
          window.innerWidth -
            (accountMenuRef.current ? accountMenuRef.current.clientWidth : 0) -
            20
        ),
        relativeTop: prevPosition.relativeTop,
        relativeLeft: prevPosition.relativeLeft,
      }));
      // Adjust registration menu position to stay within screen bounds
      setMenuPosition((prevPosition) => ({
        top: Math.min(
          prevPosition.relativeTop * window.innerHeight,
          window.innerHeight -
            (menuRef.current ? menuRef.current.clientHeight : 0) -
            20
        ),
        left: Math.min(
          prevPosition.relativeLeft * window.innerWidth,
          window.innerWidth -
            (menuRef.current ? menuRef.current.clientWidth : 0) -
            20
        ),
        relativeTop: prevPosition.relativeTop,
        relativeLeft: prevPosition.relativeLeft,
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = (e) => {
    dragging.current = true;
    dragStartPosition.current = { top: e.clientY, left: e.clientX };
    lastMouseDownTime.current = Date.now();
    setZIndexState((prevZIndexState) => ({
      ...prevZIndexState,
      greyButton:
        Math.max(
          prevZIndexState.greyButton,
          prevZIndexState.registrationMenu,
          prevZIndexState.accountMenu
        ) + 1,
    }));
  };

  const handleMouseUp = (e) => {
    dragging.current = false;
    const mouseUpTime = Date.now();
    if (mouseUpTime - lastMouseDownTime.current < 200) {
      if (e.target.tagName !== "IMG") {
        handleGreyButtonClick();
      }
    }
  };

  const handleAccountMenuMouseDown = (e) => {
    accountMenuDragging.current = true;
    dragStartPosition.current = { top: e.clientY, left: e.clientX };
    setZIndexState((prevZIndexState) => ({
      ...prevZIndexState,
      accountMenu:
        Math.max(
          prevZIndexState.greyButton,
          prevZIndexState.registrationMenu,
          prevZIndexState.accountMenu
        ) + 1,
    }));
  };

  const handleAccountMenuMouseUp = () => {
    accountMenuDragging.current = false;
  };

  const handleMenuMouseDown = (e) => {
    registrationMenuDragging.current = true;
    dragStartPosition.current = { top: e.clientY, left: e.clientX };
    setZIndexState((prevZIndexState) => ({
      ...prevZIndexState,
      registrationMenu:
        Math.max(
          prevZIndexState.greyButton,
          prevZIndexState.registrationMenu,
          prevZIndexState.accountMenu
        ) + 1,
    }));
  };

  const handleMenuMouseUp = () => {
    registrationMenuDragging.current = false;
  };

  return (
    <div className="container">
      <div
        className={`grey-button-container ${
          !isGreyButtonVisible || showAccountMenu ? "hide" : ""
        }`}
        ref={greyButtonRef}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: zIndexState.greyButton,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <GreyButton showAccountMenu={showAccountMenu} />
      </div>
      {showMenu && (
        <div
          className="form"
          ref={menuRef}
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            zIndex: zIndexState.registrationMenu,
          }}
          onMouseDown={handleMenuMouseDown}
          onMouseUp={handleMenuMouseUp}
        >
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
          style={{
            top: `${accountMenuPosition.top}px`,
            left: `${accountMenuPosition.left}px`,
            zIndex: zIndexState.accountMenu,
          }}
          onMouseDown={handleAccountMenuMouseDown}
          onMouseUp={handleAccountMenuMouseUp}
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
  return (
    <div className="grey-button-wrapper" onClick={onClick}>
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
