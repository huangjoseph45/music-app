import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Playlist from "./pages/playlist.jsx";
import HomeManager from "./pages/HomeManager.jsx";
import VideoList from "./models/videolist.js";

function App() {
  const [videolist, setVideolist] = useState(null);

  useEffect(() => {
    // Async function to initialize the videolist
    const initializeVideoList = async () => {
      const list = await new VideoList("1"); // Assuming VideoList is async
      setVideolist(list);
    };

    initializeVideoList();
  }, []);

  if (!videolist) {
    return <div>Loading...</div>; // Or another loading state component
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Playlist videolist={videolist} />} />
      </Routes>
    </Router>
  );
}

export default App;
