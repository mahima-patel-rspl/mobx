import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./assets/common/css/main.css";
import "./assets/common/fonts/line-awesome.css";
import "./assets/common/fonts/rsp-icon.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
