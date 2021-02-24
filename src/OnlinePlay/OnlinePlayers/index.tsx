import React, { useContext, useEffect, useState } from "react";
import { OnlinePlayContext } from "../OnlinePlayContext";

const OnlinePlayers = () => {
  const { playerName, onlinePlayers } = useContext(OnlinePlayContext);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: ".25" }}>
      {Object.keys(onlinePlayers).map((player: string) =>
        player === playerName ? (
          <div>{`${player}(you)`}</div>
        ) : (
          <div>{player}</div>
        )
      )}
    </div>
  );
};
export default OnlinePlayers;
