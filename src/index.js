import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/Component/App/App';
import { BrowserRouter, Switch, Route} from 'react-router-dom';




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
,document.getElementById('root')
);

