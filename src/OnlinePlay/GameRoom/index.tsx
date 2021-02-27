import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext, useState } from "react";
import OnlineGame from "./OnlineGame";

const GameRoom: FunctionComponent<RouteComponentProps> = () => {
  return <OnlineGame />;
};

export default GameRoom;
