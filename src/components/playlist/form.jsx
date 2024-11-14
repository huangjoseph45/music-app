import { useEffect, useState } from "react";
import { faTimes, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Form = ({ formName, placeholder, userInput, deleteForm }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  const checkSubmit = (event) => {
    if (event && event.key === "Enter") {
      sendInput();
    }
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
    <div className="form-body">
      <h1 className="form-title">{formName}</h1>
      <div className="form-search">
        <input
          type="text"
          placeholder={placeholder}
          onKeyDown={checkSubmit}
          value={value}
          onChange={handleChange}
        />
        <button
          className="form-search-button"
          onClick={() => {
            sendInput();
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
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
