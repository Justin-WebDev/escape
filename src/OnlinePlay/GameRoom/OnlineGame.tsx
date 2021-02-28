import React from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import "./_onlineGame.scss";

const OnlineGame = () => {
  return (
    <div className="onlineGame">
      <LeftContainer />
      <RightContainer />
    </div>
  );
};

export default OnlineGame;
