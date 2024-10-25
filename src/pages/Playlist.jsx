import "../styling/playlist.css";
import "../styling/App.css";
import { useState, useEffect, createContext } from "react";
import PlayListImage from "../components/playlist-image.jsx";
import Header from "../components/header.jsx";
import DescriptionList from "../components/playlist-description-list.jsx";
import Button from "../components/general-button.jsx";
import SongList from "../components/song-list.jsx";
import SearchBar from "../components/search-bar.jsx";
import VideoList from "../models/videolist.js";
import PropTypes from "prop-types";
import SongPlayer from "../components/song-player.jsx";
import SongNode from "../models/song-node";
import { Alert } from "@mui/material";

export const PlayListContext = createContext(null);
export const RefreshContext = createContext(null);
export const AllowEditContext = createContext(null);
export const VideoToPlayContext = createContext(null);

let root = null;
let songNode = null;
let currentSongList = null;

export default function Playlist({ videolist }) {
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState(null);

  const handleClosePlayer = () => {
    console.log("PLAYER HAS BEEN CLOSED");
    setVideoToPlay(null);

    root = null;
    songNode = null;
    return;
  };

  const handleSongToPlay = (data) => {
    if (currentSongList === null || currentSongList.length === 0)
      currentSongList = videolist.songList;
    if (data === "nextSong") {
      if (songNode.next != null) {
        songNode = songNode.next;
      } else if (data != undefined) {
        getNewSong();
      } else {
        handleSongToPlay("nextSong");
      }
    } else if (data === "prevSong") {
      if (songNode.prev != null) {
        songNode = songNode.prev;
      }
    } else if (songNode === null && data != null) {
      songNode = new SongNode(data);
      root = songNode;
      console.log(songNode);
      setVideoToPlay(songNode);
      return;
    } else {
      getNewSong();
    }

    setVideoToPlay(songNode);
  };

  const getNewSong = () => {
    let songToPlay;
    while (songToPlay == null || songToPlay == "undefined") {
      songToPlay = videolist.getShuffledSong(currentSongList);
      currentSongList = currentSongList.filter((song) => song != songToPlay);
    }
    currentSongList = currentSongList.filter((song) => song != songToPlay);
    let newSongNode = new SongNode(songToPlay);
    if (songNode != null) {
      songNode.next = newSongNode;
      newSongNode.prev = songNode;
    }

    songNode = newSongNode;
  };

  const handleEdit = () => {
    setEdit(!isEdit);
    console.log("Editing");
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
    console.log("Refreshed");
  };

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [numSongs, setNumSongs] = useState(0);
  const [duration, setDuration] = useState(0);

  const loadSongs = async () => {
    try {
      const songs = await videolist.getVideoData();
      setListData(songs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []); // dependency array required to only run on inital load

  useEffect(() => {
    async function songInfo() {
      const listLength = await videolist.getNumSongs();
      const duration = await videolist.getTotalDuration();
      setDuration(duration);
      setNumSongs(listLength);
    }
    songInfo();
  }, [listData]);

  useEffect(() => {
    const loadSearch = async () => {
      if (searchData) {
        const searchResults = await videolist.searchVideos(searchData);
        setListData(searchResults);
      } else {
        await loadSongs(); // Load default songs if no search term is present
      }
    };
    loadSearch();
  }, [searchData]);

  if (loading) {
    return (
      <div className="wrapper">
        <p>Loading songs...</p>
      </div>
    );
  }

  const handleData = (data) => {
    setSearchData(data);
  };

  return (
    <RefreshContext.Provider value={{ handleRefresh }}>
      <PlayListContext.Provider value={videolist}>
        <AllowEditContext.Provider value={{ isEdit, handleEdit }}>
          <VideoToPlayContext.Provider
            value={{ handleSongToPlay, handleClosePlayer }}
          >
            {videoToPlay && <SongPlayer videoNode={videoToPlay} />}
            <div className="wrapper">
              <Header />
              <SearchBar
                placeholder="Search in playlist"
                sendData={handleData}
              />
              <PlayListImage />
              <DescriptionList numSongs={numSongs} duration={duration} />
              <Button
                buttonFunction={() => handleSongToPlay()}
                buttonContent="Shuffle Play"
              />

              <SongList listData={listData} />
            </div>
          </VideoToPlayContext.Provider>
        </AllowEditContext.Provider>
      </PlayListContext.Provider>
    </RefreshContext.Provider>
  );
}

const fakeFunc = () => {
  return;
};

Playlist.propTypes = {
  videolist: PropTypes.instanceOf(VideoList),
};
