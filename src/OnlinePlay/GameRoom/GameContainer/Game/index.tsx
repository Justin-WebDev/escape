import React, { FunctionComponent } from "react";
import Board from "./Board";
import "./_game.scss";

const Game: FunctionComponent = () => {
  return (
    <div id="game" className="game">
      <Board />
    </div>
  );
};

export default Game;
