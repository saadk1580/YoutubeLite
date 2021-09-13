import React from "react";
import "../ShowData/ShowData.scss";

function ShowData(props) {
  return (
    <div className="itemsContainer">
      {/* <img className='thumbnail' onClick={playVideo}  src={props.thumbnail}   /> */}
      <iframe
        className="thumbnail"
        title={props.des}
        src={props.videoId}
        allowFullScreen
      ></iframe>
      <h3 className="title">{props.des}</h3>
      <div className="titleDate">
        <a href={`https://www.youtube.com/channel/${props.channelId}`}>
          <p className="channel">{props.title}</p>
        </a>
        <p className="date">{props.date}</p>
      </div>
    </div>
  );
}

export default ShowData;
