import { Redirect, RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext } from "react";
import { EscapeContext } from "../context";
import { GameContext } from "./GameContext";
import Board from "./Board";
import "./_game.scss";

const Game: FunctionComponent<RouteComponentProps> = () => {
  const { orderForPlayers, players } = useContext(EscapeContext);
  const currentPlayer = players[orderForPlayers[0]];
  return players.length > 0 ? (
    <GameContext.Provider value={{ currentPlayer }}>
      <div className="game">
        <div id="player-turn">
          <div style={{ color: `${currentPlayer.color}` }}>
            {currentPlayer.name}
          </div>
          <div>
            {currentPlayer.currentPosition === ""
              ? "Select Starting Position"
              : "Move"}
          </div>
        </div>
        <Board />
      </div>
    </GameContext.Provider>
  ) : (
    <Redirect to="/" />
  );
};

export default Game;
