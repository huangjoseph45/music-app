import PropTypes from "prop-types";
import { useContext, useState, useEffect, useRef } from "react";
import {
  AllowEditContext,
  PlayListContext,
  VideoToPlayContext,
} from "../../pages/Playlist";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const SongList = ({ listData }) => {
  const { isEdit } = useContext(AllowEditContext);
  const videolist = useContext(PlayListContext);
  const { handleSongToPlay } = useContext(VideoToPlayContext);
  // const [isLoading, setIsLoading] = useState(false);
  // const targetRef = useRef(null);

  // const songIndexRef = useRef(videolist.songList.length);
  const [currentSongList, setCurrentSongList] = useState(
    Array.isArray(listData) ? listData : []
  );

  const playVideo = (video) => {
    handleSongToPlay(video);
  };

  useEffect(() => {
    setCurrentSongList(Array.isArray(listData) ? listData : []);
  }, [listData]);

  const deleteSong = async (videoId) => {
    if (videoId) {
      console.log("Delete: " + videoId);
      videolist.deleteSong(videoId);
      setCurrentSongList((prevList) =>
        prevList.filter((video) => video.id !== videoId)
      );
    }
  };
  //pagination code, deprecated
  // useEffect(() => {
  //   const stopObserving = checkIntersection({
  //     rootElement: null,
  //     targetElement: targetRef.current,
  //     onIntersect: () => {
  //       if (
  //         songIndexRef.current < videolist.songList.length &&
  //         videolist.songList.length > 0
  //       ) {
  //         setIsLoading(true);
  //         setTimeout(() => {
  //           songIndexRef.current += 10;
  //           setCurrentSongList(listData.slice(0, songIndexRef.current));
  //           setIsLoading(false);
  //         }, "300"); // Explicitly set delay for clarity
  //       }
  //     },
  //   });

  //   return () => {
  //     if (stopObserving) stopObserving(); // Cleanup observer on unmount
  //   };
  // }, [listData, videolist.songList.length, videolist.songList]);

  let content;
  content = currentSongList.map((video, index) => {
    console.log(video.thumbnails);
    return video ? (
      <li key={video.id} className="video-list-element">
        <div className="video-wrapper" onClick={() => playVideo(video)}>
          <img
            className="thumbnail"
            draggable="false"
            src={
              video.thumbnails?.standard?.url ||
              video.thumbnails?.default?.url ||
              video.thumbnails.url ||
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
          <div onClick={() => deleteSong(video.id)} className="edit-option">
            <DeleteIcon />
          </div>
        )}
      </li>
    ) : (
      <li className="loading" key={index}>
        <p> No Results Found </p>
      </li>
    );
  });

  console.log(content);

  content.push(
    <li key="add-song-list-element" className="video-list-element">
      <div className="video-wrapper">
        <AddIcon className="element-icon" />
        Find Song
      </div>
    </li>
  );

  return <ul className="playlist-songs-list">{content}</ul>;
};

SongList.propTypes = {
  listData: PropTypes.array.isRequired,
};

export default SongList;
