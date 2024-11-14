import "../styling/playlist.css";
import "../styling/App.css";
import { useState, useEffect, createContext, useRef } from "react";
import PlayListImage from "../components/playlist/playlist-image.jsx";
import Header from "../components/playlist/header.jsx";
import DescriptionList from "../components/playlist/playlist-description-list.jsx";
import Button from "../components/playlist/general-button.jsx";
import SongList from "../components/playlist/song-list.jsx";
import SearchBar from "../components/playlist/search-bar.jsx";
import VideoList from "../models/videolist.js";
import PropTypes from "prop-types";
import SongPlayer from "../components/playlist/song-player.jsx";
import SongNode from "../models/song-node";
import Loading from "../components/playlist/loading.jsx";
import DecayingNote from "../components/playlist/decaying-note.jsx";
import LoginButton from "../components/playlist/login-button.jsx";

export const PlayListContext = createContext(null);
export const RefreshContext = createContext(null);
export const AllowEditContext = createContext(null);
export const VideoToPlayContext = createContext(null);
export const AddSongContext = createContext(null);

let root;
let songNode = null;
let currentSongList = null;

export default function Playlist({ videolist }) {
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState(null);
  const [showDecayingNote, setShowDecayingNote] = useState(false);
  const timeoutRef = useRef(null);

  const handleClosePlayer = () => {
    console.log("PLAYER HAS BEEN CLOSED");
    setVideoToPlay(null);

    root = null;
    songNode = null;
    return;
  };

  const handleSongToPlay = (data) => {
    if (!currentSongList || currentSongList.length === 0) {
      currentSongList = videolist.songList;
    }

    if (data === "nextSong") {
      if (songNode.next != null) {
        songNode = songNode.next;
      } else if (data != undefined) {
        getNewSong();
      } else {
        handleSongToPlay("nextSong");
      }
    } else if (data === "prevSong") {
      if (songNode?.prev) {
        songNode = songNode.prev;
      }
    } else if (data === "startShuffle") {
      getNewSong();
    } else if (!songNode && data) {
      songNode = new SongNode(data);
      root = songNode;
    } else if (data) {
      const newNode = new SongNode(data);
      newNode.prev = songNode;
      if (songNode) songNode.next = newNode;
      songNode = newNode;
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

  const addSongEffect = () => {
    setShowDecayingNote(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowDecayingNote(false);
    }, 1000);
  };

  const handleRefresh = () => {
    loadSongs();
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
      setListData([...songs]);
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
    return <Loading />;
  }

  const handleData = (data) => {
    setSearchData(data);
  };

  return (
    <AddSongContext.Provider value={addSongEffect}>
      <RefreshContext.Provider value={{ handleRefresh }}>
        <PlayListContext.Provider value={videolist}>
          <AllowEditContext.Provider value={{ isEdit, handleEdit }}>
            <VideoToPlayContext.Provider
              value={{ handleSongToPlay, handleClosePlayer }}
            >
              {showDecayingNote && <DecayingNote note="Added Song" />}
              {videoToPlay && <SongPlayer videoNode={videoToPlay} />}
              <div className="wrapper">
                <Header playlistTitle="Random List" searchListLength={20} />
                <SearchBar
                  placeholder="Search in playlist"
                  sendData={handleData}
                />
                <PlayListImage />
                <DescriptionList numSongs={numSongs} duration={duration} />
                <Button
                  buttonFunction={() => handleSongToPlay("startShuffle")}
                  buttonContent="Shuffle Play"
                />

                <SongList listData={listData} />
                <div className="right-side">
                  <LoginButton />
                </div>
              </div>
            </VideoToPlayContext.Provider>
          </AllowEditContext.Provider>
        </PlayListContext.Provider>
      </RefreshContext.Provider>
    </AddSongContext.Provider>
  );
}

Playlist.propTypes = {
  videolist: PropTypes.instanceOf(VideoList),
};
