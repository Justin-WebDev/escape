import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import CreateNewRoom from "./CreateNewRoom";
import Login from "./Login";
import { OnlinePlayContext } from "./OnlinePlayContext";
import { socket } from "./webSocket";
import "./_onlinePlay.scss";

// useEffect(() => {
// socket.on("create room", (msg: string) => {
//   setRooms(Object.assign({}, rooms, msg));
// });

const color = "blue";

const OnlinePlay: FunctionComponent<RouteComponentProps> = () => {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [rooms, setRooms] = useState<any>({});
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [onlinePlayers, setOnlinePlayers] = useState<{
    [key: string]: boolean;
  }>({});

  socket.on("roomUsers", (allUsers: { [key: string]: boolean }) => {
    setOnlinePlayers(allUsers);
  });

  socket.on(
    "message",
    ({ username, message }: { username: string; message: string }) => {
      setMessages([...messages, { username, message }]);
    }
  );

  // socket.on(
  //   "player disconnect",
  //   ({
  //     roomName,
  //     userName,
  //     message,
  //     playerThatLeft,
  //   }: {
  //     roomName: string;
  //     userName: string;
  //     message: string;
  //     playerThatLeft: string;
  //   }) => {
  //     delete onlinePlayers[playerThatLeft];
  //     setOnlinePlayers(onlinePlayers);
  //     setMessages([...messages, { roomName, userName, message }]);
  //   }
  // );

  return (
    <OnlinePlayContext.Provider
      value={{
        rooms,
        setRooms,
        playerName,
        setPlayerName,
        socket,
        messages,
        onlinePlayers,
        color,
      }}
    >
      {playerName ? (
        <div className="onlinePlayContainer">
          <CreateNewRoom />
          <div className="roomsContainer">
            {Object.keys(rooms).map((roomName, index) => {
              return (
                <div className="room" key={index}>
                  <div>{roomName}</div>
                  <div>
                    <div>{`Players: ${rooms[roomName].players.length} / ${rooms[roomName].neededAmountOfPlayers}`}</div>
                    <div>
                      {status ? "Game in Progress" : "Game Not Started"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatRoom />
        </div>
      ) : (
        <Login />
      )}
    </OnlinePlayContext.Provider>
  );
};

export default OnlinePlay;
