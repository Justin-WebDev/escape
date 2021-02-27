import { navigate, RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext, useState } from "react";
import { EscapeContext } from "../../context";
import Modal from "../../Modal";

/**
 * GOING TO MAKE JUST A TEXT INPUT FOR NOW
 *
 * REPLACE WITH LOGIN / SIGN UP AND MAYBE CONTINUE AS GUEST
 */
const Login: FunctionComponent<RouteComponentProps> = () => {
  const { socket, setPlayerName } = useContext(EscapeContext);
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
              navigate("../online");
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
