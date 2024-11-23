import logoImage from "./../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Icon = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <img
      src={logoImage}
      alt=""
      className="focus app-logo"
      onClick={handleClick}
    />
  );
};
export default Icon;
