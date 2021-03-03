import { navigate, RouteComponentProps } from "@reach/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl!.current!.focus();
  }, []);

  return (
    <div>
      {showModal ? (
        <Modal>
          <input
            type="text"
            ref={inputEl}
            placeholder="Enter Display Name..."
            id="createUsername"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
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
              }
            }}
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
