import React, { FunctionComponent, useContext, useState } from "react";
import { EscapeContext } from "../../context";
import { GameContext } from "../GameContext";

const addPlayerBorder = (x: number, y: number, playerColor: string) => {
  const clickedDot = document.getElementById(`${x}${y}`);
  const oldBorders = clickedDot?.style.boxShadow;
  let oldBordersArray: string[] = [];

  if (oldBorders) {
    oldBordersArray = oldBorders.split(",");
  }
  const newBorder = `${playerColor} 0px 0px 0px ${
    3 * ((oldBordersArray?.length || 0) + 1)
  }px`;
  const borders: string[] = [...(oldBordersArray || []), newBorder];
  return clickedDot
    ? (clickedDot.style.boxShadow = `${borders.join(",")}`)
    : null;
};

const Dot: FunctionComponent<{ x: number; y: number }> = ({ x, y }) => {
  const {
    players,
    orderForPlayers,
    setOrderForPlayers,
    setPlayers,
  } = useContext(EscapeContext);
  const { currentPlayer } = useContext(GameContext);
  const [counter, setCounter] = useState(0);

  return (
    <div
      id={`${x}${y}`}
      style={{
        gridRow: `${y}`,
        gridColumn: `${x}`,
        backgroundColor: "black",
        width: "10px",
        height: "10px",
        // borderRadius: "50%",
      }}
      onClick={() => {
        if (currentPlayer.currentPosition === "") {
          const playersCopy = players.slice();
          currentPlayer.currentPosition = `${x}${y}`;
          playersCopy.splice(orderForPlayers[0], 1, currentPlayer);
          setPlayers(playersCopy);
          addPlayerBorder(x, y, currentPlayer.color);
          setCounter(counter + 1);
        } else if (counter < 3) {
          const playersCopy = players.slice();
          currentPlayer.currentPosition = `${x}${y}`;
          playersCopy.splice(orderForPlayers[0], 1, currentPlayer);
          setPlayers(playersCopy);
          addPlayerBorder(x, y, currentPlayer.color);
          const arr = orderForPlayers.slice(1);
          setOrderForPlayers([...arr, orderForPlayers[0]]);
          setCounter(counter + 1);
        }
      }}
    ></div>
  );
};

export default Dot;
