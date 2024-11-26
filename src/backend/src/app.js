const express = require("express");
const findSong = require("./routes/findSongRoute.js"); // Import the router
const searchSongs = require("./routes/searchSongRoute.js");
const account = require("./routes/accountsRoute.js");

require("dotenv").config();

const app = express();
const cors = require("cors");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/videos", findSong);
app.use("/api/search", searchSongs);
app.use("/api/account", account);

module.exports = app; // Export the app instance
