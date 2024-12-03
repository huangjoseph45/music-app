import HomeHeader from "../components/home/home-header";
import PlaylistList from "../components/home/playlist-list";
import "../styling/home.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import LoginButton from "../components/playlist/login-button";

const HomeManager = () => {
  const { user, setUser } = useContext(UserContext);
  document.body.style.overflow = "visible";

  useEffect(() => {
    document.title = `Home`;
  });
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
