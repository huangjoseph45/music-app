import "../../styling/App.css";
import "../../styling/header.css";
import logoImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import HomeSettings from "./home-settings";

const HomeHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <ul className="nav-bar">
      <img
        src={logoImage}
        alt=""
        className="focus app-logo"
        onClick={() => navigate("/home")}
      />
      <h1 className="title">{`Welcome back, ${title}`}</h1>
      <HomeSettings />
    </ul>
  );
};

export default HomeHeader;
