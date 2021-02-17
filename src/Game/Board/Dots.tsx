import React, { FunctionComponent, useContext, useState } from "react";
import { EscapeContext } from "../../context";
import Dot from "./dot";

const Dots: FunctionComponent<{ boardSize: number }> = ({ boardSize }): any => {
  const result = [];

  for (let y = 1; y <= boardSize; y++) {
    for (let x = 1; x <= boardSize; x++) {
      result.push(<Dot x={x} y={y} />);
    }
  }
  return result;
};

export default Dots;
