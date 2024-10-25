import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useContext, createContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "../components/form.jsx"; // temporary
import "../styling/App.css";
import {
  PlayListContext,
  RefreshContext,
  AllowEditContext,
} from "../pages/playlist.jsx";
import VideoList from "../models/videolist.js";

const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [formFunc, setFormFunc] = useState("");

  const [formFuncName, setFormFuncName] = useState("");

  const [formData, setFormData] = useState("");

  const videolist = useContext(PlayListContext);
  const { handleRefresh } = useContext(RefreshContext);

  const { handleEdit } = useContext(AllowEditContext);

  const deleteForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    const addSong = async () => {
      if (formFunc === "addSong") {
        const newSong = await VideoList.getFromAPI(formData);
        await videolist.addToList(newSong);
        console.log(videolist.songList);
        handleRefresh();
      }
    };

    addSong();
    deleteForm();
  }, [formData]);

  const addSong = () => {
    setFormName("Add New Song");
    setPlaceholder("song URL");
    setFormFunc("addSong");
    setFormFuncName("Add Song");
    setOpenForm(true);
  };

  const options = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInput = (data) => {
    setFormData(data);
  };

  return (
    <>
      {openForm && (
        <Form
          formName={formName}
          placeholder={placeholder}
          formFunc={formFunc}
          formFuncName={formFuncName}
          userInput={handleUserInput}
          deleteForm={deleteForm}
        />
      )}
      <li className="temp">
        <a onClick={options} className="round options ">
          <FontAwesomeIcon
            className={`center ${isOpen ? "rotate" : ""}`}
            icon={faBars}
          />
        </a>
        <ul className={`dropdown ${isOpen ? "active" : ""}`}>
          <li onClick={() => addSong()} className="dropdown-element">
            <a className="dropdown-text-wrapper" href="#">
              <AddIcon className="icon" />
              <p className="dropdown-text">Add Song</p>
            </a>
          </li>
          <li className="dropdown-element">
            <a className="dropdown-text-wrapper" href="#">
              <SearchIcon className="icon" />
              <p className="dropdown-text">Find Songs</p>
            </a>
          </li>
          <li onClick={() => handleEdit()} className="dropdown-element">
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
