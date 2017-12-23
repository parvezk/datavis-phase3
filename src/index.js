/* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../src/components/App";

import "./styles/styles.scss"; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
require("./favicon.ico"); // Tell webpack to load favicon.ico

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
