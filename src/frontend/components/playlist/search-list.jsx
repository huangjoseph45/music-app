import { useState, useEffect, useContext, useCallback } from "react";
import VideoList from "../../models/videolist.js";
import {
  AddSongContext,
  PlayListContext,
  RefreshContext,
} from "../../pages/Playlist.jsx";

const SearchList = ({ data, showSearchQueries }) => {
  const [list, setList] = useState([]);
  const videolist = useContext(PlayListContext);
  const addSongEffect = useContext(AddSongContext);
  const { handleRefresh } = useContext(RefreshContext);

  const addSong = useCallback(async (key) => {
    const songToAdd = await VideoList.getFromAPI(key);
    await videolist.addToList(songToAdd);
    addSongEffect();
    handleRefresh();
  });

  const showResult = useCallback(
    (resultList) => {
      let newList = null;
      console.log(resultList);
      if (
        resultList === undefined ||
        resultList === null ||
        resultList === "undefined"
      ) {
        console.log("sjlkdf");
        return;
      }
      newList = resultList.map((item) => {
        const key = item.id;
        const videoData = item.videoData;

        return (
          <li
            key={key}
            className="video-list-element"
            onClick={() => {
              addSong(key);
            }}
          >
            <div className="video-wrapper">
              <img
                className="thumbnail"
                draggable="false"
                src={videoData.thumbnails?.default?.url || ""}
                alt={videoData.title || "Video thumbnail"}
              />
              <div className="video-text-wrapper">
                <h3>{videoData.title}</h3>
                <small>{videoData.channelTitle}</small>
              </div>
            </div>
          </li>
        );
      });
      setList(newList);
    },
    [addSong]
  );

  useEffect(() => {
    if (data != null && data !== "undefined" && data.length > 0) {
      if (showSearchQueries === null) {
        const newList = data.map((item, index) => (
          <li
            key={index}
            onClick={() => showResult(item.result)}
            className="search-query"
          >
            {item.searchQuery}
          </li>
        ));
        setList(newList);
      } else {
        showResult(
          data.find((item) => item.searchQuery === showSearchQueries).result
        );
      }
    } else {
      setList(<p>No Results Found</p>);
    }
  }, [data, showSearchQueries]);

  return (
    <>
      <div className="search-list-wrapper">
        <ul className="search-list">{list}</ul>
      </div>
    </>
  );
};

export default SearchList;
