const allUsers = { lobby: { players: {}, watchers: {} } };

/**
 * allUsers = {
 *  room: {
 *    players: {
 *      socketid : username,
 *    },
 *    watchers: {
 *      socketid : username,
 *    },
 *    boardSize: number,
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
    Object.keys(allUsers[room].players).length === 0 &&
    Object.keys(allUsers[room].watchers).length === 0
  ) {
    delete allUsers[room];
  }
};

exports.joinRoom = (socketid, username, room, role) => {
  allUsers[room][role] = {
    ...allUsers[room][role],
    [socketid]: username,
  };
};

exports.formatMessage = (name, message) => {
  return { name, message };
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
      players: Object.values(allUsers[room].players),
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
