import { RouteComponentProps } from "@reach/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "../../Modal";
import { OnlinePlayContext } from "../OnlinePlayContext";

/**
 * GOING TO MAKE JUST A TEXT INPUT FOR NOW
 *
 * REPLACE WITH LOGIN / SIGN UP AND MAYBE CONTINUE AS GUEST
 */
const Login: FunctionComponent<RouteComponentProps> = () => {
  const { setUsername } = useContext(OnlinePlayContext);
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
            autoComplete="off"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const username = (document.getElementById(
                  "createUsername"
                ) as HTMLFormElement).value;

                setUsername(() => username);
                setShowModal(() => !showModal);
              }
            }}
          />
          <br />
          <button
            onClick={() => {
              const username = (document.getElementById(
                "createUsername"
              ) as HTMLFormElement).value;

              setUsername(() => username);
              setShowModal(() => !showModal);
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
