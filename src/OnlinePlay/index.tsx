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
  const { socket, playerName } = useContext(EscapeContext);

  const [rooms, setRooms] = useState<{
    [key: string]: {
      users: number;
      neededAmountOfPlayers: string;
      status: boolean;
    };
  }>({});
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [onlinePlayers, setOnlinePlayers] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    socket.on(
      "newRoom",
      ({
        message: { username, message },
        allRooms,
        users,
      }: {
        message: { username: string; message: string };
        allRooms: { [key: string]: any };
        users: { [key: string]: boolean };
      }) => {
        setOnlinePlayers(users);
        setMessages([...messages, { username, message }]);
        setRooms(allRooms);
      }
    );

    socket.on("roomUsers", (allUsers: { [key: string]: boolean }) => {
      setOnlinePlayers(allUsers);
    });

    socket.on(
      "message",
      ({ username, message }: { username: string; message: string }) => {
        setMessages([...messages, { username, message }]);
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
      }}
    >
      {playerName ? (
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
