import React, { useContext } from "react";
import { OnlinePlayContext } from "../../OnlinePlayContext";

const WaitingForPlayers = () => {
  const { socket, onlinePlayers } = useContext(OnlinePlayContext);

  socket.on(
    "choseColor",
    ({ username, color }: { username: string; color: string }) => {
      document.getElementById(`${username}`)!.style.color = color;
    }
  );

  socket.on("allColors", (playersAndColors: { [key: string]: string }) => {
    for (const [username, color] of Object.entries(playersAndColors)) {
      document.getElementById(`${username}`)!.style.color = color;
    }
  });

  return (
    <div className="waitingForPlayersContainer">
      <ol className="waitingPlayers">
        {onlinePlayers.players.map((player: string) => (
          <li id={`${player}`}>{player}</li>
        ))}
      </ol>
    </div>
  );
};

export default WaitingForPlayers;
