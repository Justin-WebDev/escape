import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useState } from "react";
import { OnlineGameContext } from "./OnlineGameContext";
import OnlineGame from "./OnlineGame";
import ChooseColor from "./ChooseColor";

const GameRoom: FunctionComponent<RouteComponentProps> = () => {
  const [color, setColor] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number[] | null>(null);

  return (
    <OnlineGameContext.Provider
      value={{ color, setColor, currentPosition, setCurrentPosition }}
    >
      {color ? <OnlineGame /> : <ChooseColor />}
    </OnlineGameContext.Provider>
  );
};

export default GameRoom;
