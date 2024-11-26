import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../App";
import VideoList from "../../models/videolist";
import SongList from "../playlist/song-list";

const createNewPlaylist = async (user, setUser) => {
  if (user && user !== undefined && user !== "undefined") {
    const newPlaylist = new VideoList("New Playlist");
    const updatedUser = {
      ...user,
      playlists: [
        ...user.playlists,
        {
          playListName: newPlaylist.playListName,
          songList: newPlaylist.songList,
          image: newPlaylist.image,
          id: uid(),
        },
      ],
    };
    setUser(updatedUser);
    console.log(JSON.stringify(updatedUser));
  }
};

const CreatePlaylist = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <li
      className="create-playlist-button"
      onClick={() => createNewPlaylist(user, setUser)}
    >
      <FontAwesomeIcon className="plus-icon" icon={faPlus} />
      New Playlist
    </li>
  );
};

export default CreatePlaylist;
export { createNewPlaylist };

//generates a random id
const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
