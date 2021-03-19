import React, { FunctionComponent } from "react";

const DrawLine: FunctionComponent<{
  oldx: number;
  newx: number;
  oldy: number;
  newy: number;
}> = ({ oldx, newx, oldy, newy }) => {
  return (
    <svg>
      <polyline points={`${oldx},${oldy} ${newx},${newy}`}></polyline>
    </svg>
  );
};

export default DrawLine;
