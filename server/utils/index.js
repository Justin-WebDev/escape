const allUsers = { lobby: { players: {}, watchers: {} } };

const movesForEachDot = (x, y, boardSize) => {
  const moves = [];
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

/**
 * allUsers = {
 *  room: {
 *    players: {
 *      socketid : {
 *        username: username,
 *        color: string
 *      },
 *    },
 *    watchers: {
 *      socketid : username,
 *    },
 *    boardSize: number,
 *    availableMoves: createAvailableMoves(boardSize) - {xy: [xy, xy, ...]}
 *    neededAmountOfPlayers: # of players needed to start game,
 *    status: is game in progress (true or false)
 *  }
 * }
 */

exports.createRoom = (room, boardSize, neededAmountOfPlayers) => {
  allUsers[room] = {
    players: {},
    watchers: {},
    boardSize,
    neededAmountOfPlayers,
    status: false,
  };
};

exports.removePlayer = (order, places) => {
  const playerThatLost = order.shift();
  return [order, [playerThatLost, ...places]];
};

exports.removeMove = (availableMoves, newX, newY, oldX, oldY) => {
  availableMoves[`${newX}${newY}`].splice(
    availableMoves[`${newX}${newY}`].findIndex(
      (element) => element === `${oldX}${oldY}`
    ),
    1
  );
  availableMoves[`${oldX}${oldY}`].splice(
    availableMoves[`${oldX}${oldY}`].findIndex(
      (element) => element === `${newX}${newY}`
    ),
    1
  );
  return availableMoves;
};

exports.getNextPlayer = (orderForPlayers) => {
  const currentNumber = orderForPlayers.shift();

  return [...orderForPlayers, currentNumber];
};

exports.getBoardSize = (room) => {
  return allUsers[room].boardSize;
};

exports.createAvailableMoves = (room) => {
  const boardSize = allUsers[room].boardSize;
  let availableMoves = {};
  for (let y = 1; y <= boardSize; y++) {
    for (let x = 1; x <= boardSize; x++) {
      availableMoves[`${x}${y}`] = movesForEachDot(x, y, boardSize);
    }
  }
  allUsers[room].availableMoves = availableMoves;
  return availableMoves;
};

exports.setOrderForPlayers = (room) => {
  let arr = [...Array(Number(allUsers[room].neededAmountOfPlayers)).keys()];
  const order = [];

  while (arr.length > 0) {
    const randomPlayer = arr.splice(
      Math.floor(Math.random() * arr.length - 1),
      1
    )[0];
    order.push(randomPlayer);
  }
  allUsers[room].orderForPlayers = order;
  return order;
};

exports.getRoom = (socketid) => {
  for (const room in allUsers) {
    if (allUsers[room].players[socketid] || allUsers[room].watchers[socketid]) {
      return room;
    }
  }
};

exports.leaveRoom = (socketid, room) => {
  if (allUsers[room].players[socketid]) {
    delete allUsers[room].players[socketid];
  } else {
    delete allUsers[room].watchers[socketid];
  }
  if (
    room !== "lobby" &&
    Object.keys(allUsers[room].players).length === 0 &&
    Object.keys(allUsers[room].watchers).length === 0
  ) {
    delete allUsers[room];
  }
};

exports.joinRoom = (socketid, username, room, role) => {
  role === "watchers"
    ? (allUsers[room][role] = {
        ...allUsers[room][role],
        [socketid]: username,
      })
    : (allUsers[room][role] = {
        ...allUsers[room][role],
        [socketid]: { username, color: "", isReady: false },
      });
};

exports.formatMessage = (name, message) => {
  return { name, message };
};

exports.setColor = (socketid, color, room) => {
  allUsers[room].players[socketid].color = color;
};

exports.getPlayersAndColors = (room) => {
  return Object.values(allUsers[room].players).reduce((output, player) => {
    return { ...output, [player.username]: player.color };
  }, {});
};

exports.areAllPlayersReady = (room) => {
  const players = Object.values(allUsers[room].players);
  const emptyString = players.findIndex((player) => player.color === "");
  if (
    players.length === Number(allUsers[room].neededAmountOfPlayers) &&
    emptyString === -1
  ) {
    return true;
  }
  return false;
};

exports.getAllUsers = (room) => {
  if (room === "lobby") {
    return {
      players: [],
      watchers: Object.values(allUsers["lobby"].watchers),
    };
  }
  if (allUsers[room]) {
    return {
      players: Object.values(allUsers[room].players).map(
        (player) => player.username
      ),
      watchers: Object.values(allUsers[room].watchers),
    };
  }
};

exports.getAllRooms = () => {
  return Object.keys(allUsers).reduce((output, current) => {
    return current === "lobby"
      ? output
      : {
          ...output,
          [current]: Object.assign({}, allUsers[current], {
            players: Object.keys(allUsers[current].players).length,
            watchers: Object.keys(allUsers[current].watchers).length,
          }),
        };
  }, {});
};
