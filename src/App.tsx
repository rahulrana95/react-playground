import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import vainllaEntry from "./vanilla-js-playground";
import("./vanilla-js-playground/task-scheduler/index");
import("./vanilla-js-playground/event-delegation/index");

function App() {
  useEffect(() => {
    vainllaEntry();
  }, []);

  return (
    <div className="App">
      <div id="header"></div>
      <div id="content">
        <div id="left-menu"></div>
        <div id="content-area"></div>
      </div>{" "}
      <div id="vanilla">
        <div id="vanilla-left-menu"></div>
        <div id="v_content-area"></div>
      </div>
    </div>
  );
}

export default App;
