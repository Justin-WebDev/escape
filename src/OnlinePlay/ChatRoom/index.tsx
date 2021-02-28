import React, { useContext } from "react";
import { EscapeContext } from "../../context";
import { OnlinePlayContext } from "../OnlinePlayContext";
import OnlinePlayers from "./OnlinePlayers";
import "./_chatRoom.scss";

const ChatRoom = () => {
  const { messages, color, currentRoom } = useContext(OnlinePlayContext);
  const { socket, username } = useContext(EscapeContext);

  return (
    <div className="chatRoomContainer">
      <OnlinePlayers />
      <div className="chatContainer">
        <div className="chat">
          {messages.map(
            ({ name, message }: { name: string; message: string }) => {
              return username === name ? (
                <div style={{ color }}>{`${name}: ${message}`}</div>
              ) : name === "Jailer" ? (
                <div style={{ color: "red" }}>{`${name}: ${message}`}</div>
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
