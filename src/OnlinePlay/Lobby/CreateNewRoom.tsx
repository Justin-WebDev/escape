import { navigate } from "@reach/router";
import React, { FunctionComponent, useContext, useState } from "react";
import { EscapeContext } from "../../context";
import Modal from "../../Modal";
import { OnlinePlayContext } from "../OnlinePlayContext";

const CreateNewRoom: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const { socket, username } = useContext(EscapeContext);
  const { currentRoom, setCurrentRoom } = useContext(OnlinePlayContext);
  return (
    <>
      <button
        className="createRoomButton"
        onClick={() => setShowModal(!showModal)}
      >{`New \n Room`}</button>
      {showModal ? (
        <Modal>
          <fieldset>
            <legend>Create Room ＋</legend>
            <label>
              Room Name:
              <br />
              <input type="text" id="roomName" />
            </label>
            <br />
            <label>
              # of Players:
              <br />
              <input type="number" id="numberOfPlayers" />
            </label>
            <br />
            <label>
              Board Size:
              <br />
              <input type="number" id="boardSize" />
            </label>
            <br />
            <br />
            <button
              onClick={() => {
                const newRoom = (document.getElementById(
                  "roomName"
                ) as HTMLInputElement)!.value;

                const neededAmountOfPlayers = (document.getElementById(
                  "numberOfPlayers"
                ) as HTMLInputElement)!.value;

                const boardSize = (document.getElementById(
                  "boardSize"
                ) as HTMLInputElement)!.value;

                socket.emit("createRoom", {
                  username,
                  currentRoom,
                  newRoom,
                  role: "players",
                  neededAmountOfPlayers,
                  boardSize,
                });
                setCurrentRoom(newRoom);
                setShowModal(!showModal);
                navigate(`/online/${newRoom}`);
              }}
            >
              create room
            </button>
            <button onClick={() => setShowModal(!showModal)}>cancel</button>
          </fieldset>
        </Modal>
      ) : null}
    </>
  );
};

export default CreateNewRoom;
