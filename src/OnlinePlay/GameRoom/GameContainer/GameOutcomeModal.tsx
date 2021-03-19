import { navigate } from "@reach/router";
import React, { useContext, useState } from "react";
import Modal from "../../../Modal";
import { OnlinePlayContext } from "../../OnlinePlayContext";
import { OnlineGameContext } from "../OnlineGameContext";

const GameOutcomeModal = () => {
  const { socket, username, onlinePlayers, currentRoom } = useContext(
    OnlinePlayContext
  );
  const { places } = useContext(OnlineGameContext);
  const [showModal, setShowModal] = useState(true);

  return showModal ? (
    <Modal>
      <div
        className="gameOutcomeContainer"
        style={{
          display: "flex",
          // justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>Places:</h1>
        <ol>
          {places.map((player: number) => (
            <li>{onlinePlayers.players[player]}</li>
          ))}
        </ol>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "15px",
          }}
        >
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              socket.emit("joinRoom", {
                username,
                oldRoom: currentRoom,
                newRoom: "lobby",
                role: "watchers",
              });
              navigate("../online");
              setShowModal(!showModal);
            }}
          >
            Leave Room
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default GameOutcomeModal;
