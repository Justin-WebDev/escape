import React from "react";
import { Router } from "@reach/router";
import Main from "./Main";
import OnlinePlay from "./OnlinePlay";

const App = () => (
  <React.StrictMode>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "5rem",
        // fontWeight: "bold",
        backgroundColor: "#77b28c",
        color: "#157A6E",
        // color: "#499F68",
        // boxShadow: "0 0 5px black",
        textShadow: "0 5px 5px black",
        opacity: ".8",
      }}
    >
      ESCAPE
    </div>
    <Router style={{ flex: "1" }}>
      <Main path="/" />
      <OnlinePlay path="online/*" />
      {/* <LocalPlay path="local" />
            <CreatePlayers path="local/players" />
            <Game path="game" /> */}
    </Router>
  </React.StrictMode>
);

export default App;
