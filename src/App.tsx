import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import { EscapeContext } from "./context";
import Main from "./Main";
import CreatePlayers from "./CreatePlayers";
import Game from "./Game";
import LocalPlay from "./LocalPlay";
import OnlinePlay from "./OnlinePlay";
import Login from "./OnlinePlay/Login";
import { socket } from "./webSocket";

interface IPlayerState {
  name: string;
  color: string;
  currentPosition: string;
}

const App = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [players, setPlayers] = useState<IPlayerState[]>([]);
  const [orderForPlayers, setOrderForPlayers] = useState<number[]>([]);
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    if (numberOfPlayers > 0) {
      let arr = [...Array(numberOfPlayers).keys()];
      let newArr = [];
      let count = numberOfPlayers - 1;
      while (count >= 0) {
        newArr.push(...arr.splice(Math.floor(Math.random() * count), 1));
        count--;
      }
      setOrderForPlayers(newArr);
    }
  }, [numberOfPlayers]);

  return (
    <React.StrictMode>
      <EscapeContext.Provider
        value={{
          boardSize,
          numberOfPlayers,
          setNumberOfPlayers,
          setBoardSize,
          players,
          setPlayers,
          orderForPlayers,
          setOrderForPlayers,
          socket,
          playerName,
          setPlayerName,
        }}
      >
        <div
          style={{
            // height: "100vh",
            display: "grid",
            gridTemplateRows: "10vh 90vh",
          }}
        >
          <div
            style={{
              height: "100%",
              gridRow: "1",
              display: "flex",
              placeContent: "center",
              fontSize: "5em",
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
