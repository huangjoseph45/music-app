import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef, useContext, createContext } from "react";
import Playlist from "./pages/Playlist.jsx";
import HomeManager from "./pages/HomeManager.jsx";
import Login from "./pages/Login.jsx";
import VideoList from "./models/videolist.js";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CreateNewAccount from "./pages/CreateNewAccount.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

export const UserContext = createContext(null);
const PORT = 8923;

function App() {
  const [listRoutes, setListRoutes] = useState();
  const [user, setUser] = useState(null);

  const saveData = (updatedUser) => {
    console.log("SAVING");
    setUser(updatedUser);
  };

  useEffect(() => {
    const persistentUser = JSON.parse(localStorage.getItem("user"));
    if (
      persistentUser &&
      persistentUser !== "undefined" &&
      persistentUser !== undefined
    ) {
      if (persistentUser.sessionExpiration >= Date.now()) {
        setUser(persistentUser);
      } else {
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    const onUserChange = async () => {
      if (user?.playlists) {
        setListRoutes(
          user.playlists.map((videolist) => {
            // Debugging: Log `videolist.songlist` before returning the <Route />

            return (
              <Route
                key={videolist.playListName}
                path={`/playlist-${videolist.id}`}
                element={
                  <Playlist
                    videolist={
                      new VideoList(
                        videolist.playListName,
                        videolist.songList,
                        videolist.id,
                        videolist.image
                      )
                    }
                  />
                }
              />
            );
          })
        );
      } else {
        setListRoutes(null);
      }
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (user !== storedUser) {
        localStorage.setItem("user", JSON.stringify(user));
        const updateAccountResponse = await updateAccount(user);
      }
    };
    onUserChange();
  }, [user]);

  const addAccount = async (email, username, password) => {
    let response;
    try {
      response = await fetch(`http://localhost:${PORT}/api/account/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          playlists: [],
        }),
      });
    } catch {
      response = 409;
    }

    return response;
  };

  const updateAccount = async (userToUpdate) => {
    if (userToUpdate && userToUpdate.name) {
      let response;
      try {
        response = await fetch(`http://localhost:${PORT}/api/account/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToUpdate),
        });
      } catch {
        console.error("ERROR: COULD NOT UPDATE ACCOUNT");
        response = 404;
      }
      return response;
    }
  };

  const handleLogin = async (username, password) => {
    const url = `http://localhost:${PORT}/api/account/get?username=${username}&password=${password}`;
    let responseJSON;
    const response = await fetch(url)
      .then((response) => {
        responseJSON = response;
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data); // Handle the data
        if (data.status === 200) {
          const newUser = data.content;
          const sessionEndDate = Date.now() + 86400000;
          newUser["sessionExpiration"] = sessionEndDate;
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          console.log(newUser);
        }
      })
      .catch((error) => {
        console.error("Error making the request:", error);
      });
    return responseJSON;
  };

  return (
    <UserContext.Provider value={{ user, setUser, saveData }}>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />

          <Route path="/" element={<LandingPage />} />
          {user && (
            <>
              <Route path="/home" element={<HomeManager />} />
              {listRoutes}
            </>
          )}

          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/create-new-account"
            element={<CreateNewAccount handleNewAccount={addAccount} />}
          />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
