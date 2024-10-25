import API_KEY from "./youtube";

class VideoList {
  constructor(playListName) {
    this.playListName = playListName;
    this.songList = [];

    const storedPlaylist = localStorage.getItem(this.playListName);

    if (storedPlaylist === null) {
      this.loadDefault().then(() => {
        localStorage.setItem(this.playListName, JSON.stringify(this.songList));
      });
    } else {
      this.songList = JSON.parse(storedPlaylist);
    }
    console.log(this.songList);
  }

  async loadDefault() { //temporary test code
    const videoIdList = [
      "https://www.youtube.com/watch?v=hQbY_hz7s_o",
      "https://www.youtube.com/watch?v=PIh2xe4jnpk",
      "https://www.youtube.com/watch?v=VbfpW0pbvaU",
      "https://www.youtube.com/watch?v=lY2yjAdbvdQ",
      "https://www.youtube.com/watch?v=dT2owtxkU8k",
      "https://www.youtube.com/watch?v=N7VCLNBNJQs",
      "https://www.youtube.com/watch?v=eVli-tstM5E",
      "https://www.youtube.com/watch?v=KEG7b851Ric",
      "https://www.youtube.com/watch?v=cF1Na4AIecM",
      "https://www.youtube.com/watch?v=Mxv7O6BkJeE",
      "https://www.youtube.com/watch?v=fH_OnJk6QqU",
      "https://www.youtube.com/watch?v=UqyT8IEBkvY",
      "https://www.youtube.com/watch?v=XqZsoesa55w",
      "https://www.youtube.com/watch?v=3JZ4pnNtyxQ",
      "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
      "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      "https://www.youtube.com/watch?v=hT_nvWreIhg",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=JGwWNGJdvx8",
      "https://www.youtube.com/watch?v=oRdxUFDoQe0",
      "https://www.youtube.com/watch?v=pXRviuL6vMY",
      "https://www.youtube.com/watch?v=7wtfhZwyrcc",
      "https://www.youtube.com/watch?v=RgKAFK5djSk",
      "https://www.youtube.com/watch?v=60ItHLz5WEA",
      "https://www.youtube.com/watch?v=09R8_2nJtjg",
      "https://www.youtube.com/watch?v=36YnV9STBqc",
      "https://www.youtube.com/watch?v=lp-EO5I60KA",
      "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      "https://www.youtube.com/watch?v=SlPhMPnQ58k",
      "https://www.youtube.com/watch?v=iEiIyycnzXI",
      "https://www.youtube.com/watch?v=AjGsoxzUk4k",
      "https://www.youtube.com/watch?v=qg_aZ12EHak",
      "https://www.youtube.com/watch?v=YVw7eJ0vGfM",
      "https://www.youtube.com/watch?v=egwS0cih1Ek",
      "https://www.youtube.com/watch?v=uelHwf8o7_U",
      "https://www.youtube.com/watch?v=p7RzLhZ-xXY",
      "https://www.youtube.com/watch?v=IhnUgAaea4M",
      "https://www.youtube.com/watch?v=pt8VYOfr8To",
      "https://www.youtube.com/watch?v=0KSOMA3QBU0",
      "https://www.youtube.com/watch?v=WchseC9aKTU",
      "https://www.youtube.com/watch?v=vU5AyJYpDZw",
      "https://www.youtube.com/watch?v=NsgrvPgm09E",
      "https://www.youtube.com/watch?v=e9TPTV8wl2A",
      "https://www.youtube.com/watch?v=MRgFeZklA7I",
      "https://www.youtube.com/watch?v=09QxFk7u3T8",
      "https://www.youtube.com/watch?v=V4ISqvLgG6g",
      "https://www.youtube.com/watch?v=LsoLEjrDogU",
      "https://www.youtube.com/watch?v=7T2RonyJ_Ts",
      "https://www.youtube.com/watch?v=UtF6Jej8yb4",
      "https://www.youtube.com/watch?v=2vjPBrBU-TM",
      "https://www.youtube.com/watch?v=oofSnsGkops",
      "https://www.youtube.com/watch?v=h0G1Ucw5HDg",
      "https://www.youtube.com/watch?v=JwYX52BP2Sk",
      "https://www.youtube.com/watch?v=9bZkp7q19f0",
      "https://www.youtube.com/watch?v=iJ4T9CQA0UM",
      "https://www.youtube.com/watch?v=CevxZvSJLk8",
      "https://www.youtube.com/watch?v=UceaB4D0jpo",
      "https://www.youtube.com/watch?v=OPf0YbXqDm0",
      "https://www.youtube.com/watch?v=NF-Pf8k6-KA",
      "https://www.youtube.com/watch?v=gCYcHz2k5x0",
      "https://www.youtube.com/watch?v=rtOvBOTyX00",
      "https://www.youtube.com/watch?v=VFt2mnO5Icc",
      "https://www.youtube.com/watch?v=fRh_vgS2dFE",
      "https://www.youtube.com/watch?v=o0pwKHfkwgc",
      "https://www.youtube.com/watch?v=pRpeEdMmmQ0",
      "https://www.youtube.com/watch?v=UVOPaGJjmdc",
      "https://www.youtube.com/watch?v=aCHg5r6rFoI",
      "https://www.youtube.com/watch?v=LrUvu1mlWco",
      "https://www.youtube.com/watch?v=b8I-7Wk_Vbc",
      "https://www.youtube.com/watch?v=ZLiy8Tt5qAo",
      "https://www.youtube.com/watch?v=C8f1aCTztZ4",
      "https://www.youtube.com/watch?v=XC1i4y32A2I",
      "https://www.youtube.com/watch?v=l6RhGQUK-WE",
      "https://www.youtube.com/watch?v=45EMFGXrmpA",
      "https://www.youtube.com/watch?v=QJzsSCsn-OE",
      "https://www.youtube.com/watch?v=Eo-KmOd3i7s",
      "https://www.youtube.com/watch?v=gdZLi9oWNZg",
      "https://www.youtube.com/watch?v=-jZqp0Rpq6M",
      "https://www.youtube.com/watch?v=FzG4uDgje3M",
      "https://www.youtube.com/watch?v=SV5U8XPm7Cs",
      "https://www.youtube.com/watch?v=_vBa6SX8gjA",
      "https://www.youtube.com/watch?v=8z1OCGZId0A",
      "https://www.youtube.com/watch?v=EPo5wWmKEaI",
      "https://www.youtube.com/watch?v=fLexgOxsZu0",
      "https://www.youtube.com/watch?v=dv13gl0a-FA",
      "https://www.youtube.com/watch?v=1TewCPi92ro",
      "https://www.youtube.com/watch?v=8UVNT4wvIGY",
      "https://www.youtube.com/watch?v=bESGLojNYSo",
      "https://www.youtube.com/watch?v=q7WAGZyWzsc",
      "https://www.youtube.com/watch?v=F3gTrJ0xexA",
      "https://www.youtube.com/watch?v=-de-6pJfPfo",
      "https://www.youtube.com/watch?v=ZhIsAZO5gl0",
      "https://www.youtube.com/watch?v=6Tt6zN2KpN4",
      "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
      "https://www.youtube.com/watch?v=5NV6Rdv1a3I",
      "https://www.youtube.com/watch?v=LnXXgVp5hx8",
      "https://www.youtube.com/watch?v=wXhTHyIgQ_U",
      "https://www.youtube.com/watch?v=me5yQv7y9Xs",
      "https://www.youtube.com/watch?v=8Fbbo0aeq5w",
    ];

    await Promise.all(
      videoIdList.map(async (song) => {
        const video = await VideoList.getFromAPI(song);
        if (video != null && video !== "undefined") {
          this.addToList(video);
        }
      })
    );
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
    if (videoId.toLowerCase().search("youtube")) {
      const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = videoId.match(regex);
      videoId = match ? match[1] : null;
    }

    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails,statistics`;
    const response = await fetch(url);
    const data = await response.json();
    try {
      if (data.items.length > 0 && data != null && data != "undefined") {
        const videoData = data.items[0];
        return {
          id: videoId,
          title: videoData.snippet.title,
          duration: VideoList.parseDuration(videoData.contentDetails.duration),
          channelName: videoData.snippet.channelTitle,
          tags: videoData.snippet.tags,
          thumbnails: videoData.snippet.thumbnails,
        };
      } else {
        console.error("Video not found");
      }
    } catch (error) {
      console.error("Error fetching videos: " + error);
    }

    localStorage.setItem(this.playListName, JSON.stringify(this.songList));
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
    if (this.songList.length === 0) {
      await this.loadDefault();
    }
    return this.songList;
  }

  async searchVideos(query) {
    if (this.songList.length === 0) {
      await this.loadDefault();
    }

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
      if (this.songList.length === 0) {
        await this.loadDefault();
      }
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
      if (this.songList.length === 0) {
        await this.loadDefault();
      }
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
}

export default VideoList;
