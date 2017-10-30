"use strict";
import React from "react";
import ReactDom from "react-dom";
import GameContainer from "./business/gameContainer";

// Modify the size and speed of the game.
const boardParams = {
  width: 50,
  height: 50,
  delay: 100,
};

ReactDom.render(
  <GameContainer {...boardParams} />,
  document.getElementById("app")
);