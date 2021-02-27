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
  exitRoom,
  getAllRooms,
} = require("./utils");

const PORT = 3000;

app.use(express.static(path.join(__dirname, "/../dist")));

// app.use("*", (req: { [key: string]: any }, res: any) => {
//   res.sendFile(path.join(__dirname, "/../dist", "index.html"));
// });

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../dist", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("joinRoom", async ({ username, roomName }) => {
    if (socket.rooms.size > 1) {
      // NEED TO ADD AN EMIT TO UPDATE THE NUMBER OF PLAYERS AT THE TABLES
      // SO IT UPDATES ON THE LOBBY
      const [username, room] = exitRoom(socket.id);
      socket.leave(room);
      socket.broadcast
        .to(room)
        .emit(
          "message",
          formatMessage("Jailer", `${username} moved to another jail cell!`)
        );

      io.to(room).emit("roomUsers", getAllUsers(room));
    }
    const user = await joinRoom(socket.id, username, roomName);
    socket.join(user.room);
    // welcomes user when they first connect
    socket.emit(
      "message",
      formatMessage(
        "Jailer",
        `You entered the ${user.room} jail cell, ${user.username}! Good luck Escaping!`
      )
    );

    // broadcasts when new user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("Jailer", `${user.username} entered the jail cell!`)
      );

    // sends users and room info to all users in room
    io.to(user.room).emit("roomUsers", getAllUsers(user.room));
  });

  socket.on("message", (message) => {
    const [user, room] = getCurrentUser(socket.id);
    if (user) {
      io.to(room).emit("message", formatMessage(user, message));
    }
  });

  socket.on("createRoom", ({ newRoomName, neededAmountOfPlayers, status }) => {
    const [username, room] = exitRoom(socket.id);

    const user = joinRoom(
      socket.id,
      username,
      newRoomName,
      neededAmountOfPlayers,
      status
    );
    // if (room) {
    socket.broadcast.to("lobby").emit("newRoom", {
      // change "lobby" to room
      message: formatMessage(
        "Jailer",
        `${username} moved to another jail cell!`
      ),
      allRooms: getAllRooms(),
      users: getAllUsers("lobby"), // change "lobby" to room
    });
    // }

    socket.leave(room);
    socket.join(user.room);

    socket.emit(
      "message",
      formatMessage(
        "Jailer",
        `You entered the ${user.room} jail cell, ${user.username}! Good luck Escaping!`
      )
    );

    // sends users and room info to all users in room
    io.to(user.room).emit("roomUsers", getAllUsers(user.room));
  });

  socket.on("disconnect", () => {
    const [username, room] = exitRoom(socket.id);
    if (room) {
      socket.broadcast
        .to(room)
        .emit("message", formatMessage("Jailer", `${username} left the game!`));

      io.to(room).emit("roomUsers", getAllUsers(room));
    }
  });
});

http.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
