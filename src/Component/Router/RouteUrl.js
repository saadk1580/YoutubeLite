import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import icon from "../images/logo.png";
import SearchButton from "../Main/SearchButton";

export default function RouteUrl(props) {
  const keypress = (e) => {
    if (e.key === "Enter") {
      props.enter();
    }
  };
  return (
    <Router>
      <div className="search-bar">
        <div onClick={props.comp} className="logo">
          <img className="Youtube-logo" src={icon} alt="YouTube" />
          <h3>LITE</h3>
        </div>

        <div className="search">
          <input
            onKeyPress={keypress}
            id="searchInput"
            type="text"
            placeholder="Search"
            required
          />

          <SearchButton click={props.enter} search={props.searchInput} />
        </div>
      </div>
      {/* <Switch>
        <Route exact to="/" />
      </Switch> */}
    </Router>
  );
}
