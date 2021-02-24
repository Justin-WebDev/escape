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
            ({
              roomName,
              userName,
              message,
            }: {
              roomName: string;
              userName: string;
              message: string;
            }) => {
              return userName === playerName ? (
                <div style={{ color }}>{`${userName}: ${message}`}</div>
              ) : userName === "Jailer" ? (
                <div style={{ color: "red" }}>{`${userName}: ${message}`}</div>
              ) : (
                <div>{`${userName}: ${message}`}</div>
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
              socket.emit("send message", {
                roomName: "roomName",
                userName: playerName,
                message: message.value,
              });
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
