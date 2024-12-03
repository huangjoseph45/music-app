import API_KEY from "./youtube";
import defaultImage from "../assets/default-image.webp";

class VideoList {
  constructor(playListName, songList = [], id, image = null) {
    this.playListName = playListName;
    this.songList = songList;
    this.image = image;
    this.id = id;

    if (!this.image) {
      if (!this.songList[0]) {
        this.image = defaultImage;
      } else {
        this.image = this.songList[0].thumbnails.medium.url;
      }
    }
  }

  static parseDuration(duration) {
    const matches = duration.match(
      /P(?:\d+Y)?(?:\d+M)?(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    );
    const hours = parseInt(matches[1] || 0);
    const minutes = parseInt(matches[2] || 0);
    const seconds = parseInt(matches[3] || 0);

    return hours * 60 + minutes + seconds / 60;
  }

  async addToList(jsonData) {
    if (
      jsonData != null &&
      !this.songList.some((song) => song.id === jsonData.id)
    ) {
      this.songList.push(jsonData);
      localStorage.setItem(this.playListName, JSON.stringify(this.songList));
    } else if (jsonData == null) {
      console.error("Video JSON is empty");
    } else {
      console.error("Duplicate video detected!");
    }
  }

  static async getFromAPI(videoId) {
    //extract youtube video id from youtube link
    if (videoId.toLowerCase().includes("youtube")) {
      const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = videoId.match(regex);
      videoId = match ? match[1] : null;
    }
    try {
      const response = await fetch(
        `http://localhost:8923/api/videos/${videoId}`
      );
      const data = await response.json();
      if (!data.id) {
        return undefined;
      }

      return data;
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  }

  getShuffledSong(remainingSongs) {
    const random = Math.floor(Math.random() * remainingSongs.length);
    const randomSong = remainingSongs[random];
    return randomSong;
  }

  deleteSong(id) {
    for (let i = 0; i < this.songList.length; i++) {
      if (this.songList[i].id === id) {
        console.log("Removed song: " + this.songList.splice(i, 1).id);
        localStorage.setItem(this.playListName, JSON.stringify(this.songList));
        return;
      }
    }
  }

  async getVideoData() {
    return this.songList;
  }

  async searchVideos(query) {
    const searchArray = this.songList.filter(
      (song) =>
        song != null &&
        song != "undefined" &&
        (song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.channelName.toLowerCase().includes(query.toLowerCase()) ||
          song.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          ))
    );

    return searchArray;
  }

  async getNumSongs() {
    try {
      const listLength = this.songList.length;
      console.log("Array Length: " + this.songList.length);
      return listLength;
    } catch (error) {
      console.error("Error loading default songs:", error);
      return 0; // Return 0 or handle as needed
    }
  }

  async getTotalDuration() {
    try {
      let duration = 0;
      for (let i = 0; i < this.songList.length; i++) {
        const song = this.songList[i];
        if (song != null && song != "undefined" && song.duration) {
          duration += song.duration;
        }
      }
      return duration;
    } catch (error) {
      console.error("Error loading default songs:", error);
      return 0; // Return 0 or handle as needed
    }
  }

  async searchSongs(query) {
    try {
      const response = await fetch(`http://localhost:8923/api/search/${query}`);
      const searchList = await response.json();
      console.log(searchList);
      return searchList;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return [];
    }
  }
}

export default VideoList;
