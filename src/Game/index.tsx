import { Redirect, RouteComponentProps } from "@reach/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { EscapeContext } from "../context";
import { GameContext } from "./GameContext";
import Board from "./Board";
import "./_game.scss";
import { createAvailableMoves } from "./Board/utils/createAvailableMoves";

const Game: FunctionComponent<RouteComponentProps> = () => {
  const {
    orderForPlayers,
    players,
    boardSize,
    setOrderForPlayers,
  } = useContext(EscapeContext);

  const [availableMoves, setAvailableMoves] = useState<{
    [key: string]: string[];
  }>(createAvailableMoves(boardSize));

  const currentPlayer = players[orderForPlayers[0]];

  useEffect(() => {
    const playerCurrentPosition = players[orderForPlayers[0]].currentPosition;
    if (playerCurrentPosition.length !== 0) {
      if (availableMoves[playerCurrentPosition].length === 0) {
        setOrderForPlayers(orderForPlayers.slice(1));
      }
    }
  }, [orderForPlayers]);

  return players.length > 0 ? (
    players.length > 1 ? (
      <GameContext.Provider
        value={{ currentPlayer, availableMoves, setAvailableMoves }}
      >
        <div id="game" className="game">
          <div id="player-turn">
            <div style={{ color: `${currentPlayer.color}` }}>
              {currentPlayer.name}
            </div>
            <div>
              {orderForPlayers.length > 1
                ? currentPlayer.currentPosition === ""
                  ? "Select Starting Position"
                  : "Move"
                : `${currentPlayer.name} WINS!`}
            </div>
            <hr />
          </div>
          <Board />
        </div>
      </GameContext.Provider>
    ) : (
      <div>{players[orderForPlayers[0]].name} WINS!</div>
    )
  ) : (
    <Redirect to="/" />
  );
};

export default Game;
