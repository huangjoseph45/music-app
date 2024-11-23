const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

router.get("/:videoId", async (req, res) => {
  try {
    let { videoId } = req.params;

    //invalid vidoe id
    if (!videoId) {
      return res.status(400).json({ error: "Invalid video ID or URL" });
    }

    // Fetch video details from the YouTube API
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails`;

    const response = await fetch(url);
    const data = await response.json();
    const items = data.items.length;

    if (
      data.items === "undefined" ||
      data.items === undefined ||
      data.items === null ||
      data.items.length === 0
    ) {
      return res.status(404).json({ error: "Video not found" });
    }

    const videoData = data.items[0];
    const parsedData = {
      id: videoId,
      title: videoData.snippet.title,
      duration: parseDuration(videoData.contentDetails.duration),
      channelName: videoData.snippet.channelTitle,
      tags: videoData.snippet.tags || [],
      thumbnails: videoData.snippet.thumbnails,
    };

    res.json(parsedData);
  } catch (error) {
    console.error("Error fetching video data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const parseDuration = (duration) => {
  const matches = duration.match(
    /P(?:\d+Y)?(?:\d+M)?(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );
  const hours = parseInt(matches[1] || 0);
  const minutes = parseInt(matches[2] || 0);
  const seconds = parseInt(matches[3] || 0);

  return hours * 60 + minutes + seconds / 60;
};

module.exports = router;
