import React, { useContext, useState } from "react";
import { EscapeContext } from "../../context";
import Modal from "../../Modal";
import { OnlinePlayContext } from "../OnlinePlayContext";
import { OnlineGameContext } from "./OnlineGameContext";

const ChooseColor = () => {
  const { username, socket } = useContext(EscapeContext);
  const { setColor } = useContext(OnlineGameContext);
  const { currentRoom } = useContext(OnlinePlayContext);
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
            setColor(color);
            setShowModal(!showModal);
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
