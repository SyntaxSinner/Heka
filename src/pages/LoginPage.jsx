// src/pages/LoginPage.jsx

import React from "react";
import LoginPanel from "../components/auth/LoginPanel";
import AnimatedTypeAnimation from "../components/auth/TypedAnimation";
import "../styles/LoginPage.css";

function LoginPage() {
  const handleSignIn = (username, password) => {
    console.log("Logging in with:", username, password);
  };

  const handleSignUp = () => {
    console.log("Opening sign-up dialog");
  };

  return (
    <div className="login-page-content">

      <div className="left-side">
        <AnimatedTypeAnimation />
      </div>

      <div className="right-side">
        <LoginPanel onSignIn={handleSignIn} onSignUp={handleSignUp} />
      </div>
      
    </div>
  );
}

export default LoginPage;
