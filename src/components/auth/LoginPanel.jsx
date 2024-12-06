import React, { useState } from "react";
import "../../styles/LoginPanel.css";
import "font-awesome/css/font-awesome.min.css";
import { useSpring, animated, useTransition } from "@react-spring/web";
import logo from "../../assets/heka.png"; // Import the logo image
import RegisterDialog from "./RegisterDialog"; // Import RegisterDialog component

function LoginPanel({ onSignIn, onSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false); // State to control the register dialog visibility

  // Animation for the login panel (fade in)
  const loginPanelAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 }, // Controls the fade-in speed
  });

  // Animation for button (scale up on hover)
  const buttonAnimation = useSpring({
    transform: "scale(1)",
    from: { transform: "scale(0.95)" },
    config: { tension: 250, friction: 15 }, // Controls speed of scale
  });

  // Animation for logo flip effect
  const logoFlipAnimation = useSpring({
    from: { transform: "rotateY(0deg)" },
    to: { transform: "rotateY(360deg)" },
    reset: true,
    reverse: true,
    config: { duration: 1000 }, // 1 second per flip
    loop: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");
    onSignIn(username, password);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSignUpClick = () => {
    setShowRegisterDialog(true); // Show the RegisterDialog when sign up is clicked
  };

  const closeRegisterDialog = () => {
    setShowRegisterDialog(false); // Close the RegisterDialog
  };

  // Transitions for the RegisterDialog and backdrop
  const registerDialogTransitions = useTransition(showRegisterDialog, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: { duration: 300 },
  });

  return (
    <animated.div className="login-panel" style={loginPanelAnimation}>
      {/* Logo Image */}
      <div className="login-panel-logo">
        <animated.img
          src={logo}
          alt="Logo"
          className="login-panel-logo-img"
          style={logoFlipAnimation} // Apply the flip animation to the logo
        />
      </div>

      {error && <p className="login-panel-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="login-panel-input-group">
          <label className="login-panel-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-panel-input"
          />
        </div>
        <div className="login-panel-input-group password-container">
          <label className="login-panel-label">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-panel-input"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-btn"
          >
            {passwordVisible ? (
              <i className="fa fa-eye-slash"></i> // Eye icon for hiding password
            ) : (
              <i className="fa fa-eye"></i> // Eye icon for showing password
            )}
          </button>
        </div>
        <animated.button
          type="submit"
          className="login-panel-button"
          style={buttonAnimation} // Apply animation here
        >
          Sign In
        </animated.button>
      </form>
      <button onClick={handleSignUpClick} className="login-panel-signup">
        Sign Up
      </button>

      {/* Conditionally render the RegisterDialog with transition */}
      {registerDialogTransitions(
        (style, item) =>
          item && (
            <animated.div className="modal-backdrop" style={style}>
              <RegisterDialog onRegister={onSignIn} onClose={closeRegisterDialog} />
            </animated.div>
          )
      )}
    </animated.div>
  );
}

export default LoginPanel;
