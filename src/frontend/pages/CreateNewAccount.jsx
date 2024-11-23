import LoginForm from "../components/login/login-form";
import Icon from "../components/icon";
import WarningTag from "../components/login/warning-tag";
import AuthenticateButton from "../components/login/authenticate-button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateNewAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);

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

  const createNewAccountFunc = () => {
    if (username === "" && password === "") setIsErrorMessage(true);
  };

  return (
    <>
      <div className="login-wrapper">
        <Icon />
        <h1 className="welcome-image">Create an Account</h1>
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
        <AuthenticateButton
          buttonFunc={createNewAccountFunc}
          buttonName={"Create New Account"}
        />
      </div>
      {isErrorMessage && (
        <WarningTag
          key={Date.now()}
          tagContent={"Error: Missing Information"}
          setErrorMessage={setIsErrorMessage}
        />
      )}
    </>
  );
};

export default CreateNewAccount;
