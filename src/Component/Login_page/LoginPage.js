import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

export default function LoginPage() {
  const [loggedIn, setLoggedIn] = useState("Login");
  const [subscriptions, setSubs] = useState([]);

  function authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
      .then(
        function (res) {
          localStorage.setItem("token", res.xc.access_token);
          setLoggedIn("Log Out");
        },
        function (err) {
          console.error("Error signing in", err);
        }
      );
  }
  function loadClient() {
    gapi.client.setApiKey(process.env.REACT_APP_API_KEY);

    return gapi.client
      .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.subscriptions
      .list({
        part: ["snippet"],
        mine: true,
        access_token: localStorage.getItem("token"),
        maxResults: 100,
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).

          if (subscriptions.length === 0) {
            setSubs(response.result.items);
          }
          console.log(response);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }

  function unsubscribe(id) {
    return gapi.client.youtube.subscriptions
      .delete({
        id: id,
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

  gapi.load("client:auth2", function () {
    gapi.auth2.init({
      client_id:
        "113010004072-henr786ul8c0oeltrvhk0lec92c67slg.apps.googleusercontent.com",
    });
  });

  useEffect(() => {
    if (loggedIn !== "Login") {
      execute();
    }
  }, [loggedIn]);
  return (
    <div>
      <button
        onClick={() => {
          authenticate().then(loadClient());
        }}
      >
        {loggedIn}
      </button>

      <div
        id="subscriptions"
        style={{
          display: subscriptions.length === 0 ? "none" : "flex",
          color: "#ffffff",
          flexDirection: "column",
        }}
      >
        {subscriptions.length === 0
          ? ""
          : subscriptions.map((i) => (
              <div>
                <a
                  href={`https://www.youtube.com/channel/${i.snippet.resourceId.channelId}`}
                >
                  {i.snippet.title}
                </a>
                <button
                  onClick={() => {
                    unsubscribe(i.id);
                  }}
                >
                  Unsubscribe
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
