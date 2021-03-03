import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { EscapeContext } from "../../../../../context";
import { OnlinePlayContext } from "../../../../OnlinePlayContext";
import { OnlineGameContext } from "../../../OnlineGameContext";
import { addPlayerBorder } from "./utils/addPlayerBorder";

const Dot: FunctionComponent<{
  x: number;
  y: number;
  availableMoves: { [key: string]: string[] };
}> = ({ x, y, availableMoves }) => {
  const {
    currentPosition,
    setCurrentPosition,
    mostRecentMove,
    orderForPlayers,
    setAvailableMoves,
    color,
  } = useContext(OnlineGameContext);
  const { currentRoom, onlinePlayers } = useContext(OnlinePlayContext);
  const { username, socket } = useContext(EscapeContext);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (mostRecentMove) {
      const { newX, newY } = mostRecentMove;

      if (x === newX && y === newY) {
        if (counter === 2) {
          let newMoves = { ...availableMoves };
          newMoves[`${newX}${newY}`] = [];
          for (const dot in newMoves) {
            newMoves[dot].filter((element) => element !== `${newX}${newY}`);
          }
          setAvailableMoves(newMoves);
        }

        setCounter(counter + 1);
      }
    }
  }, [mostRecentMove]);

  return (
    <div
      id={`${x}${y}`}
      style={{
        gridRow: `${y}`,
        gridColumn: `${x}`,
        backgroundColor: "black",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
      }}
      onClick={() => {
        if (onlinePlayers.players[orderForPlayers[0]] === username) {
          if (!currentPosition && counter < 3) {
            setCurrentPosition([x, y]);
            addPlayerBorder(x, y, color);
          } else if (counter < 3) {
            const [oldX, oldY] = currentPosition;
            if (
              (Math.abs(x - oldX) === 1 &&
                Math.abs(y - oldY) <= 1 &&
                availableMoves[`${oldX}${oldY}`].includes(`${x}${y}`)) ||
              (Math.abs(x - oldX) === 0 &&
                Math.abs(y - oldY) === 1 &&
                availableMoves[`${oldX}${oldY}`].includes(`${x}${y}`))
            ) {
              setCurrentPosition([x, y]);
              socket.emit("playerMoved", {
                newX: x,
                newY: y,
                oldX,
                oldY,
                color,
                currentRoom,
                availableMoves,
                orderForPlayers,
              });
            }
          }
        }
      }}
    ></div>
  );
};

export default Dot;
