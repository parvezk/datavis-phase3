/* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../src/components/App";

import "./styles/styles.scss";
require("./favicon.ico");

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
