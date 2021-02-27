import React, { useContext, useEffect, useState } from "react";
import { EscapeContext } from "../../../context";
import { OnlinePlayContext } from "../../OnlinePlayContext";

const OnlinePlayers = () => {
  const { onlinePlayers, color } = useContext(OnlinePlayContext);
  const { playerName } = useContext(EscapeContext);

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
