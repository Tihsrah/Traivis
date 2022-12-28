const express = require("express");
const path = require("path");
const app = express();
const { ExpressPeerServer } = require("peer");

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("started at 3000 PORT...");
});

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);
app.use(express.static(path.join(__dirname, "")));

const io = require("socket.io")(server, {
  allowEIO3: true,
});

let users = [];

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, username) => {
    users.push({ id: userId, name: username, room: roomId });

    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("get-users", () => {
      io.to(roomId).emit(
        "getUsers",
        users.filter((u) => u.room == roomId)
      );
    });

    socket.on("message", (message, user) => {
      io.to(roomId).emit("createMessage", message, user);
    });

    socket.on("disconnect", () => {
      users = users.filter((u) => u.id !== userId);
      socket.to(roomId).emit("user-disconnected", userId, users);
    });
  });
});