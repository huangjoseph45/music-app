import LoginForm from "../components/login/login-form";
import Icon from "../components/icon";
import WarningTag from "../components/login/warning-tag";
import AuthenticateButton from "../components/login/authenticate-button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
document.body.style.overflow = "visible";

const CreateNewAccount = ({ handleNewAccount }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);

  const nav = new useNavigate();

  useEffect(() => {
    if (user !== null) {
      nav("/home");
    }
    const keyDown = (event) => {
      if (event.key === "Enter") loginFunc();
    };
    document.title = `Create New Account`;

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  const handlePageChange = (destination) => {
    nav(destination);
  };

  const handleEmailField = (value) => {
    setEmail(value);
  };

  const handleUserNameField = (value) => {
    setUsername(value);
  };

  const handlePasswordField = (value) => {
    setPassword(value);
  };

  const createNewAccountFunc = async () => {
    if (username === "" || password === "") {
      setIsErrorMessage(true);
      return;
    }
    try {
      const response = await handleNewAccount(email, username, password);
      console.log(response);

      if (response.ok) {
        handlePageChange("/login");
      } else if (response.status === 409) {
        setIsErrorMessage(true);
        setErrorMessage("Error: account already exists");
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
        <h1 className="welcome-image">Create an Account</h1>
        <div className="inputs-wrapper">
          <LoginForm
            type="text"
            label="Email"
            id="email"
            changeFunction={handleEmailField}
          />
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
        <AuthenticateButton
          buttonFunc={createNewAccountFunc}
          buttonName={"Create New Account"}
        />
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

export default CreateNewAccount;
