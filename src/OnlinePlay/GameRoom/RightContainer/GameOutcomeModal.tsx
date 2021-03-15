import { navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { EscapeContext } from "../../../context";
import Modal from "../../../Modal";
import { OnlinePlayContext } from "../../OnlinePlayContext";
import { OnlineGameContext } from "../OnlineGameContext";

const GameOutcomeModal = () => {
  const { socket, username } = useContext(EscapeContext);
  const { onlinePlayers, currentRoom } = useContext(OnlinePlayContext);
  const {
    places,
    color,
    setIsGameReady,
    setCurrentPosition,
    setMostRecentMove,
  } = useContext(OnlineGameContext);
  const [showModal, setShowModal] = useState(true);

  // useEffect(() => {
  //   setIsGameReady(false);
  //   setCurrentPosition([]);
  //   setMostRecentMove(null);
  //   socket.emit("gameEnded", currentRoom);
  // }, []);

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
          {/* <button
            style={{ marginRight: "10px" }}
            onClick={() => {
              socket.emit("ready", { color, currentRoom, username });
              setShowModal(!showModal);
            }}
          >
            Rematch
          </button> */}
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
