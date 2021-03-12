import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./utils/history";
import store from "./redux/store";
import "font-awesome/css/font-awesome.css";
import "./index.css";
import App from "./App";

import { autoLogin } from "./redux/actions/userActions";

const token = localStorage.IdToken;
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(autoLogin());
}

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
