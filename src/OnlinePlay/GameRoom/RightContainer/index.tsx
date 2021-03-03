import React, { FunctionComponent, useContext } from "react";
import Game from "./Game";
import { OnlineGameContext } from "../OnlineGameContext";
import WaitingForPlayers from "./WaitingForPlayers";

const RightContainer: FunctionComponent = () => {
  const { isGameReady, orderForPlayers, availableMoves } = useContext(
    OnlineGameContext
  );
  return (
    <div className="rightContainer">
      {isGameReady && orderForPlayers && availableMoves ? (
        <Game />
      ) : (
        <WaitingForPlayers />
      )}
    </div>
  );
};

export default RightContainer;
