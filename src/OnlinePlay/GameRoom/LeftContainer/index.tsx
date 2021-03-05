import React, { FunctionComponent } from "react";
import Places from "./Places";
import TurnOrder from "./TurnOrder";

const LeftContainer: FunctionComponent = () => (
  <div className="leftContainer">
    <TurnOrder />
    {/* <Places /> */}
  </div>
);

export default LeftContainer;
