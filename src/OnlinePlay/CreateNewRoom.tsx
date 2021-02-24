import React, { FunctionComponent, useContext, useState } from "react";
import Modal from "../Modal";
// import useRoom from "./Room";
import { OnlinePlayContext } from "./OnlinePlayContext";

const CreateNewRoom: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const { rooms, setRooms, playerName, socket } = useContext(OnlinePlayContext);
  return (
    <div style={{ gridRow: "1" }}>
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
                const roomName = (document.querySelector(
                  "#roomName"
                ) as HTMLInputElement)!.value;

                socket.emit("create room", {
                  [roomName]: {
                    roomName,
                    players: [playerName],
                    neededAmountOfPlayers: 4,
                    status: false,
                  },
                });

                setShowModal(!showModal);
              }}
            >
              create room
            </button>
            <button onClick={() => setShowModal(!showModal)}>cancel</button>
          </fieldset>
        </Modal>
      ) : null}
    </div>
  );
};

export default CreateNewRoom;
