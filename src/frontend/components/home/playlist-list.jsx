import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createNewPlaylist } from "./create-playlist";
import { useContext } from "react";
import { UserContext } from "../../App";

const PlaylistList = ({ lists }) => {
  const { user, setUser } = useContext(UserContext);

  const nav = useNavigate();
  const openPlayList = (id) => {
    nav(`/playlist-${id}`);
  };

  const content =
    lists && lists.length > 0 ? (
      lists.map((playlist, index) =>
        playlist ? (
          // fix key later
          <li
            key={playlist.playListName + "ksajdfl;"}
            className="playlist-list-element"
            onClick={() => openPlayList(playlist.id)}
          >
            <img
              className="playlist-image"
              draggable="false"
              src={playlist.image || ""}
              alt={playlist.playListName || "Video thumbnail"}
            />
            <div className="playlist-text-wrapper">
              <h3>{playlist.playListName}</h3>
            </div>
          </li>
        ) : (
          <li className="playlist-loading" key={index}>
            <p> No Results Found </p>
          </li>
        )
      )
    ) : (
      <li
        onClick={() => createNewPlaylist(user, setUser)}
        className="playlist-loading"
      >
        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
        <p>Create a Playlist </p>
      </li>
    );

  return <ul className="playlist-list-wrapper">{content}</ul>;
};

export default PlaylistList;
