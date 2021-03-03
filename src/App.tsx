import React, { useState } from "react";
import { Router } from "@reach/router";
import { EscapeContext } from "./context";
import Main from "./Main";
import OnlinePlay from "./OnlinePlay";
import Login from "./OnlinePlay/Login";
import { socket } from "./webSocket";

const App = () => {
  const [username, setUsername] = useState<string | null>(null);

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
            display: "grid",
            gridTemplateRows: "10vh 90vh",
          }}
        >
          <div
            style={{
              height: "100%",
              gridRow: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              fontSize: "5rem",
              fontWeight: "bold",
            }}
          >
            ESCAPE
          </div>
          <Router>
            <Main path="/" />
            <Login path="login" />
            <OnlinePlay path="online/*" />
            {/* <LocalPlay path="local" />
            <CreatePlayers path="local/players" />
            <Game path="game" /> */}
          </Router>
        </div>
      </EscapeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
