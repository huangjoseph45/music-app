import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const LoginForm = ({ type, label, id, changeFunction }) => {
  const [currentType, setCurrentType] = useState(type);
  const [fieldValue, setFieldValue] = useState("");

  const setPasswordType = () => {
    if (currentType === type) {
      setCurrentType("text");
    } else {
      setCurrentType(type);
    }
  };

  const handleChange = (event) => {
    setFieldValue(event.target.value);
  };

  useEffect(() => {
    changeFunction(fieldValue);
  }, [fieldValue]);

  return (
    <div className="login-form-wrapper">
      <label className="login-label" htmlFor="login-form">
        {label}
      </label>
      <div className="login-input-wrapper">
        <input
          className="login-input"
          placeholder={label}
          type={currentType}
          onChange={handleChange}
          value={fieldValue}
          name="login-form"
          id={id}
        />
        {type === "password" && (
          <FontAwesomeIcon
            className="show-password-button"
            icon={currentType === type ? faLock : faUnlock}
            onClick={setPasswordType}
          />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
