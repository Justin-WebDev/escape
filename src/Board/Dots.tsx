import React, { FunctionComponent } from "react";

const addPlayerBorder = (x: number, y: number, playerColor: string) => {
  const clickedDot = document.getElementById(`${x}${y}`);
  const oldBorders = clickedDot?.style.boxShadow;
  let oldBordersArray: string[] = [];

  if (oldBorders) {
    oldBordersArray = oldBorders.split(",");
  }
  const newBorder = `${playerColor} 0px 0px 0px ${
    2 * ((oldBordersArray?.length || 0) + 1)
  }px`;
  const borders: string[] = [...(oldBordersArray || []), newBorder];
  return clickedDot
    ? (clickedDot.style.boxShadow = `${borders.join(",")}`)
    : null;
};

const Dots: FunctionComponent<{ boardSize: number }> = ({ boardSize }): any => {
  const result = [];
  for (let i = 1; i <= boardSize; i++) {
    for (let j = 1; j <= boardSize; j++) {
      result.push(
        <div
          id={`${i}${j}`}
          style={{
            gridRow: `${i}`,
            gridColumn: `${j}`,
            backgroundColor: "black",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          }}
          onClick={() => {
            addPlayerBorder(i, j, "green");
          }}
        ></div>
      );
    }
  }
  return result;
};

export default Dots;
