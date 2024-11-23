import "../../styling/playlist.css";
import "../../styling/App.css";
import { useRef, useState, useContext, useEffect } from "react";
import { PlayListContext } from "../../pages/Playlist.jsx";

const PlayListImage = () => {
  const playListImageContainerStyle = {
    width: Math.max(200, window.screen.width * 0.1) + "px",
    height: Math.max(200, window.screen.width * 0.1) + "px",
  };
  const hiddenImageInput = useRef(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const videoList = useContext(PlayListContext);

  useEffect(() => {
    const defaultPlaylistImage = async () => {
      if (imageToUpload === null) {
        //check if image exists. Implementation must be adjusted after I create a db because this does jack shit now
        try {
          const videoData = await videoList.getVideoData();
          const thumbnail = videoData[0].thumbnails.high.url;
          setImageToUpload(thumbnail);
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      }
    };
    defaultPlaylistImage();
  }, []);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("loaded");
        setImageToUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    hiddenImageInput.current.click();
  };

  return (
    <div
      onClick={handleClick}
      className="playlist-image-container"
      type="file"
      style={playListImageContainerStyle}
    >
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenImageInput}
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
      />
      <img
        src={imageToUpload}
        alt="Playlist"
        className="image playlist-image"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default PlayListImage;
