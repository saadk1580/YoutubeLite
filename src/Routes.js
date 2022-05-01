import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./Component/App/App";
import LoginPage from "./Component/Login_page/LoginPage";
import SingleData from "./Component/ShowData/SingleData";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/search/:param" component={App} />
        <Route exact path="/login" component={LoginPage} />
        {/* <Route exact path="/search/:id" component={App} /> */}
        <Route exact path="/video/:id" component={SingleData} />
      </Switch>
    </div>
  );
}
