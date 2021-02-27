import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext } from "react";
import { OnlinePlayContext } from "../../OnlinePlayContext";

import Room from "./Room";

const GameRooms: FunctionComponent<RouteComponentProps> = () => {
  const { rooms } = useContext(OnlinePlayContext);

  return (
    <div className="roomsContainer">
      {Object.keys(rooms).map((roomName, index) => {
        return <Room roomName={roomName} index={index} />;
      })}
    </div>
  );
};

export default GameRooms;
