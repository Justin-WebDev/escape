const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

const PORT = 3000;
let allUsers = {};

app.use(express.static(path.join(__dirname, "/../dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../dist", "index.html"));
});

io.on("connection", (socket) => {
  // socket.emit("")
  const id = socket.id;

  socket.on("login", (playerName) => {
    allUsers[id] = playerName;

    socket.emit("login", {
      roomName: "roomName",
      userName: "Jailer",
      message: `Welcome ${playerName}! Good luck Escaping, mwahaha!!!`,
      playerName,
      allUsers: Object.values(allUsers),
    });

    socket.broadcast.emit("new user", {
      roomName: "roomName",
      userName: "Jailer",
      message: `${playerName} Entered Room!`,
      addedUser: playerName,
    });
  });

  socket.on("send message", (message) => {
    io.emit("receive message", message);
  });

  socket.on("disconnect", () => {
    const username = allUsers[id];
    delete allUsers[id];
    if (username) {
      socket.broadcast.emit("player disconnect", {
        roomName: "roomName",
        userName: "Jailer",
        message: `${username} left the game!`,
        playerThatLeft: username,
      });
    }
  });
});

http.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
