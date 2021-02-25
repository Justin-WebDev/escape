import React, { useContext, useEffect, useState } from "react";
import { OnlinePlayContext } from "../OnlinePlayContext";
import OnlinePlayers from "../OnlinePlayers";
import "./_chatRoom.scss";

const ChatRoom = () => {
  const { socket, playerName, messages, color } = useContext(OnlinePlayContext);

  return (
    <div className="chatRoomContainer">
      <OnlinePlayers />
      <div className="chatContainer">
        <div className="chat">
          {messages.map(
            ({ username, message }: { username: string; message: string }) => {
              return username === playerName ? (
                <div style={{ color }}>{`${username}: ${message}`}</div>
              ) : username === "Jailer" ? (
                <div style={{ color: "red" }}>{`${username}: ${message}`}</div>
              ) : (
                <div>{`${username}: ${message}`}</div>
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
          />
          <button
            onClick={() => {
              const message = document.getElementById(
                "messageInput"
              ) as HTMLFormElement;
              socket.emit("message", message.value);
              message.value = "";
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
