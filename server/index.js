const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const {
  joinRoom,
  getAllUsers,
  formatMessage,
  getCurrentUser,
  getAllRooms,
  leaveRoom,
  createRoom,
  getRoom,
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
