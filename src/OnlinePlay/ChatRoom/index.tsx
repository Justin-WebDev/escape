import React, { useContext, useEffect, useState } from "react";
import { OnlinePlayContext } from "../OnlinePlayContext";
import OnlinePlayers from "./OnlinePlayers";
import "./_chatRoom.scss";

const ChatRoom = () => {
  const { socket, username, color, currentRoom } = useContext(
    OnlinePlayContext
  );

  const [messages, setMessages] = useState<{ name: string; message: string }[]>(
    []
  );

  socket.on(
    "message",
    ({ name, message }: { name: string; message: string }) => {
      setMessages(() => [...messages, { name, message }]);
    }
  );

  return (
    <div className="chatRoomContainer">
      <div className="chatContainer">
        <div className="chat">
          {messages.map(
            ({ name, message }: { name: string; message: string }) => {
              return username === name ? (
                <div style={{ color }}>{`${name}: ${message}`}</div>
              ) : name === "Jailer" ? (
                <div style={{ color: "red", textAlign: "center" }}>
                  <i>{message}</i>
                </div>
              ) : (
                <div>{`${name}: ${message}`}</div>
              );
            }
          )}
        </div>
        <div style={{ display: "flex", margin: "0 10px 10px 10px" }}>
          <input
            type="text"
            id="messageInput"
            placeholder="Enter message..."
            style={{ flex: "1" }}
            autoComplete="off"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const message = document.getElementById(
                  "messageInput"
                ) as HTMLFormElement;
                socket.emit("message", {
                  username,
                  message: message.value,
                  currentRoom,
                });
                message.value = "";
                message.focus();
              }
            }}
          />
          <button
            onClick={() => {
              const message = document.getElementById(
                "messageInput"
              ) as HTMLFormElement;
              socket.emit("message", {
                username,
                message: message.value,
                currentRoom,
              });
              message.value = "";
              message.focus();
            }}
          >
            Send
          </button>
        </div>
      </div>
      <OnlinePlayers />
    </div>
  );
};

export default ChatRoom;
