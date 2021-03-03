import React, { useContext } from "react";
import { OnlinePlayContext } from "../../OnlinePlayContext";
import { OnlineGameContext } from "../OnlineGameContext";

const TurnOrder = () => {
  const { orderForPlayers } = useContext(OnlineGameContext);
  const { onlinePlayers } = useContext(OnlinePlayContext);

  return (
    <div className="turnOrderContainer">
      Turn Order
      <div className="turnOrder">
        {orderForPlayers
          ? orderForPlayers.map((player: number, index: number) => {
              switch (index) {
                case 0:
                  return <div>{`Now: ${onlinePlayers.players[player]}`}</div>;
                case 1:
                  return <div>{`Next: ${onlinePlayers.players[player]}`}</div>;
                default:
                  return <div>{`${onlinePlayers.players[player]}`}</div>;
              }
            })
          : null}
      </div>
    </div>
  );
};

export default TurnOrder;
