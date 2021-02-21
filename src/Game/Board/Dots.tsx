import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { EscapeContext } from "../../context";
import { GameContext } from "../GameContext";
import Dot from "./Dot";

const Dots: FunctionComponent = (): any => {
  const { setAvailableMoves, availableMoves } = useContext(GameContext);

  // return dots;
  return Object.keys(availableMoves).map((key) => {
    // const movesArray = availableMoves[key];
    const [x, y] = key.split("");

    return (
      <Dot
        x={Number(x)}
        y={Number(y)}
        availableMoves={availableMoves}
        setAvailableMoves={setAvailableMoves}
      />
    );
  });
};

export default Dots;
