import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent } from "react";
import CreateNewRoom from "./CreateNewRoom";
import GameRooms from "./GameRooms";

const Lobby: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="onlineGameAreaContainer">
      <CreateNewRoom />
      <GameRooms />
    </div>
  );
};

export default Lobby;
