const AuthenticateButton = ({ buttonFunc, buttonName }) => {
  return (
    <button className="authenticate-button" onClick={buttonFunc}>
      {buttonName}
    </button>
  );
};

export default AuthenticateButton;
