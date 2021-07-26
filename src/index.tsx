import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";

import "antd/dist/antd.dark.css";
import "./fonts/fonts.scss";
import "./index.scss";

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
  ,
  document.getElementById("root")
);
