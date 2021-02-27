import { Link, navigate, RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext } from "react";
import { EscapeContext } from "../../../context";
import { OnlinePlayContext } from "../../OnlinePlayContext";
const Room: FunctionComponent<
  RouteComponentProps<{ roomName: string; index: number }>
> = ({ roomName, index }) => {
  const { rooms } = useContext(OnlinePlayContext);
  const { socket, playerName } = useContext(EscapeContext);

  return roomName ? (
    <div
      className="room"
      key={index}
      onClick={() => {
        socket.emit("joinRoom", { username: playerName, roomName });
        navigate(`/online/${roomName}`);
      }}
    >
      <div>{roomName}</div>
      <div>
        <div>{`Board Size: ${rooms[roomName].boardSize} x ${rooms[roomName].boardSize}`}</div>
        <div>{`Players: ${rooms[roomName].users} / ${rooms[roomName].neededAmountOfPlayers}`}</div>
        <div>
          {rooms[roomName].status ? "Game in Progress" : "Game Not Started"}
        </div>
      </div>
    </div>
  ) : null;
};

export default Room;
