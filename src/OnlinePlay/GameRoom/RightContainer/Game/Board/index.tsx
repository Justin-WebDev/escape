import React, { FunctionComponent, useContext } from "react";
import { OnlineGameContext } from "../../../OnlineGameContext";
import Dots from "./Dots";

const Board: FunctionComponent = () => {
  const { boardSize } = useContext(OnlineGameContext);
  const canvasSize = 100 * (boardSize - 1) + boardSize * 10;
  return boardSize ? (
    <div
      id="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${boardSize}, 10px)`,
        gridTemplateRows: `repeat(${boardSize}, 10px)`,
        gridGap: "100px",
        placeItems: "center",
        position: "relative",
        // backgroundColor: "blue",
        backgroundColor: "transparent",
        // zIndex: 999,
      }}
    >
      <canvas
        id="mycanvas"
        width={`${canvasSize}px`}
        height={`${canvasSize}px`}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: -1,
        }}
      ></canvas>
      <Dots />
    </div>
  ) : null;
};

export default Board;
