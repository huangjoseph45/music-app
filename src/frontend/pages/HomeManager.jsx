import HomeHeader from "../components/home/home-header";
import PlaylistList from "../components/home/playlist-list";
import "../styling/home.css";
import { useContext } from "react";
import { UserContext } from "../App";

const HomeManager = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="wrapper">
      <HomeHeader title={user.name} />
      <PlaylistList lists={user.playlists} />
    </div>
  );
};

export default HomeManager;
