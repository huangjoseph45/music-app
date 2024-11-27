import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  document.body.style.overflow = "visible";

  const nav = new useNavigate();
  return (
    <div className="wrapper">
      <img
        className="error-image"
        src="src/frontend/assets/logo.png"
        alt="error-image"
        onClick={() => nav("/")}
      />
      <h1>Oops, you weren't supposed to do that!</h1>
    </div>
  );
};
export default ErrorPage;
