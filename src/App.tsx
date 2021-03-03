import React, { useState } from "react";
import { Router } from "@reach/router";
import { EscapeContext } from "./context";
import Main from "./Main";
import OnlinePlay from "./OnlinePlay";
import Login from "./OnlinePlay/Login";
import { socket } from "./webSocket";

const App = () => {
  const [username, setUsername] = useState<string | null>(null); // set back to null

  return (
    <React.StrictMode>
      <EscapeContext.Provider
        value={{
          socket,
          username,
          setUsername,
        }}
      >
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
          <Login path="login" />
          <OnlinePlay path="online/*" />
          {/* <LocalPlay path="local" />
            <CreatePlayers path="local/players" />
            <Game path="game" /> */}
        </Router>
      </EscapeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
