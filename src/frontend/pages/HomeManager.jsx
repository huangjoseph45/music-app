import HomeHeader from "../components/home/home-header";
import PlaylistList from "../components/home/playlist-list";
import "../styling/home.css";
import { useContext } from "react";
import { UserContext } from "../App";
import LoginButton from "../components/playlist/login-button";

const HomeManager = () => {
  const { user, setUser } = useContext(UserContext);
  document.body.style.overflow = "visible";

  return (
    <div className="wrapper">
      <HomeHeader title={user.name} />
      <PlaylistList lists={user.playlists} />
      <div className="right-side">
        <LoginButton />
      </div>
    </div>
  );
};

export default HomeManager;
