import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import { EscapeContext } from "./context";
import Main from "./Main";
import CreatePlayers from "./CreatePlayers";
import Game from "./Game";
import LocalPlay from "./LocalPlay";

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
        }}
      >
        <div
          style={{
            // height: "100vh",
            display: "grid",
            gridTemplateRows: "10vh 90vh",
          }}
        >
          <h1 style={{ gridRow: "1" }}>ESCAPE</h1>
          <Router>
            <Main path="/" />
            <LocalPlay path="/local" />
            <CreatePlayers path="/local/players" />
            <Game path="/game" />
          </Router>
        </div>
      </EscapeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
