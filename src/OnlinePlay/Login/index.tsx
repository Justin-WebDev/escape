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
  const { socket, setUsername } = useContext(EscapeContext);
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {showModal ? (
        <Modal>
          <input
            type="text"
            placeholder="Enter Display Name..."
            id="createUsername"
          />
          <br />
          <button
            onClick={() => {
              const username = (document.getElementById(
                "createUsername"
              ) as HTMLFormElement).value;

              setUsername(username);
              setShowModal(!showModal);

              socket.emit("joinRoom", {
                username,
                newRoom: "lobby",
              });
              navigate("/online");
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
