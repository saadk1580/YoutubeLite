import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./Component/App/App";
import Login_page from "./Component/Login_page/Login_page";
import SingleData from "./Component/ShowData/SingleData";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/search/:param" component={App} />
        <Route exact path="/login" component={Login_page} />
        {/* <Route exact path="/search/:id" component={App} /> */}
        {/* <Route exact path="/video/:" component={SingleData} /> */}
      </Switch>
    </div>
  );
}
