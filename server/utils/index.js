const allUsers = {};

/**
 * allUsers = {
 *  room: {
 *    users: {
 *      socketid : username,
 *    },
 *    neededAmountOfPlayers: # of players needed to start game,
 *    status: is game in progress (true or false)
 *  }
 * }
 */

exports.joinRoom = (
  socketid,
  username,
  room,
  neededAmountOfPlayers,
  status
) => {
  if (!allUsers[room]) {
    allUsers[room] = {
      users: { [socketid]: username },
      neededAmountOfPlayers,
      status,
    };
  } else {
    allUsers[room] = {
      ...allUsers[room],
      users: { ...allUsers[room]["users"], [socketid]: username },
    };
  }
  return { socketid, username, room };
};

exports.formatMessage = (username, message) => {
  return { username, message };
};

exports.getRoom = (socketid) => {
  for (const room in allUsers) {
    if (allUsers[room]["users"][socketid]) {
      return room;
    }
  }
  return null;
};

exports.getAllUsers = (room) => {
  if (allUsers[room]) {
    return Object.values(allUsers[room]["users"]).reduce((output, current) => {
      return { ...output, [current]: true };
    }, {});
  }
};

exports.getAllRooms = () => {
  return Object.keys(allUsers).reduce((output, current) => {
    return current === "lobby"
      ? output
      : {
          ...output,
          [current]: Object.assign({}, allUsers[current], {
            users: Object.keys(allUsers[current]["users"]).length,
          }),
        };
  }, {});
};

exports.getCurrentUser = (socketid) => {
  for (const room in allUsers) {
    if (allUsers[room]["users"][socketid]) {
      return [allUsers[room]["users"][socketid], room];
    }
  }
  return null;
};

exports.exitRoom = (socketid) => {
  for (const room in allUsers) {
    if (allUsers[room]["users"]) {
      if (allUsers[room]["users"][socketid]) {
        const username = allUsers[room]["users"][socketid];
        if (Object.keys(allUsers[room]["users"]).length === 1) {
          delete allUsers[room];
          return [username, null];
        } else {
          delete allUsers[room]["users"][socketid];
          return [username, room];
        }
      }
    }
  }
  return [null, null];
};
