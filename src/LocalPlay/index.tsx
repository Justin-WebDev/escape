import { Link, RouteComponentProps } from "@reach/router";
import React, { FunctionComponent } from "react";
import NumberOfPlayers from "../Main/NumberOfPlayers";
import SizeOfBoard from "../Main/SizeOfBoard";
import "./_localPlay.scss";

const LocalPlay: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="localPlay">
      <NumberOfPlayers />
      <br />
      <br />
      <SizeOfBoard />
      <br />
      <br />
      <Link to="/local/players" style={{ textDecoration: "none" }}>
        <div className="continue-button">Continue</div>
      </Link>
    </div>
  );
};

export default LocalPlay;
