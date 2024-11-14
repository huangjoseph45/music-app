import LoginForm from "../components/login/login-form";
import "/src/styling/login.css";
import Icon from "../components/icon";
import AuthenticateButton from "../components/login/authenticate-button";
import WarningTag from "../components/login/warning-tag";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nav = new useNavigate();

  const handlePageChange = (destination) => {
    nav(destination);
  };

  const handleUserNameField = (value) => {
    setUsername(value);
  };

  const handlePasswordField = (value) => {
    setPassword(value);
  };

  const loginFunc = () => {
    if (username === "" && password === "") {
      setIsErrorMessage(true);
      setErrorMessage("Error: Missing Information");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <Icon />
        <h1 className="welcome-image">Login to App</h1>
        <div className="inputs-wrapper">
          <LoginForm
            type="text"
            label="Username"
            id="username"
            changeFunction={handleUserNameField}
          />
          <LoginForm
            type="password"
            label="Password"
            id="password"
            changeFunction={handlePasswordField}
          />
        </div>
        <AuthenticateButton buttonFunc={loginFunc} buttonName={"Log In"} />
        <p
          className="link-text"
          onClick={() => handlePageChange("/forgot-password")}
        >
          Forgot your password?
        </p>
        <div className="sign-up-wrapper">
          <p>Don't have an account?</p>
          <p
            className="link-text"
            onClick={() => handlePageChange("/create-new-account")}
          >
            Sign up now!
          </p>
        </div>
      </div>
      {isErrorMessage && (
        <WarningTag
          key={Date.now()}
          tagContent={errorMessage}
          setErrorMessage={setIsErrorMessage}
        />
      )}{" "}
    </>
  );
};

export default Login;
