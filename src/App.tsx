import React, { useState } from "react";
import Board from "./Board";

const App = () => {
  const [boardSize, setBoardSize] = useState(4);
  return <Board boardSize={boardSize} />;
};

export default App;
