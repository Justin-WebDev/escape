import { navigate } from "@reach/router";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";
import { OnlinePlayContext } from "../OnlinePlayContext";
import Modal from "../../Modal";

const CreateNewRoomModal: FunctionComponent<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
}> = ({ setShowModal, showModal }) => {
  const { socket, username, currentRoom, setCurrentRoom } = useContext(
    OnlinePlayContext
  );
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl!.current!.focus();
  }, []);

  return (
    <Modal>
      <fieldset>
        <legend>Create Room ＋</legend>
        <label>
          Room Name:
          <br />
          <input type="text" id="roomName" ref={inputEl} autoComplete="off" />
        </label>
        <br />
        <label>
          # of Players:
          <br />
          <input type="number" id="numberOfPlayers" autoComplete="off" />
        </label>
        <br />
        <label>
          Board Size:
          <br />
          <input type="number" id="boardSize" autoComplete="off" />
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
  );
};

export default CreateNewRoomModal;
