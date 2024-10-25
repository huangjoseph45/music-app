import '../styling/playlist.css';
import '../styling/App.css';

const PlayListImage = () => {
  const playListImageContainerStyle = {
    width: Math.max(200, window.screen.width * 0.1) + 'px',
    height: Math.max(200, window.screen.width * 0.1) + 'px',
    border: "1px solid white",
  };

  return (
    <div className="playlist-image-container" style={playListImageContainerStyle}>
      <img
        src="/"
        alt="Playlist"
        className="playlist-image image"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default PlayListImage;