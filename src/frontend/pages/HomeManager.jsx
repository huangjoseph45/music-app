import HomeHeader from "../components/home/home-header";
import PlaylistList from "../components/home/playlist-list";
import "../styling/home.css";

const HomeManager = ({ accountInformation }) => {
  console.log(accountInformation);
  return (
    <div className="wrapper">
      <HomeHeader title={accountInformation.name} />
      <PlaylistList lists={accountInformation.playlists} />
    </div>
  );
};

export default HomeManager;
