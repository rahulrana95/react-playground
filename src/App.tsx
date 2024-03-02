import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import vainllaEntry from "./vanilla-js-playground";
import ContentArea from "./components/content-area";
import("./vanilla-js-playground/task-scheduler/index");
import("./vanilla-js-playground/event-delegation/index");
import("./vanilla-js-playground/promise-polly");
import("./vanilla-js-playground/slideshow");

export const MENU = {
  VIDEO_CHAT: "VIDEO_CHAT",
};

function App() {
  useEffect(() => {
    vainllaEntry();
  }, []);

  const [menu, setMenu] = useState(MENU.VIDEO_CHAT);

  useEffect(() => {
    const cb = () => {
      setMenu("");
    };
    document.addEventListener("EventDelegation", cb);
    document.addEventListener("JobsScheduler", cb);
    document.addEventListener("SlideShow", cb);
    document.addEventListener("CustomPromise", cb);
  });

  return (
    <div className="App">
      <div id="header"></div>
      <div id="content">
        <div id="left-menu"></div>
        <div id="content-area"></div>
      </div>{" "}
      <div id="vanilla">
        <div id="vanilla-left-menu">
          <div>Game1</div>
          <div onClick={() => setMenu(MENU.VIDEO_CHAT)}>Omegle Video chat</div>
        </div>
        <div id="v_content-area">
          <ContentArea item={menu} />
        </div>
      </div>
    </div>
  );
}

export default App;

// We will develop a simple box pushing game. Example game https://sokoban.info/

// On a square map of arbitrary size there is a number of boxes and an equivalent amount of spots (flags).
// A character moves boxes by pushing them one position up, down, left or right (no diagonal movement).
// Only a single box can be pushed in one direction, it is impossible to push two boxes in the same direction.
// In order to win the game all boxes must be pushed on flags, when all boxes are placed on top of all flags the game is over.
// It doesn’t matter which box goes on which flag.

// Task - Create a square map of fixed size (hardcoded values). Write a function to move boxes according to the game rules.

// TODO
// foloowing improvements can be done
// 1. Switch statements for direction
// 2. for up and down, for right and left
//        we can extract the logic in util and because the param i+1, is same so we can pass
//        execpt 2 conditinos <0 or === game.length -1, we can pass direction so we handle these 2

// x is wall
// 0 is valid path
// u is user
// b is box
// f is flag

// i and j is current locatio of user
