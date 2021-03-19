import React, { useContext, useState } from "react";
import Modal from "../../Modal";
import { OnlinePlayContext } from "../OnlinePlayContext";
import { OnlineGameContext } from "./OnlineGameContext";

const ChooseColor = () => {
  const { setColor } = useContext(OnlineGameContext);
  const { socket, username, currentRoom } = useContext(OnlinePlayContext);
  const [showModal, setShowModal] = useState(true);

  return showModal ? (
    <Modal>
      <fieldset>
        <legend>Choose Color</legend>
        <div>{`Please select your color, ${username}!`}</div>
        <br />
        <br />
        <input
          type="color"
          id="color"
          style={{ width: "100px", height: "100px" }}
        />
        <br />
        <br />
        <button
          onClick={() => {
            const color = (document.getElementById("color") as HTMLFormElement)
              .value;
            setColor(() => color);
            setShowModal(() => !showModal);
            socket.emit("ready", { color, currentRoom, username });
          }}
        >
          Join Table
        </button>
      </fieldset>
    </Modal>
  ) : null;
};

export default ChooseColor;
