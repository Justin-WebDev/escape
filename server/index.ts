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
  exitGame,
} = require("./utils");

const PORT = 3000;

app.use(express.static(path.join(__dirname, "/../dist")));

app.use("*", (req: { [key: string]: any }, res: any) => {
  res.sendFile(path.join(__dirname, "/../dist", "index.html"));
});

io.on("connection", (socket: { [key: string]: any }) => {
  socket.on(
    "joinRoom",
    async ({ username, roomName }: { username: string; roomName: string }) => {
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
    }
  );

  socket.on("message", (message: string) => {
    const [user, room] = getCurrentUser(socket.id);
    if (user) {
      io.to(room).emit("message", formatMessage(user, message));
    }
  });

  socket.on("disconnect", () => {
    const [username, room] = exitGame(socket.id);
    if (room) {
      socket.broadcast
        .to(room)
        .emit("message", formatMessage("Jailer", `${username} left the game!`));

      io.to(room).emit("roomUsers", getAllUsers(room));
    }
  });
});

http.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
