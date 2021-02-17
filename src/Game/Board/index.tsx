import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent } from "react";
import { EscapeContext } from "../../context";
import Dots from "./Dots";

const Board: FunctionComponent<RouteComponentProps> = () => (
  <EscapeContext.Consumer>
    {({ boardSize }) => (
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
        {/* <div
          style={{
            gridRow: "1",
            gridColumn: "1/3",
            backgroundColor: "purple",
            width: "100%",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            gridRow: "1/3",
            gridColumn: "1",
            backgroundColor: "green",
            width: "100%",
            height: "100%",
          }}
        ></div> */}
        <Dots boardSize={boardSize} />
      </div>
    )}
  </EscapeContext.Consumer>
);

export default Board;
