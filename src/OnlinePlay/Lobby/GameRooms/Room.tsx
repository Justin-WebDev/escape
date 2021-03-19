import { navigate, RouteComponentProps } from "@reach/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { OnlinePlayContext } from "../../OnlinePlayContext";
const Room: FunctionComponent<
  RouteComponentProps<{ roomName: string; index: number }>
> = ({ roomName, index }) => {
  const { socket, username, rooms, currentRoom } = useContext(
    OnlinePlayContext
  );
  const [isFull, setIsFull] = useState<boolean>(false);

  useEffect(() => {
    if (roomName) {
      if (
        rooms[roomName].players >= rooms[roomName].neededAmountOfPlayers &&
        isFull === false
      ) {
        setIsFull(() => true);
      } else if (
        rooms[roomName].players < rooms[roomName].neededAmountOfPlayers &&
        isFull === true
      ) {
        setIsFull(() => false);
      }
    }
  }, [rooms]);

  return roomName ? (
    <div className="room" key={index}>
      <div
        style={{
          gridColumn: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {roomName}
      </div>
      <div
        style={{
          gridColumn: "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >{`${rooms[roomName].boardSize} x ${rooms[roomName].boardSize}`}</div>
      <div
        style={{
          gridColumn: "3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >{`${rooms[roomName].players} / ${rooms[roomName].neededAmountOfPlayers}`}</div>
      <div
        style={{
          gridColumn: "4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rooms[roomName].watchers}
      </div>
      <div
        style={{
          gridColumn: "5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rooms[roomName].status ? "In Progress" : "Not Started"}
      </div>
      <div
        style={{
          gridColumn: "6",
          display: "flex",
          justifyContent: "center",
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
