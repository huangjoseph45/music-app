import React, { useEffect, useState, useContext, useRef } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "./form.jsx";
import "../../styling/App.css";
import {
  PlayListContext,
  RefreshContext,
  AllowEditContext,
  AddSongContext,
} from "../../pages/Playlist.jsx";
import VideoList from "../../models/videolist.js";
import SearchList from "./search-list.jsx";
import Loading from "./loading.jsx";
import Draggable, { DraggableCore } from "react-draggable";

const SettingsButton = ({ searchListLength }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addSong, setAddSong] = useState(false);
  const [formName, setFormName] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [formFunc, setFormFunc] = useState("");
  const [findSongs, setFindSongs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formFuncName, setFormFuncName] = useState("");
  const [formData, setFormData] = useState("");
  const [searchedSongs, setSearchedSongs] = useState([]);

  const videolist = useContext(PlayListContext);
  const { handleRefresh } = useContext(RefreshContext);
  const { handleEdit } = useContext(AllowEditContext);
  const addSongEffect = useContext(AddSongContext);

  const showSearchQueries = useRef(null);

  useEffect(() => {
    const cachedResults = localStorage.getItem("previousSearches");
    if (cachedResults && cachedResults !== "undefined") {
      setSearchedSongs(JSON.parse(cachedResults));
    }
  }, []);

  const deleteForm = () => {
    setAddSong(false);
    setFindSongs(false);
    showSearchQueries.current = null;
    document.body.style.overflow = "visible";
  };

  useEffect(() => {
    const formFuctions = async () => {
      if (formFunc === "addSong") {
        const newSong = await VideoList.getFromAPI(formData);
        await videolist.addToList(newSong);
        addSongEffect();
        handleRefresh();
        deleteForm();
      } else if (formFunc === "findSong") {
        if (
          findSongs &&
          !searchedSongs.some((item) => item.searchQuery === formData)
        ) {
          document.body.style.overflow = "hidden";
          setLoading(true);
          const searchResult = await videolist.searchSongs(formData);
          showSearchQueries.current = formData;
          const updatedSearchedSongs = [
            ...searchedSongs,
            { searchQuery: formData, result: searchResult },
          ];
          if (updatedSearchedSongs.length > searchListLength) {
            updatedSearchedSongs.splice(0, 1);
          }
          setSearchedSongs(updatedSearchedSongs);
          localStorage.setItem(
            "previousSearches",
            JSON.stringify(updatedSearchedSongs)
          );
          setLoading(false);
        }
      }
    };

    formFuctions();
  }, [formData]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        deleteForm();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const addNewSong = () => {
    document.body.style.overflow = "hidden";
    setFindSongs(false);
    setFormName("Add New Song");
    setPlaceholder("song URL");
    setFormFunc("addSong");
    setFormFuncName("Add Song");
    setAddSong(true);
  };

  const findSong = () => {
    document.body.style.overflow = "hidden";
    setAddSong(false);
    setFormName("Find a Song");
    setPlaceholder("Search...");
    setFormFunc("findSong");
    setFormFuncName("Find Songs");
    setFindSongs(true);
  };

  const options = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInput = (data) => {
    setFormData(data);
  };

  return (
    <>
      <>
        {addSong && (
          <Draggable>
            <div className="form">
              <Form
                formName={formName}
                placeholder={placeholder}
                formFunc={formFunc}
                formFuncName={formFuncName}
                userInput={handleUserInput}
                deleteForm={deleteForm}
              />
            </div>
          </Draggable>
        )}

        {findSongs && (
          <Draggable>
            <div className="form">
              <Form
                formName={formName}
                placeholder={placeholder}
                formFunc={formFunc}
                formFuncName={formFuncName}
                userInput={handleUserInput}
                deleteForm={deleteForm}
              />
              {loading ? (
                <Loading />
              ) : (
                <SearchList
                  data={searchedSongs}
                  showSearchQueries={showSearchQueries.current}
                />
              )}
            </div>
          </Draggable>
        )}
      </>

      <li className="temp">
        <a onClick={options} className="round options">
          <FontAwesomeIcon
            className={`center ${isOpen ? "rotate" : ""}`}
            icon={faBars}
          />
        </a>
        <ul className={`dropdown ${isOpen ? "active" : ""}`}>
          <li onClick={addNewSong} className="dropdown-element">
            <a className="dropdown-text-wrapper" href="#">
              <AddIcon className="icon" />
              <p className="dropdown-text">Add Song</p>
            </a>
          </li>
          <li className="dropdown-element">
            <a className="dropdown-text-wrapper" href="#" onClick={findSong}>
              <SearchIcon className="icon" />
              <p className="dropdown-text">Find Songs</p>
            </a>
          </li>
          <li onClick={handleEdit} className="dropdown-element">
            <a className="dropdown-text-wrapper" href="#">
              <EditIcon className="icon" />
              <p className="dropdown-text">Edit Songs</p>
            </a>
          </li>
          <li className="dropdown-element">
            <a className="dropdown-text-wrapper" href="#">
              <DeleteIcon className="icon" />
              <p className="dropdown-text">Delete Playlist</p>
            </a>
          </li>
        </ul>
      </li>
    </>
  );
};

export default SettingsButton;
