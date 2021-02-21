import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { EscapeContext } from "../../context";
import { GameContext } from "../GameContext";
import Dot from "./dot";

const Dots: FunctionComponent = (): any => {
  const { boardSize } = useContext(EscapeContext);
  const { setAvailableMoves, availableMoves } = useContext(GameContext);
  const [dots, setDots] = useState<any[]>([]);

  // useEffect(() => {
  //   let result = [];
  //   for (let y = 1; y <= boardSize; y++) {
  //     for (let x = 1; x <= boardSize; x++) {
  //       for (const key in availableMoves) {
  //         const [i, j] = key.slice().split("");
  //         if (
  //           (Math.abs(parseInt(i) - x) === 1 &&
  //             Math.abs(parseInt(j) - y) <= 1) ||
  //           (Math.abs(parseInt(i) - x) === 0 && Math.abs(parseInt(j) - y) === 1)
  //         ) {
  //           availableMoves[key].push(`${x}${y}`);
  //         }
  //       }
  //       result.push(
  // <Dot
  //   x={x}
  //   y={y}
  //   availableMoves={availableMoves}
  //   setAvailableMoves={setAvailableMoves}
  // />
  //       );
  //     }
  //   }
  //   setDots(result);
  // }, [availableMoves]);

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
