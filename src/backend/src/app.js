const express = require("express");
const findSong = require("./routes/findSongRoute.js"); // Import the router
const searchSongs = require("./routes/searchSongRoute.js");

const app = express();
const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/videos", findSong);
app.use("/api/search", searchSongs);

module.exports = app; // Export the app instance
console.log("Namkhang smells");
