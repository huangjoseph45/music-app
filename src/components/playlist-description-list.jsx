import PropTypes from "prop-types";

const descriptionList = ({ numSongs, duration }) => {
  const descriptors = {
    numSongs: numSongs,
    playListLengthMinutes: duration,
  };

  const time = () => {
    const hours = Math.floor(descriptors.playListLengthMinutes / 60) + "h";
    const minutes = Math.round(descriptors.playListLengthMinutes % 60);

    return minutes > 0 ? `${hours} ${minutes}m` : hours;
  };

  const listStyle = {
    display: "flex",
    alignItems: "center",
    padding: 0,
    listStyleType: "none",
    margin: 0,
    width: Math.max(200, window.screen.width * 0.1) + "px",
  };

  return (
    <ul className="playlist-descriptive-list" style={listStyle}>
      <li className="playlist-descriptive-text">
        {descriptors.numSongs} Songs
      </li>
      <li className="playlist-descriptive-text">{time()}</li>
    </ul>
  );
};

descriptionList.propTypes = {
  numSongs: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default descriptionList;
