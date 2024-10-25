import "../styling/App.css";

import "../styling/header.css";
import logoImage from "../assets/logo.png";
import SettingsButton from "./settings-button";
import { useState } from "react";

const Header = () => {
  const [newSong, setNewState] = useState(null);

  return (
    <ul className="nav-bar">
      <img src={logoImage} alt="" className="focus app-logo" />
      <h1>Playlist Title</h1>
      <SettingsButton />
    </ul>
  );
};

export default Header;
