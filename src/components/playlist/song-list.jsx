import PropTypes from "prop-types";
import { useContext, useState, useEffect, useRef } from "react";
import {
  AllowEditContext,
  PlayListContext,
  VideoToPlayContext,
} from "../../pages/Playlist";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsSpin } from "@fortawesome/free-solid-svg-icons";

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

  const content = currentSongList.map((video, index) =>
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
          <div onClick={() => deleteSong(video.id)} className="edit-option">
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

  if (!listData || listData.length === 0) {
    return <p className="loading">No Results Found</p>;
  }

  return (
    <ul className="playlist-songs-list">
      {content}
      {/* {content.length > 0 && (
        <div id="list-end" ref={targetRef}>
          {isLoading && (
            <FontAwesomeIcon className="spinning-arrow" icon={faArrowsSpin} />
          )}
        </div>
      )} */}
    </ul>
  );
};

SongList.propTypes = {
  listData: PropTypes.array.isRequired,
};

export default SongList;
