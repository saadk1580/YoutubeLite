import React, { Component } from "react";
import ShowData from "../ShowData/ShowData";
import "../Main/Main.scss";

import youtube, { baseParams } from "../YoutubeAPI/YouTube";

// import RouteUrl from "../Router/RouteUrl";
import icon from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: "Trending Right Now...",
      title: [],
      thumbnail: [],
      description: [],
      video: [],
      channelId: [],
      date: [],
      searchVal: "",
      maxRes: 10,
    };

    this.handleEnter = this.handleEnter.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  //Starter screen. Loads videos that are trending
  async componentDidMount() {
    const res = await youtube.get("/search", {
      params: {
        ...baseParams,
        q: "",
      },
    });

    let arr = res.data.items;
    let fromMattedArray = [];
    let dateUplaod = arr.map((item) => item.snippet.publishTime);
    let dateArray = [];
    console.log(dateUplaod);

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
    return this.setState({
      banner: "Trending Right Now...",
      title: title,
      thumbnail: finalThunm,
      description: videoTitle,
      video: vid,
      channelId: channelid,
      date: fromMattedArray,
    });
  }

  handleEnter = async () => {
    let val = document.getElementById("searchInput").value;
    const res = await youtube.get("/search", {
      params: {
        ...baseParams,
        q: val,
      },
    });

    let arr = res.data.items;

    let channelid = arr.map((item) => item.snippet.channelId);
    let dateArray = [];
    let fromMattedArray = [];
    let dateUplaod = arr.map((item) => item.snippet.publishTime);

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
    return this.setState({
      banner:
        val === "" ? "Trending Right Now..." : `Showing Results for ${val}...`,
      title: title,
      thumbnail: finalThunm,
      description: videoTitle,
      video: vid,
      channelId: channelid,
      date: fromMattedArray,
      searchVal: val,
    });
  };

  //Checking for "Press Enter" to search input

  // maxLengthCheck = (object) => {
  //   if (object.target.value.length > object.target.maxLength) {
  //     object.target.value = object.target.value.slice(
  //       0,
  //       object.target.maxLength
  //     );
  //   }
  // };
  limit = (element) => {
    var max_chars = 2;

    if (element.value.length > max_chars) {
      element.value = element.value.substr(0, max_chars);
    }
  };

  keypress = (e) => {
    if (e.key === "Enter") {
      this.handleEnter();
    }
  };

  render() {
    const array = [];
    for (let index = 0; index < this.state.maxRes; index++) {
      array.push(index);
    }
    return (
      <div className="container">
        <div className="Location-feild">
          {/* <RouteUrl
            comp={this.componentDidMount}
            enter={this.handleEnter}
            searchInput={this.state.searchVal}
          /> */}
          <div className="search-bar">
            <div className="logo">
              <img className="Youtube-logo" src={icon} alt="YouTube" />
              <h3>LITE</h3>
            </div>

            <div className="search">
              <input
                onKeyPress={this.keypress}
                id="searchInput"
                type="text"
                placeholder="Search"
                required
              />

              {/* <SearchButton click={props.enter} search={props.searchInput} /> */}
              <button
                onClick={() => {
                  this.handleClick();
                }}
                className="faSearch"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>

        <h3 className="banner">{this.state.banner}</h3>

        <div className="container results-container">
          {array.map((index) => {
            return (
              <ShowData
                className="items"
                title={this.state.title[index]}
                thumbnail={this.state.thumbnail[index]}
                des={this.state.description[index]}
                date={this.state.date[index]}
                videoId={`https://www.youtube.com/embed/${this.state.video[index]}`}
                channelId={this.state.channelId[index]}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Main;
