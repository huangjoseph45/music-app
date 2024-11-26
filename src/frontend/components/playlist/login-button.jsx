import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const nav = new useNavigate();

  const signInFunc = () => {
    localStorage.clear();
    nav("/login");
    window.location.reload();
  };

  return (
    <div className="login-button hover-effect" onClick={signInFunc}>
      Log Out
    </div>
  );
};

export default LoginButton;
