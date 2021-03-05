import React, { useContext } from "react";
import { OnlinePlayContext } from "../../OnlinePlayContext";
import { OnlineGameContext } from "../OnlineGameContext";

const TurnOrder = () => {
  const { orderForPlayers } = useContext(OnlineGameContext);
  const { onlinePlayers } = useContext(OnlinePlayContext);

  return orderForPlayers.length > 0 ? (
    <div className="turnOrderContainer">
      <div style={{ marginTop: "20px" }}>Turn Order</div>
      <div className="turnOrder" style={{ marginTop: "10px" }}>
        {orderForPlayers
          ? orderForPlayers.map((player: number, index: number) => {
              switch (index) {
                case 0:
                  return (
                    <div
                      style={{ fontSize: "2rem", marginRight: "10px" }}
                    >{`Now: ${onlinePlayers.players[player]}`}</div>
                  );
                case 1:
                  return (
                    <div
                      style={{ fontSize: "1.5rem", marginLeft: "10px" }}
                    >{`Next: ${onlinePlayers.players[player]}`}</div>
                  );
                default:
                  return null;
              }
            })
          : null}
      </div>
    </div>
  ) : null;
};

export default TurnOrder;
