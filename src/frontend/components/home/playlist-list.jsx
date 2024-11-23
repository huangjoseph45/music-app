import { useNavigate } from "react-router-dom";

const PlaylistList = ({ lists }) => {
  const nav = useNavigate();
  const openPlayList = (name) => {
    nav(`/playlist-${name}`);
  };

  console.log(lists[0]);

  const content = lists.map((playlist, index) =>
    playlist ? (
      // fix key later
      <li
        key={playlist.playListName + "ksajdfl;"}
        className="playlist-list-element"
        onClick={() => openPlayList(playlist.playListName)}
      >
        <img
          className="playlist-image"
          draggable="false"
          src={playlist.image.url || ""}
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
  );

  return <ul className="playlist-list-wrapper">{content}</ul>;
};

export default PlaylistList;
