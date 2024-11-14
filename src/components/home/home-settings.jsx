import React, { useEffect, useState, useContext, useRef } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeSettings = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const options = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <li className="temp">
        <a onClick={options} className="round options">
          <FontAwesomeIcon
            className={`center ${isOpen ? "rotate" : ""}`}
            icon={faBars}
          />
        </a>
        <ul className={`dropdown ${isOpen ? "active" : ""}`}></ul>
      </li>
    </>
  );
};

export default HomeSettings;
