import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "font-awesome/css/font-awesome.min.css";

function RegisterDialog({ onRegister, onCancel }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Animation for the register dialog (fade in)
  const registerDialogAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  // Animation for button (scale up on hover)
  const buttonAnimation = useSpring({
    transform: "scale(1)",
    from: { transform: "scale(0.95)" },
    config: { tension: 250, friction: 15 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    // Log the typed information to the console
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    // Reset error and form fields
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordVisible(false);

    // Call onRegister function (for future API calls)
    onRegister(username, email, password);
  };

  const handleCancel = () => {
    // Reset all states when canceling
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordVisible(false);
    setError("");
    
    // Call onCancel function to close the dialog
    onCancel();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <animated.div className="register-dialog" style={registerDialogAnimation}>
      {/* Error message */}
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
        <div className="login-panel-input-group">
          <label className="login-panel-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-panel-input"
          />
        </div>
        <div className="login-panel-input-group">
          <label className="login-panel-label">Password</label>
          <div className="password-container">
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
                <i className="fa fa-eye-slash"></i>
              ) : (
                <i className="fa fa-eye"></i>
              )}
            </button>
          </div>
        </div>
        <animated.button
          type="submit"
          className="login-panel-button"
          style={buttonAnimation} 
        >
          Register
        </animated.button>
      </form>
      <button onClick={handleCancel} className="login-panel-signup">
        Cancel
      </button>
    </animated.div>
  );
}

export default RegisterDialog;
