const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const {
  joinRoom,
  getAllUsers,
  formatMessage,
  getAllRooms,
  leaveRoom,
  createRoom,
  getRoom,
  setColor,
  getPlayersAndColors,
  areAllPlayersReady,
  createAvailableMoves,
  setOrderForPlayers,
  getBoardSize,
  removeMove,
  getNextPlayer,
  removePlayer,
} = require("./utils");

const PORT = 3000;

app.use(express.static(path.join(__dirname, "/../dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../dist", "index.html"));
});

io.on("connection", (socket) => {
  socket.on(
    "joinRoom",
    ({ username, oldRoom = null, newRoom, role = "watchers" }) => {
      if (oldRoom) {
        leaveRoom(socket.id, oldRoom);
        socket.leave(oldRoom);
        socket.broadcast.to(oldRoom).emit("updateRoom", getAllUsers(oldRoom));
      }

      joinRoom(socket.id, username, newRoom, role);
      socket.join(newRoom);

      socket.emit("changeRoom", newRoom);

      if (newRoom === "lobby") {
        io.to("lobby").emit("updateLobby", {
          allRooms: getAllRooms(),
          usersInRoom: getAllUsers("lobby"),
        });
      } else {
        socket.broadcast.to("lobby").emit("updateLobby", {
          allRooms: getAllRooms(),
          usersInRoom: getAllUsers("lobby"),
        });
        io.to(newRoom).emit("updateRoom", getAllUsers(newRoom));
      }
    }
  );

  socket.on(
    "createRoom",
    ({
      username,
      currentRoom,
      newRoom,
      boardSize,
      neededAmountOfPlayers,
      role,
    }) => {
      leaveRoom(socket.id, currentRoom);
      createRoom(newRoom, boardSize, neededAmountOfPlayers);
      joinRoom(socket.id, username, newRoom, role);
      socket.leave(currentRoom);
      if (currentRoom !== "lobby") {
        socket.broadcast
          .to(currentRoom)
          .emit("updateRoom", getAllUsers(currentRoom));
      }
      socket.broadcast.to("lobby").emit("updateLobby", {
        allRooms: getAllRooms(),
        usersInRoom: getAllUsers("lobby"),
      });

      socket.join(newRoom);
      socket.emit("roomChange", newRoom);

      // sends users and room info to all users in room
      io.to(newRoom).emit("updateRoom", getAllUsers(newRoom));
    }
  );

  socket.on("message", ({ username, message, currentRoom }) => {
    io.to(currentRoom).emit("message", formatMessage(username, message));
  });

  socket.on("gameEnded", () => {
    setColor(socket.id, "", getRoom(socket.id));

    socket.emit("gameEnded", { isGameReady: false, isNull: null });
  });

  socket.on("ready", ({ color, currentRoom, username }) => {
    setColor(socket.id, color, currentRoom);
    socket.emit("allColors", getPlayersAndColors(currentRoom));
    socket.broadcast.to(currentRoom).emit("choseColor", { username, color });

    if (areAllPlayersReady(currentRoom)) {
      const availableMoves = createAvailableMoves(currentRoom);
      const order = setOrderForPlayers(currentRoom);
      const boardSize = getBoardSize(currentRoom);
      io.to(currentRoom).emit("gameIsReady", {
        moves: availableMoves,
        order,
        size: boardSize,
      });
    }
  });

  socket.on(
    "playerMoved",
    ({
      newX,
      newY,
      oldX,
      oldY,
      color,
      currentRoom,
      availableMoves,
      orderForPlayers,
    }) => {
      const moves = removeMove(availableMoves, newX, newY, oldX, oldY);
      const order = getNextPlayer(orderForPlayers);
      io.to(currentRoom).emit("playerMoved", {
        newX,
        newY,
        oldX,
        oldY,
        color,
        moves,
        order,
      });
    }
  );

  socket.on("playerLost", ({ orderForPlayers, places }) => {
    const [order, newPlaces] = removePlayer(orderForPlayers, places);
    const room = getRoom(socket.id);
    io.to(room).emit("playerLost", { order, newPlaces });
  });

  socket.on("disconnect", () => {
    const room = getRoom(socket.id);
    if (room) {
      leaveRoom(socket.id, room);

      if (room !== "lobby") {
        socket.broadcast.to(room).emit("updateRoom", getAllUsers(room));
      }
    }
    socket.broadcast.to("lobby").emit("updateLobby", {
      allRooms: getAllRooms(),
      usersInRoom: getAllUsers("lobby"),
    });
  });
});

http.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
