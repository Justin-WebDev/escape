import React, { useContext } from "react";
import { EscapeContext } from "../../../context";
import { OnlinePlayContext } from "../../OnlinePlayContext";

const OnlinePlayers = () => {
  const { username } = useContext(EscapeContext);
  const { onlinePlayers, color, currentRoom } = useContext(OnlinePlayContext);
  return onlinePlayers ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: ".25",
        padding: "10px",
        boxShadow: "inset 0 0 10px 0 black",
        margin: "10px",
        backgroundColor: "#e9e9e9",
        overflowY: "scroll",
      }}
    >
      {currentRoom === "lobby"
        ? onlinePlayers.watchers.map((player: string) =>
            player === username ? (
              <div style={{ color }}>{`${player} (you)`}</div>
            ) : (
              <div>{player}</div>
            )
          )
        : Object.keys(onlinePlayers).map((key) => {
            return (
              <div>
                <div>{key}</div>
                {onlinePlayers[key].map((player: string) =>
                  player === username ? (
                    <div style={{ color }}>{`${player} (you)`}</div>
                  ) : (
                    <div>{player}</div>
                  )
                )}
              </div>
            );
          })}
    </div>
  ) : null;
};

export default OnlinePlayers;
