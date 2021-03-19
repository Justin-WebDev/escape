import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent } from "react";

const defaultBoxShadow = (e: { [key: string]: any }, player: number) => {
  const colors = document.querySelectorAll<HTMLElement>(`.color${player}`);
  colors.forEach((color) => {
    if (color !== e.target) {
      color.style.boxShadow = "0px 0px 5px black";
    } else {
      color.style.boxShadow = "0px 0px 10px purple";
    }
  });
};

const Color: FunctionComponent<
  RouteComponentProps & {
    color: string;
    player: number;
    setPlayerColor: Function;
  }
> = ({ color, player, setPlayerColor }) => (
  <div
    className={`color color${player}`}
    style={{
      backgroundColor: `${color}`,
    }}
    onClick={(e) => {
      setPlayerColor(color);
      defaultBoxShadow(e, player);
    }}
  ></div>
);

export default Color;
