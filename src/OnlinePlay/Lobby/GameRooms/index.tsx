import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext } from "react";
import { OnlinePlayContext } from "../../OnlinePlayContext";
import CreateNewRoom from "../CreateNewRoom";

import Room from "./Room";

const GameRooms: FunctionComponent<RouteComponentProps> = () => {
  const { rooms } = useContext(OnlinePlayContext);

  return (
    <div className="roomsContainer">
      <div className="roomHeader">
        <div style={{ gridColumn: "1", textAlign: "center" }}>Room</div>
        <div style={{ gridColumn: "2", textAlign: "center" }}>Size</div>
        <div style={{ gridColumn: "3", textAlign: "center" }}>Players</div>
        <div style={{ gridColumn: "4", textAlign: "center" }}>Watching</div>
        <div style={{ gridColumn: "5", textAlign: "center" }}>Status</div>
      </div>
      {Object.keys(rooms).map((roomName, index) => {
        return <Room roomName={roomName} index={index} />;
      })}
      <CreateNewRoom />
    </div>
  );
};

export default GameRooms;
