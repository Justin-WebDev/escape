import React, { FunctionComponent, useContext, useState } from "react";
import Modal from "../../Modal";
import { OnlinePlayContext } from "../OnlinePlayContext";

/**
 * GOING TO MAKE JUST A TEXT INPUT FOR NOW
 *
 * REPLACE WITH LOGIN / SIGN UP AND MAYBE CONTINUE AS GUEST
 */
const Login: FunctionComponent = () => {
  const { setPlayerName, socket } = useContext(OnlinePlayContext);
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {showModal ? (
        <Modal>
          <input
            type="text"
            placeholder="Enter Display Name..."
            id="createPlayerName"
          />
          <br />
          <button
            onClick={() => {
              const playerName = (document.getElementById(
                "createPlayerName"
              ) as HTMLFormElement).value;

              setPlayerName(playerName);
              setShowModal(!showModal);

              socket.emit("joinRoom", {
                username: playerName,
                roomName: "lobby",
              });
            }}
          >
            Submit
          </button>
        </Modal>
      ) : null}
    </div>
  );
};
export default Login;
