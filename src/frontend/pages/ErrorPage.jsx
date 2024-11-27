import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";

const ErrorPage = () => {
  document.body.style.overflow = "visible";
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user !== null) {
      nav("/home");
    }
    const keyDown = (event) => {
      if (event.key === "Enter") loginFunc();
    };

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

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
