import React, { FunctionComponent, useContext } from "react";
import Game from "./Game";
import { OnlineGameContext } from "../OnlineGameContext";
import WaitingForPlayers from "./WaitingForPlayers";
import GameOutcomeModal from "./GameOutcomeModal";
import { OnlinePlayContext } from "../../OnlinePlayContext";

const RightContainer: FunctionComponent = () => {
  const { isGameReady, orderForPlayers, availableMoves, places } = useContext(
    OnlineGameContext
  );
  const { onlinePlayers } = useContext(OnlinePlayContext);
  return (
    <div className="rightContainer">
      {orderForPlayers &&
      orderForPlayers.length === 0 &&
      places.length !== 0 ? (
        <GameOutcomeModal />
      ) : null}
      {isGameReady && orderForPlayers && availableMoves ? (
        <Game />
      ) : (
        <WaitingForPlayers />
      )}
    </div>
  );
};

export default RightContainer;
