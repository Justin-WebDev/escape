import React, { useContext, useEffect, useState } from "react";
import { OnlinePlayContext } from "../OnlinePlayContext";

const OnlinePlayers = () => {
  const { playerName, onlinePlayers, color } = useContext(OnlinePlayContext);

  return (
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
      {Object.keys(onlinePlayers).map((player: string) =>
        player === playerName ? (
          <div style={{ color }}>{`${player} (you)`}</div>
        ) : (
          <div>{player}</div>
        )
      )}
    </div>
  );
};
export default OnlinePlayers;
