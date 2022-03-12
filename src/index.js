import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
// import history from "./history";
import "./index.css";
import { createMemoryHistory, createBrowserHistory } from "history";
// import App from "./Component/App/App";
import Routes from "./Routes";

const history =
  process.env.NODE_ENV === "test"
    ? createMemoryHistory()
    : createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Routes />
  </Router>,
  document.getElementById("root")
);
