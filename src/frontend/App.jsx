import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Playlist from "./pages/Playlist.jsx";
import HomeManager from "./pages/HomeManager.jsx";
import Login from "./pages/Login.jsx";
import VideoList from "./models/videolist.js";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CreateNewAccount from "./pages/CreateNewAccount.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  const [videolist, setVideolist] = useState([]);
  const [listRoutes, setListRoutes] = useState();
  let accounts = useRef({});

  useEffect(() => {
    const initializeVideoList = async () => {
      const list1 = await new VideoList("1");
      const list2 = await new VideoList("2");
      const list3 = await new VideoList("3.5");

      const initializedLists = await [list1, list2, list3];
      setVideolist(initializedLists);

      accounts.current = {
        Joseph: {
          password: "Huang",
          videoLists: initializedLists,
        },
      };
    };

    initializeVideoList();
  }, []);

  if (!videolist) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    setListRoutes(
      videolist?.map((list, index) => {
        if (!list) return null; // Skip falsy entries

        if (!list.playListName) {
          console.warn(`Missing playListName for index ${index}`);
          return null;
        }

        console.log(`Generating route for: ${list.playListName}`);
        return (
          <Route
            key={list.playListName + index} // Unique key for React
            path={`/playlist-${encodeURIComponent(list.playListName)}`} // Safe path
            element={<Playlist videolist={list} />}
          />
        );
      })
    );
  }, [videolist]);

  const handleLogin = (username, password) => {
    if (
      accounts.current[username] !== undefined &&
      accounts.current[username].password === password
    ) {
      console.log("account exists");
      return 1;
    } else {
      return 3;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <HomeManager
              accountInformation={{ name: "Joseph", playlists: videolist }}
            />
          }
        />
        <Route
          path={`/playlist-${videolist.playListName}`}
          element={<Playlist videolist={videolist} />}
        />
        {listRoutes}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-new-account" element={<CreateNewAccount />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
