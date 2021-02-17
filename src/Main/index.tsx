import { Link, RouteComponentProps } from "@reach/router";
import React, { FunctionComponent } from "react";
import NumberOfPlayers from "./NumberOfPlayers";
import SizeOfBoard from "./SizeOfBoard";
import "./_main.scss";

const Main: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="main">
      <h1>ESCAPE</h1>
      <NumberOfPlayers />
      <SizeOfBoard />
      <Link to="/players" style={{ textDecoration: "none" }}>
        <div className="continue-button">Continue</div>
      </Link>
    </div>
  );
};

export default Main;
