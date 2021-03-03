import React, { useContext } from "react";
import { EscapeContext } from "../../../context";
import { OnlinePlayContext } from "../../OnlinePlayContext";

const OnlinePlayers = () => {
  const { username } = useContext(EscapeContext);
  const { onlinePlayers, color, currentRoom } = useContext(OnlinePlayContext);
  return onlinePlayers ? (
    <div className="onlinePlayersContainer">
      <div
        style={{
          textAlign: "center",
          borderBottom: "1px solid black",
          marginBottom: "5px",
        }}
      >
        {currentRoom}
      </div>
      {currentRoom === "lobby"
        ? onlinePlayers.watchers.map((player: string) =>
            player === username ? (
              <div style={{ color }}>{`${player}`}</div>
            ) : (
              <div>{player}</div>
            )
          )
        : Object.keys(onlinePlayers).map((key) => {
            return onlinePlayers[key].map((player: string) =>
              player === username ? (
                <div style={{ color }}>{`${player}`}</div>
              ) : (
                <div>{player}</div>
              )
            );
          })}
    </div>
  ) : null;
};

export default OnlinePlayers;
