import "../styling/landingpage.css";
import Button from "../components/playlist/general-button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const nav = useNavigate();

  const signupFunc = () => {
    nav("/create-new-account");
  };

  const loginFunc = () => {
    nav("/login");
  };

  return (
    <div className="landing-page-wrapper">
      <div className="landing-page-button-wrapper">
        <h1 className="landing-page-title">Chime</h1>
        <Button
          buttonFunction={signupFunc}
          buttonContent={"Sign Up"}
          className="landing-page-signup"
        />
        <Button
          buttonFunction={loginFunc}
          buttonContent={"Login"}
          className="landing-page-login"
        />
      </div>
      <img
        src="src/frontend/assets/logo.png"
        alt="logo"
        className="landing-page-logo"
      />
    </div>
  );
};

export default LandingPage;
