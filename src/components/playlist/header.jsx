import "../../styling/App.css";
import "../../styling/header.css";
import logoImage from "../../assets/logo.png";
import SettingsButton from "./settings-button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ playlistTitle, searchListLength }) => {
  const navigate = useNavigate();

  return (
    <ul className="nav-bar">
      <img
        src={logoImage}
        alt=""
        className="focus app-logo"
        onClick={() => navigate("/home")}
      />
      <h1 className="title">{playlistTitle}</h1>

      <SettingsButton searchListLength={searchListLength} />
    </ul>
  );
};

export default Header;
