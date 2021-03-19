import React, { FunctionComponent, useContext } from "react";

import { OnlineGameContext } from "../../../OnlineGameContext";
import Dot from "./Dot";

const Dots: FunctionComponent = (): any => {
  const { availableMoves } = useContext(OnlineGameContext);

  return Object.keys(availableMoves).map((key) => {
    const [x, y] = key.split("");
    return <Dot x={Number(x)} y={Number(y)} availableMoves={availableMoves} />;
  });
};

export default Dots;
