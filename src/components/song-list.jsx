import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import {
  AllowEditContext,
  PlayListContext,
  RefreshContext,
  VideoToPlayContext,
} from "../pages/playlist";
import DeleteIcon from "@mui/icons-material/Delete";

const SongList = ({ listData }) => {
  const { isEdit } = useContext(AllowEditContext);
  const videolist = useContext(PlayListContext);
  const { handleRefresh } = useContext(RefreshContext);
  const { handleSongToPlay } = useContext(VideoToPlayContext);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const playVideo = (video) => {
    handleSongToPlay(video);
  };

  useEffect(() => {
    const deleteSong = async () => {
      if (videoToDelete !== null) {
        console.log("Delete: " + videoToDelete);
        videolist.deleteSong(videoToDelete);
        setVideoToDelete(null);
        handleRefresh();
      }
    };
    deleteSong();
  }, [videoToDelete]);

  if (!listData || listData.length === 0) {
    return <p className="loading">No Results Found</p>;
  }
  const content = listData.map((video, index) =>
    video ? (
      <li key={video.id} className="video-list-element">
        <div className="video-wrapper" onClick={() => playVideo(video)}>
          <img
            className="thumbnail"
            draggable="false"
            src={
              video.thumbnails?.standard?.url ||
              video.thumbnails?.default?.url ||
              ""
            }
            alt={video.title || "Video thumbnail"}
          />
          <div className="video-text-wrapper">
            <h3>{video.title}</h3>
            <small>{video.channelName}</small>
          </div>
        </div>
        {isEdit && (
          <div
            onClick={() => setVideoToDelete(video.id)}
            className="edit-option"
          >
            <DeleteIcon />
          </div>
        )}
      </li>
    ) : (
      <li className="loading" key={index}>
        <p> No Results Found </p>
      </li>
    )
  );

  return <ul className="playlist-songs-list">{content}</ul>;
};

SongList.propTypes = {
  listData: PropTypes.array.isRequired,
};

export default SongList;
