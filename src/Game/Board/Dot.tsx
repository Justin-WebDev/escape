import React, { FunctionComponent, useContext, useState } from "react";
import { EscapeContext } from "../../context";
import { GameContext } from "../GameContext";

const removePlayerBorder = (x: number, y: number) => {
  const oldDot = document.getElementById(`${x}${y}`);
  const bordersOnOldDot = oldDot?.style.boxShadow;
  if (bordersOnOldDot) {
    let oldBordersArray: string[] = bordersOnOldDot.split(",");
    oldBordersArray.shift();
    oldDot!.style.boxShadow = `${oldBordersArray.join(",")}`;
  }
};

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

const Dot: FunctionComponent<{
  x: number;
  y: number;
  availableMoves: { [key: string]: string[] };
  setAvailableMoves: Function;
}> = ({ x, y, availableMoves, setAvailableMoves }) => {
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
        borderRadius: "50%",
      }}
      onClick={() => {
        if (currentPlayer.currentPosition === "") {
          //// USED TO DRAW LINES BETWEEN DOTS ////
          currentPlayer.currentPosition = `${x}${y}`;
          ///////////////////////////////////////////
          players.splice(orderForPlayers[0], 1, currentPlayer);
          setPlayers(players);
          addPlayerBorder(x, y, currentPlayer.color);
          setCounter(counter + 1);
        } else if (counter < 3) {
          const [oldx, oldy] = currentPlayer.currentPosition.split("");

          if (
            (Math.abs(x - oldx) === 1 &&
              Math.abs(y - oldy) <= 1 &&
              availableMoves[`${oldx}${oldy}`].includes(`${x}${y}`)) ||
            (Math.abs(x - oldx) === 0 &&
              Math.abs(y - oldy) === 1 &&
              availableMoves[`${oldx}${oldy}`].includes(`${x}${y}`))
          ) {
            removePlayerBorder(oldx, oldy);
            let element = document.getElementById(
              "mycanvas"
            ) as HTMLCanvasElement;
            let line = element.getContext("2d");
            line?.beginPath();
            line?.moveTo((oldx - 1) * 110 + 5, (oldy - 1) * 110 + 5);
            line?.lineTo((x - 1) * 110 + 5, (y - 1) * 110 + 5);
            line!.lineWidth = 5;
            line!.strokeStyle = currentPlayer.color;
            line?.stroke();
            // REMOVE MOVEMENT FROM AVAILABLE MOVES ARRAY
            availableMoves[`${x}${y}`].splice(
              availableMoves[`${x}${y}`].findIndex(
                (element) => element === `${oldx}${oldy}`
              ),
              1
            );
            availableMoves[`${oldx}${oldy}`].splice(
              availableMoves[`${oldx}${oldy}`].findIndex(
                (element) => element === `${x}${y}`
              ),
              1
            );

            currentPlayer.currentPosition = `${x}${y}`;
            players.splice(orderForPlayers[0], 1, currentPlayer);
            setPlayers(players);
            addPlayerBorder(x, y, currentPlayer.color);
            const arr = orderForPlayers.slice(1);
            setOrderForPlayers([...arr, orderForPlayers[0]]);
            setCounter(counter + 1);
            setAvailableMoves(availableMoves);
          }
        }
      }}
    ></div>
  );
};

export default Dot;
