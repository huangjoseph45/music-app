import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import { VideoToPlayContext } from "../pages/playlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faForward,
  faPause,
  faPlay,
  faBackward,
  faSyncAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const opts = {
  height: "390", // Set the height of the player
  width: "640", // Set the width of the player
  playerVars: {
    autoplay: 1, // Auto-play the video when the player is ready
    controls: 0, // Disable the regular YouTube controls
    modestbranding: 1, // Less YouTube branding
    rel: 0, // Disable related videos at the end
    showinfo: 0,
  },
};

const SongPlayer = ({ videoNode }) => {
  const video = videoNode.data;
  const [pauseState, setPauseState] = useState(false);
  const [sessionSongs, setSessionSongs] = useState();

  const playerRef = useRef(null);

  const { handleClosePlayer } = useContext(VideoToPlayContext);
  const { handleSongToPlay } = useContext(VideoToPlayContext);

  const closeForm = () => {
    setSessionSongs(null);
    handleClosePlayer();
  };

  const pauseSong = () => {
    setPauseState(!pauseState);
  };

  const playNextSong = () => {
    handleSongToPlay("nextSong");
  };

  const playPrevSong = () => {
    handleSongToPlay("prevSong");
  };

  useEffect(() => {
    console.log("Session Songs: " + sessionSongs);
    sessionStorage.setItem("sessionSongs", JSON.stringify(sessionSongs));
  }, [sessionSongs]);

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  const onPlayerStateChange = (event) => {
    if (event.data === 0) {
      console.log("Video ended");
    }
    if (event.data === 1) {
      // Player is playing
      setPauseState(false);
    } else if (event.data === 2) {
      // Player is paused
      setPauseState(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " ") {
        pauseSong();
      }
    };
    if (playerRef.current) {
      if (pauseState) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [pauseState]);

  return (
    <div className="wrapper song-player-wrapper">
      <button onClick={() => closeForm()} className="remove">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="video-player">
        <div className="blocker"></div>
        <YouTube
          key={video.id}
          className="unselectable"
          videoId={video.id}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>
      <div className="video-data">
        <h2>{video.title}</h2>
        <small>{video.channelName}</small>
      </div>
      <ul className="media-controls">
        <li className="media-button">
          <FontAwesomeIcon icon={faShuffle} />
        </li>
        <li className="media-button" onClick={() => playPrevSong()}>
          <FontAwesomeIcon icon={faBackward} />
        </li>
        <li className="media-button" onClick={() => pauseSong()}>
          {pauseState ? (
            <FontAwesomeIcon icon={faPlay} />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
        </li>
        <li className="media-button" onClick={() => playNextSong()}>
          <FontAwesomeIcon icon={faForward} />
        </li>
        <li className="media-button">
          <FontAwesomeIcon icon={faSyncAlt} />
        </li>
      </ul>
    </div>
  );
};

SongPlayer.propTypes = {
  videoNode: PropTypes.object.isRequired,
};

export default SongPlayer;
