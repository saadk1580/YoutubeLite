import React, { useEffect, useState } from "react";
import ShowData from "../ShowData/ShowData";
import "./App.scss";
import youtube, { baseParams } from "../YoutubeAPI/YouTube";
import { useParams } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

const App = () => {
  const s = useParams().param;

  const [data, updateData] = useState({
    input: s === undefined ? "popular on youtube" : s,
    banner: "Trending Right Now...",
    title: [],
    thumbnail: [],
    description: [],
    video: [],
    channelId: [],
    date: [],
  });

  const getData = async (params) => {
    const res = await youtube.get("/search", {
      params: {
        ...baseParams,
        q: params ? params : s,
      },
    });

    let arr = res.data.items;
    let fromMattedArray = [];
    let dateUplaod = arr.map((item) => item.snippet.publishTime);
    let dateArray = [];

    dateUplaod.forEach((item) => {
      let timeStamp = new Date(item).getTime();
      let day = new Date(timeStamp).getDate();
      let month = new Date(timeStamp).getMonth() + 1;
      let year = new Date(timeStamp).getFullYear();

      dateArray = [
        month < 10 ? "0" + month : month,
        "-",
        day < 10 ? "0" + day : day,
        "-",
        year,
      ];
      return fromMattedArray.push(dateArray);
    });

    let channelid = arr.map((item) => item.snippet.channelId);
    let title = arr.map((item) => item.snippet.channelTitle);

    let thumbNail = arr.map((item) => item.snippet.thumbnails);
    let finalThunm = thumbNail
      .map((item) => Object.values(item))
      .map((item) => item[1])
      .map((item) => Object.values(item)[0]);
    let des = arr.map((item) => item.snippet.title);
    let videoTitle = [];
    des.forEach((item) => {
      videoTitle.push(
        item
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
      );
    });

    let vid = arr.map((item) => item.id.videoId);

    updateData({
      banner: `Showing results for ${data.input} `,
      title: title,
      thumbnail: finalThunm,
      description: videoTitle,
      video: vid,
      channelId: channelid,
      date: fromMattedArray,
    });
  };

  useEffect(() => {
    getData(data.input);
  }, []);

  return (
    <div className="container">
      <Navbar
        data={data}
        updateInput={(res) => updateData(res)}
        getData={(res) => getData(res)}
      />
      {/* <h3 className="banner">{data.banner}</h3> */}
      <div className="results-container">
        {Array(data.title.length)
          .fill("")
          .map((_, index) => {
            if (data.video[index] !== undefined)
              return (
                <div key={index}>
                  <ShowData
                    className="items"
                    title={data.title[index]}
                    thumbnail={data.thumbnail[index]}
                    des={data.description[index]}
                    date={data.date[index]}
                    videoId={`https://www.youtube.com/embed/${data.video[index]}`}
                    channelId={data.channelId[index]}
                  />
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default App;
