import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const SearchBar = ({ placeholder, sendData }) => {
  const [width, setWidth] = useState(Math.min(600, window.innerWidth * 0.5));

  useEffect(() => {
    const handleResize = () => {
      setWidth(Math.min(600, window.innerWidth * 0.5));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const searchBarStyles = {
    width: width + "px",
  };

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    sendData(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={searchBarStyles}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  sendData: PropTypes.func,
};
