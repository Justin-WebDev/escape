import React from "react";
import Places from "./Places";
import TurnOrder from "./TurnOrder";

const LeftContainer = () => {
  return (
    <div className="leftContainer">
      <TurnOrder />
      <Places />
    </div>
  );
};

export default LeftContainer;
