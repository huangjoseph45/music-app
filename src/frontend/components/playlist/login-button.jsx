import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const LoginButton = () => {
  const nav = new useNavigate();
  const { setUser } = useContext(UserContext);

  const signInFunc = () => {
    setUser(null);
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
