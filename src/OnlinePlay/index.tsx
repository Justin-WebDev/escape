import { Redirect, RouteComponentProps, Router } from "@reach/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import ChatRoom from "./ChatRoom";
import { OnlinePlayContext } from "./OnlinePlayContext";
import { EscapeContext } from "../context";

import "./_onlinePlay.scss";
import Lobby from "./Lobby";
import GameRoom from "./GameRoom";

const color = "blue";

const OnlinePlay: FunctionComponent<RouteComponentProps> = () => {
  const { socket, username } = useContext(EscapeContext);
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
  const [messages, setMessages] = useState<{ name: string; message: string }[]>(
    []
  );
  const [onlinePlayers, setOnlinePlayers] = useState<{
    players: string[];
    watchers: string[];
  } | null>(null);

  useEffect(() => {
    socket.on(
      "updateLobby",
      ({
        allRooms,
        usersInRoom,
      }: {
        allRooms: { [key: string]: any };
        usersInRoom: { players: string[]; watchers: string[] };
      }) => {
        setRooms(allRooms);
        setOnlinePlayers(usersInRoom);
      }
    );
    socket.on("changeRoom", (room: string) => setCurrentRoom(room));

    socket.on(
      "updateRoom",
      (usersInRoom: { players: string[]; watchers: string[] }) => {
        setOnlinePlayers(usersInRoom);
      }
    );

    socket.on(
      "message",
      ({ name, message }: { name: string; message: string }) => {
        setMessages([...messages, { name, message }]);
      }
    );
  });

  return (
    <OnlinePlayContext.Provider
      value={{
        rooms,
        setRooms,
        messages,
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
            <GameRoom path=":id" />
          </Router>
          <ChatRoom />
        </div>
      ) : (
        <div>
          <Redirect to="../login" />
        </div>
      )}
    </OnlinePlayContext.Provider>
  );
};

export default OnlinePlay;
