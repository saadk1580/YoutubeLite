import React from "react";
import "../ShowData/ShowData.scss";
import { gapi } from "gapi-script";

function ShowData(props) {
  function subs(id) {
    return gapi.client.youtube.subscriptions
      .insert({
        part: ["snippet"],
        resource: {
          snippet: {
            resourceId: {
              kind: "youtube#channel",
              channelId: id,
            },
          },
        },
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }

  // console.log(gapi.auth.getToken);
  return (
    <div className="itemsContainer">
      <img
        className="thumbnail"
        title={props.des}
        src={props.thumbnail}
        // {props.videoId + "?modestbranding=1"}
        allowFullScreen
        alt="a"
      ></img>
      <h3 className="title">{props.des}</h3>
      <div className="titleDate">
        <a href={`https://www.youtube.com/channel/${props.channelId}`}>
          <p className="channel">{props.title}</p>
        </a>
        <p className="date">{props.date}</p>
      </div>
      <button
        onClick={() => {
          subs(props.channelId);
        }}
      >
        Subscribe
      </button>
    </div>
  );
}

export default ShowData;
