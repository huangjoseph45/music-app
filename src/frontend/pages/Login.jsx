import LoginForm from "../components/login/login-form";
import "../styling/login.css";
import Icon from "../components/icon";
import AuthenticateButton from "../components/login/authenticate-button";
import WarningTag from "../components/login/warning-tag";
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
document.body.style.overflow = "visible";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    if (user !== null) {
      nav("/home");
    }
    const keyDown = (event) => {
      if (event.key === "Enter") loginFunc();
    };

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  const handlePageChange = (destination) => {
    nav(destination);
  };

  const handleUserNameField = (value) => {
    setUsername(value);
  };

  const handlePasswordField = (value) => {
    setPassword(value);
  };

  const loginFunc = async () => {
    try {
      const response = await handleLogin(username, password);

      if (
        response &&
        response !== undefined &&
        response !== "undefined" &&
        response !== "" &&
        response.status &&
        response.status === 200
      ) {
        handlePageChange("/home");
        const data = await response;
      } else if (response.status === 404) {
        setIsErrorMessage(true);
        setErrorMessage("Error: no account found");
      } else {
        setIsErrorMessage(true);
        setErrorMessage("Error: something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsErrorMessage(true);
      setErrorMessage("Error: Unable to connect to the server");
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
      )}
    </>
  );
};

export default Login;
