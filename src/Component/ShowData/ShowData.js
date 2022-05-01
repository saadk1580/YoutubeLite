import React from "react";
import "../ShowData/ShowData.scss";
// import { gapi } from "gapi-script";

function ShowData(props) {
  return (
    <div className="itemsContainer">
      {/* <img
        className="thumbnail"
        title={props.des}
        src={props.thumbnail}
        allowFullScreen
        alt="a"
      ></img> */}
      <embed src={props.videoId} title={props.title}></embed>
      <h3 className="title">{props.des}</h3>
      <div className="titleDate">
        <a href={`https://www.youtube.com/channel/${props.channelId}`}>
          <p className="channel">{props.title}</p>
        </a>
        <p className="date">{props.date}</p>
      </div>
      <button
      // onClick={() => {
      //   subs(props.channelId);
      // }}
      >
        Subscribe
      </button>
    </div>
  );
}

export default ShowData;
