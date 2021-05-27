import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import './assets/css/global.css';
import './assets/css/extra.scss';

import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./redux/store";

import App from "./App";
import Message from "components/Message.js";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Message />
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById("root")
);