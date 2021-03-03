import React, { FunctionComponent, useContext } from "react";
import { OnlinePlayContext } from "../../OnlinePlayContext";
import { OnlineGameContext } from "../OnlineGameContext";

const Places: FunctionComponent = () => {
  const { onlinePlayers } = useContext(OnlinePlayContext);
  const { places } = useContext(OnlineGameContext);
  return (
    <div className="placesContainer">
      Places
      <div className="places">
        {places.map((player: number) => (
          <div>{onlinePlayers.players[player]}</div>
        ))}
      </div>
    </div>
  );
};

export default Places;
