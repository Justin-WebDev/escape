// const allUsers = {} as {
//   [key: string]: { [socketid: string]: string };
// };
const allUsers = {};

// exports.joinRoom = (
//   socketid: string,
//   username: string,
//   room: string
// ): { socketid: string; username: string; room: string } => {
//   allUsers[room] = { ...allUsers[room], [socketid]: username };
//   return { socketid, username, room };
// };
exports.joinRoom = (socketid, username, room) => {
  allUsers[room] = { ...allUsers[room], [socketid]: username };
  return { socketid, username, room };
};

// exports.formatMessage = (username: string, message: string) => {
//   return { username, message };
// };
exports.formatMessage = (username, message) => {
  return { username, message };
};

// exports.getAllUsers = (room: string) => {
//   return Object.values(allUsers[room]).reduce((output, current) => {
//     return { ...output, [current]: true };
//   }, {});
// };
exports.getAllUsers = (room) => {
  return Object.values(allUsers[room]).reduce((output, current) => {
    return { ...output, [current]: true };
  }, {});
};

// exports.getCurrentUser = (socketid: string) => {
//   for (const room in allUsers) {
//     if (allUsers[room][socketid]) {
//       return [allUsers[room][socketid], room];
//     }
//   }
//   return null;
// };

exports.getCurrentUser = (socketid) => {
  for (const room in allUsers) {
    if (allUsers[room][socketid]) {
      return [allUsers[room][socketid], room];
    }
  }
  return null;
};

// exports.exitGame = (socketid: string) => {
//   for (const room in allUsers) {
//     if (allUsers[room][socketid]) {
//       const username = allUsers[room][socketid];
//       delete allUsers[room][socketid];
//       return [username, room];
//     }
//   }
//   return null;
// };

exports.exitGame = (socketid) => {
  for (const room in allUsers) {
    if (allUsers[room][socketid]) {
      const username = allUsers[room][socketid];
      delete allUsers[room][socketid];
      return [username, room];
    }
  }
  return null;
};
