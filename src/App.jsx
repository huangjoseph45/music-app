import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Playlist from "./pages/Playlist.jsx";
import HomeManager from "./pages/HomeManager.jsx";
import Login from "./pages/Login.jsx";
import VideoList from "./models/videolist.js";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CreateNewAccount from "./pages/CreateNewAccount.jsx";

function App() {
  const [videolist, setVideolist] = useState(null);

  useEffect(() => {
    const initializeVideoList = async () => {
      const list = await new VideoList("1");
      setVideolist(list);
    };

    initializeVideoList();
  }, []);

  if (!videolist) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <HomeManager
              accountInformation={{ name: "Joseph", playlists: [videolist] }}
            />
          }
        />
        <Route
          path={`/playlist-${videolist.playListName}`}
          element={<Playlist videolist={videolist} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-new-account" element={<CreateNewAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
