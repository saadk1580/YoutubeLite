import React, { useState } from "react";
import icon from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.scss";
import Login_Page from "../Login_page/Login_page";

export default function Navbar({ updateInput, data, getData }) {
  const [input, setInput] = useState("news");
  return (
    <div className="nav-bar">
      <a href="/">
        <div className="logo">
          <img className="Youtube-logo" src={icon} alt="YouTube" />
          <h3>LITE</h3>
        </div>
      </a>

      <div className="search">
        <input
          id="searchInput"
          type="text"
          placeholder="Search"
          required
          onChange={(ev) => {
            setInput(ev.target.value);
            updateInput({ ...data, input: input });
          }}
        />

        <a
          className="faSearch"
          href={`/search/${input}`}
          onClick={() => {
            getData(input);
            window.location.reload(false);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </a>
      </div>

      <div className="Location-feild">
        <Login_Page />
      </div>
    </div>
  );
}
