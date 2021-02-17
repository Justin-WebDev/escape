import React, { FunctionComponent } from "react";
import Dots from "./Dots";

const Board: FunctionComponent<{ boardSize: number }> = ({ boardSize }) => {
  return (
    <div
      id="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${boardSize}, 10px)`,
        gridTemplateRows: `repeat(${boardSize}, 10px)`,
        gridGap: "100px",
        placeItems: "center",
      }}
    >
      <Dots boardSize={boardSize} />
    </div>
  );
};

export default Board;
