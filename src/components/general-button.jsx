import PropTypes from "prop-types";

const Button = ({ buttonFunction, buttonContent }) => {
  return (
    <button onClick={buttonFunction} className="playlist-play">
      {buttonContent}
    </button>
  );
};

export default Button;

Button.propTypes = {
  buttonFunction: PropTypes.func,
  buttonContent: PropTypes.string,
};
