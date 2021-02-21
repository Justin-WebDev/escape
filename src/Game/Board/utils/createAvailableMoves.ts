const movesForEachDot = (x: number, y: number, boardSize: number) => {
  const moves: string[] = [];
  const possibleMoves = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];
  possibleMoves.forEach((possibleMove) => {
    const [_x, _y] = possibleMove;
    if (
      x + _x > 0 &&
      x + _x <= boardSize &&
      y + _y > 0 &&
      y + _y <= boardSize
    ) {
      moves.push(`${_x + x}${_y + y}`);
    }
  });
  return moves;
};

export const createAvailableMoves = (boardSize: number) => {
  let availableMoves: { [key: string]: string[] } = {};
  for (let y = 1; y <= boardSize; y++) {
    for (let x = 1; x <= boardSize; x++) {
      availableMoves[`${x}${y}`] = movesForEachDot(x, y, boardSize);
    }
  }
  return availableMoves;
};
