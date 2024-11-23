import PropTypes from "prop-types";

const Button = ({
  buttonFunction,
  buttonContent,
  className = "playlist-play",
}) => {
  return (
    <button onClick={buttonFunction} className={className}>
      <span>{buttonContent}</span>
    </button>
  );
};

export default Button;

Button.propTypes = {
  buttonFunction: PropTypes.func,
  buttonContent: PropTypes.string,
};
