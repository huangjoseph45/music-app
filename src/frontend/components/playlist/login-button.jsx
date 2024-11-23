import { useState } from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  const [isSignedIn, setSignedInState] = useState(false);
  const [username, setUsername] = useState("User1");

  const signInFunc = () => {
    if (isSignedIn) return;
  };

  return (
    <div className="login-button hover-effect" onClick={() => signInFunc}>
      {isSignedIn ? (
        <p>
          Welcome back,
          {username == null || username === "undefined" ? (
            "User"
          ) : (
            <strong>&nbsp;{username}</strong>
          )}
          !
        </p>
      ) : (
        <Link to="/login">Sign in</Link>
      )}
    </div>
  );
};

export default LoginButton;
