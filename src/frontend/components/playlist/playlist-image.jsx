import "../../styling/playlist.css";
import "../../styling/App.css";
import { useRef, useState, useContext, useEffect } from "react";
import { PlayListContext } from "../../pages/Playlist.jsx";
import { UserContext } from "../../App.jsx";

const PlayListImage = () => {
  const playListImageContainerStyle = {
    width: Math.max(200, window.screen.width * 0.1) + "px",
    height: Math.max(200, window.screen.width * 0.1) + "px",
  };
  const hiddenImageInput = useRef(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const videoList = useContext(PlayListContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const defaultPlaylistImage = async () => {
      if (imageToUpload === null) {
        //check if image exists. Implementation must be adjusted after I create a db because this does jack shit now
        try {
          const image = videoList.image;
          setImageToUpload(image);
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
        console.log("File loaded");

        const newImage = e.target.result;
        setImageToUpload(newImage); // Update state for the uploaded image
        setUser((prevUser) => {
          const updatedPlaylists = prevUser.playlists.map((playlist) =>
            playlist.id === videoList.id
              ? { ...playlist, image: newImage } // Update the image for the matching playlist
              : playlist
          );
          return { ...prevUser, playlists: updatedPlaylists };
        });
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
