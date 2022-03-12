import React from "react";

export default function SingleData(props) {
  console.log(props);
  return (
    <div>
      <iframe
        className="thumbnail"
        title={props.des}
        src={props.videoId}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
