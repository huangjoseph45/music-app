import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const WarningTag = ({ tagContent, setErrorMessage }) => {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const deleteTag = () => {
    setIsFading(true);
    setTimeout(() => {
      setErrorMessage(false);
      setIsVisible(false);
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={deleteTag}
      className={`warning-tag ${isFading ? "fade" : ""}`}
    >
      <FontAwesomeIcon
        className={`warning-icon`}
        icon={faTriangleExclamation}
      />
      <p>{tagContent}</p>
    </div>
  );
};

export default WarningTag;
