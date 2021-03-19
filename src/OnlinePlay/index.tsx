import { RouteComponentProps, Router } from "@reach/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatRoom from "./ChatRoom";
import { OnlinePlayContext } from "./OnlinePlayContext";
import "./_onlinePlay.scss";
import Lobby from "./Lobby";
import OnlineGame from "./GameRoom";
import Login from "./Login";

const color = "blue";

const OnlinePlay: FunctionComponent<RouteComponentProps> = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);

  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  const [rooms, setRooms] = useState<{
    [key: string]: {
      players: number;
      watchers: number;
      boardSize: number;
      neededAmountOfPlayers: string;
      status: boolean;
    };
  }>({});

  const [onlinePlayers, setOnlinePlayers] = useState<{
    players: string[];
    watchers: string[];
  }>({ players: [], watchers: [] });

  useEffect(() => {
    if (!socket) {
      setSocket(() => io());
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(
        "updateLobby",
        ({
          allRooms,
          usersInRoom,
        }: {
          allRooms: { [key: string]: any };
          usersInRoom: { players: string[]; watchers: string[] };
        }) => {
          setRooms(() => allRooms);
          setOnlinePlayers(() => usersInRoom);
        }
      );

      socket.on("changeRoom", (room: string) => setCurrentRoom(() => room));

      socket.on(
        "updateRoom",
        (usersInRoom: { players: string[]; watchers: string[] }) => {
          setOnlinePlayers(() => usersInRoom);
        }
      );
    }

    // return () => {
    //   socket.removeAllListeners("updateLobby");
    // };
  }, [socket]);

  return (
    <OnlinePlayContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        setRooms,
        onlinePlayers,
        color,
        currentRoom,
        setCurrentRoom,
      }}
    >
      {username ? (
        <div className="onlinePlayContainer">
          <Router>
            <Lobby path="/" />
            <OnlineGame path=":id" />
          </Router>
          <ChatRoom />
        </div>
      ) : (
        <Login path="/login" />
      )}
    </OnlinePlayContext.Provider>
  );
};

export default OnlinePlay;
