import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createNewPlaylist } from "./create-playlist";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import AddIcon from "@mui/icons-material/Add";

const PlaylistList = ({ lists }) => {
  const { user, setUser, saveData } = useContext(UserContext);
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [listItems, setListItems] = useState(user.playlists);

  useEffect(() => {
    setListItems(user.playlists);
  }, [user]);

  const nav = useNavigate();

  const openPlayList = (id) => {
    nav(`/playlist-${id}`);
  };

  const startEditing = (id) => {
    setEditingTitleId(id);
  };

  const saveTitle = (id, newTitle) => {
    setListItems((prev) =>
      prev.map((playlist) =>
        playlist.id === id ? { ...playlist, playListName: newTitle } : playlist
      )
    );
    setEditingTitleId(null);
    const cloneUser = structuredClone(user);
    cloneUser.playlists = cloneUser.playlists.map((playlist) => {
      return playlist.id === id
        ? {
            ...playlist,
            playListName: newTitle,
          }
        : playlist;
    });
    saveData(cloneUser);
  };

  const checkSubmit = (event, id) => {
    if (event.key === "Enter") saveTitle(id, event.target.value);
  };

  const handleCreateNewPlaylist = () => {
    createNewPlaylist(user, setUser);
    setListItems(listItems);
  };

  return (
    <ul className="playlist-list-wrapper">
      {listItems && listItems.length > 0 ? (
        listItems.map((playlist) => (
          <li key={playlist.id} className="playlist-list-element">
            <img
              onClick={() => openPlayList(playlist.id)}
              className="playlist-image"
              draggable="false"
              src={playlist.image || ""}
              alt={playlist.playListName || "Video thumbnail"}
            />
            <div className="playlist-text-wrapper">
              {editingTitleId === playlist.id ? (
                <input
                  className="playlist-edit-input"
                  type="text"
                  defaultValue={playlist.playListName}
                  onKeyDown={(event) => checkSubmit(event, playlist.id)}
                  onBlur={(e) => saveTitle(playlist.id, e.target.value)}
                  autoFocus
                />
              ) : (
                <h3
                  className="playlist-text"
                  onClick={() => startEditing(playlist.id)}
                >
                  {playlist.playListName}
                </h3>
              )}
            </div>
          </li>
        ))
      ) : (
        <li onClick={handleCreateNewPlaylist} className="playlist-loading">
          <FontAwesomeIcon className="plus-icon" icon={faPlus} />
          <p>Create a Playlist</p>
        </li>
      )}
    </ul>
  );
};

export default PlaylistList;
