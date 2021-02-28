import { Link, navigate, RouteComponentProps } from "@reach/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { EscapeContext } from "../../../context";
import { OnlinePlayContext } from "../../OnlinePlayContext";
const Room: FunctionComponent<
  RouteComponentProps<{ roomName: string; index: number }>
> = ({ roomName, index }) => {
  const { rooms, currentRoom } = useContext(OnlinePlayContext);
  const { socket, username } = useContext(EscapeContext);
  const [isFull, setIsFull] = useState<boolean>(false);

  useEffect(() => {
    if (roomName) {
      if (
        rooms[roomName].players >= rooms[roomName].neededAmountOfPlayers &&
        isFull === false
      ) {
        setIsFull(true);
      } else if (
        rooms[roomName].players < rooms[roomName].neededAmountOfPlayers &&
        isFull === true
      ) {
        setIsFull(false);
      }
    }
  }, [rooms]);

  return roomName ? (
    <div className="room" key={index}>
      <div style={{ gridColumn: "1", textAlign: "center" }}>{roomName}</div>
      <div
        style={{ gridColumn: "2", textAlign: "center" }}
      >{`${rooms[roomName].boardSize} x ${rooms[roomName].boardSize}`}</div>
      <div
        style={{ gridColumn: "3", textAlign: "center" }}
      >{`${rooms[roomName].players} / ${rooms[roomName].neededAmountOfPlayers}`}</div>
      <div style={{ gridColumn: "4", textAlign: "center" }}>
        {rooms[roomName].watchers}
      </div>
      <div style={{ gridColumn: "5", textAlign: "center" }}>
        {rooms[roomName].status ? "Game in Progress" : "Game Not Started"}
      </div>
      <div
        style={{
          gridColumn: "6",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <button
          onClick={() => {
            socket.emit("joinRoom", {
              username,
              oldRoom: currentRoom,
              newRoom: roomName,
              role: "players",
            });
            // setCurrentRoom(roomName);
            navigate(`/online/${roomName}`);
          }}
          disabled={isFull}
        >
          Play
        </button>
        <button
          onClick={() => {
            socket.emit("joinRoom", {
              username,
              oldRoom: currentRoom,
              newRoom: roomName,
              role: "watchers",
            });
            navigate(`/online/${roomName}`);
          }}
        >
          Watch
        </button>
      </div>
    </div>
  ) : null;
};

export default Room;
