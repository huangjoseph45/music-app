import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import { VideoToPlayContext } from "../../pages/Playlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faForward,
  faPause,
  faPlay,
  faBackward,
  faSyncAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"; ///PLAY NEXT SONG WHEN CURRENT SONG ENDS

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

const SongPlayer = ({ videoNode }) => {
  const maxHeight = 390;
  const maxWidth = 640;

  const [height, setHeight] = useState((maxHeight * windowHeight) / 1080);
  const [width, setWidth] = useState((maxWidth * windowWidth) / 1920);

  useEffect(() => {
    const resizeFunction = () => {
      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;
      console.log((maxHeight * windowHeight) / 1080);
      console.log((maxWidth * windowWidth) / 1920);
      setHeight((maxHeight * windowHeight) / 1080);
      setWidth((maxWidth * windowWidth) / 1920);
    };

    window.addEventListener("resize", resizeFunction);

    return () => window.removeEventListener("resize", resizeFunction);
  });

  const opts = {
    height: height, // Set the height of the player
    width: width, // Set the width of the player
    playerVars: {
      autoplay: 1, // Auto-play the video when the player is ready
      controls: 0, // Disable the regular YouTube controls
      modestbranding: 1, // Less YouTube branding
      rel: 0, // Disable related videos at the end
      showinfo: 0,
    },
  };

  const video = videoNode.data;
  const [pauseState, setPauseState] = useState(false);
  const [sessionSongs, setSessionSongs] = useState();
  const [minimized, setMinimized] = useState(false);
  const [cycle, setCycle] = useState(false);

  const playerRef = useRef(null);

  const { handleClosePlayer, handleSongToPlay } =
    useContext(VideoToPlayContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        closeForm();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const closeForm = () => {
    setSessionSongs(null);
    handleClosePlayer();
    document.body.style.overflow = "visible";
  };

  const pauseSong = () => {
    setPauseState(!pauseState);
  };

  const playNextSong = () => {
    if (cycle) handleSongToPlay("cycleSong");
    else handleSongToPlay("nextSong");
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
    playerRef.current.playVideo();
    setTimeout(() => {
      playerRef.current.playVideo();
      playerRef.current.unMute();
    }, 50);
  };

  useEffect(() => {
    if (minimized === true) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  });

  const onPlayerStateChange = (event) => {
    if (event.data === 0) {
      console.log("Video ended");
      if (cycle) {
        playerRef.current.seekTo(0);
        playerRef.current.playVideo();
      } else {
        playNextSong();
      }
    }
    if (event.data === 1) {
      // Player is playing
      setPauseState(false);
    } else if (event.data === 2) {
      // Player is paused
      setPauseState(true);
    }
  };

  const cycleSong = () => {
    console.log("CYCLING");
    setCycle(!cycle);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " " && minimized === false) {
        event.preventDefault();
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
  }, [pauseState, minimized]);

  return (
    <div className={`song-player-wrapper ${minimized ? "minimize" : ""}`}>
      <button onClick={() => closeForm()} className="remove">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div
        onClick={() => setMinimized(!minimized)}
        className={`minimize-button ${minimized ? "minimized-button" : ""}`}
      >
        <p className={`minimize-icon ${minimized ? "flip" : ""}`}>{">"}</p>
      </div>
      <div className="song-player-main-content">
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
          <li
            className={`media-button ${cycle && "clicked"}`}
            onClick={cycleSong}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </li>
        </ul>
      </div>
    </div>
  );
};

SongPlayer.propTypes = {
  videoNode: PropTypes.object.isRequired,
};

export default SongPlayer;
