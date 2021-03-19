import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { OnlinePlayContext } from "../OnlinePlayContext";
import GameRooms from "./GameRooms";

const Lobby: FunctionComponent<RouteComponentProps> = () => {
  const {
    socket,
    username,
    currentRoom,
    setRooms,
    setOnlinePlayers,
  } = useContext(OnlinePlayContext);

  useEffect(() => {
    socket.emit("joinRoom", {
      username,
      oldRoom: currentRoom,
      newRoom: "lobby",
    });
  }, []);

  return (
    <div className="onlineGameAreaContainer">
      <GameRooms />
    </div>
  );
};

export default Lobby;
