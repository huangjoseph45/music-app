import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Form = ({
  formName,
  placeholder,
  formFuncName,
  userInput,
  deleteForm,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  const sendInput = () => {
    console.log("input is sent");
    if (userInput) {
      userInput(value); // Directly call userInput with the current value
    } else {
      console.error("userInput function is undefined");
    }
  };

  return (
    <div className="wrapper form">
      <h1>{formName}</h1>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          sendInput();
        }}
      >
        {formFuncName}
      </button>
      <button onClick={deleteForm} className="remove">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

Form.propTypes = {
  formName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  formFunc: PropTypes.string.isRequired,
  formFuncName: PropTypes.string.isRequired,
  userInput: PropTypes.func.isRequired,
  deleteForm: PropTypes.func.isRequired,
};

export default Form;
