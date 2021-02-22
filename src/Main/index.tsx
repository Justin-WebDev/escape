import { Link, RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useState } from "react";
import NumberOfPlayers from "./NumberOfPlayers";
import SizeOfBoard from "./SizeOfBoard";
import "./_main.scss";

const Main: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="main">
      <Link to="/online" style={{ textDecoration: "none" }}>
        <button>Online Play</button>
      </Link>
      <Link to="/local" style={{ textDecoration: "none" }}>
        <button>Local Play</button>
      </Link>
    </div>
  );
};

export default Main;
