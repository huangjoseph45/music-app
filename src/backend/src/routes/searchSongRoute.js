const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const MAX_RESULTS = 150;

router.get("/:searchQuery", async (req, res) => {
  try {
    const { searchQuery } = req.params;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchQuery
    )}&type=video&maxResults=${MAX_RESULTS}&key=${API_KEY}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      res.json([]);
      return res
        .status(500)
        .json({ error: "Network response was not ok: " + response.statusText });
    }

    const data = await response.json();

    // Handle the case where no items are returned
    if (!data.items || data.items.length === 0) {
      console.warn("No results found for query:", searchQuery);
      return res.json([]);
    }

    const responseList = data.items.map((item) => ({
      id: item.id.videoId,
      videoData: item.snippet,
    }));

    res.json(responseList);
  } catch (error) {
    console.error("Error fetching video data:", error);
    res.status(500).json({ error: "Internal server error" });
    res.json([]);
  }
});

module.exports = router;
