import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext } from "react";
import { EscapeContext } from "../../context";
import Dots from "./Dots";

const Board: FunctionComponent<RouteComponentProps> = () => {
  const { boardSize } = useContext(EscapeContext);
  const canvasSize = 100 * (boardSize - 1) + boardSize * 10;
  return (
    <div
      id="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${boardSize}, 10px)`,
        gridTemplateRows: `repeat(${boardSize}, 10px)`,
        gridGap: "100px",
        placeItems: "center",
        position: "relative",
        backgroundColor: "transparent",
      }}
    >
      <canvas
        id="mycanvas"
        width={`${canvasSize}px`}
        height={`${canvasSize}px`}
        style={{ position: "absolute", top: "0", left: "0", zIndex: -1 }}
      ></canvas>
      <Dots />
    </div>
  );
};

export default Board;
