import React, { FunctionComponent, useEffect } from "react";
import Board from "./Board";
import "./_game.scss";

const Game: FunctionComponent = () => {
  useEffect(() => {
    // const appRoot = document.getElementById("app");

    return () => {
      const ele = document.getElementById("game");
      if (ele) {
        ele!.parentElement!.removeChild(ele);
      }
    };
  }, []);
  return (
    <div id="game" className="game">
      <Board />
    </div>
  );
};

export default Game;
