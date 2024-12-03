import { useEffect, useContext } from "react";
import { UserContext } from "../App";

const ForgotPassword = () => {
  document.body.style.overflow = "visible";
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user !== null) {
      nav("/home");
    }
    document.title = `Forgot Password`;

    const keyDown = (event) => {
      if (event.key === "Enter") loginFunc();
    };

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  return <h1>Damn, thats crazy</h1>;
};

export default ForgotPassword;
