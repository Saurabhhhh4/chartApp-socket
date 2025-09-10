const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();

// serve static files from "public" folder
app.use(express.static(path.resolve("./public")));

// create HTTP server with Express app
const server = http.createServer(app);

// attach socket.io to server
const io = new Server(server);

// handle socket connections
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("user-message", message); // broadcast to all
    console.log("new user message", message);
  });
  //   console.log("New client connected");

  //   example: listen for chat message
  //     socket.on("chat message", (msg) => {
  //       console.log("message:", msg);
  //       io.emit("chat message", msg); // broadcast to all
  //     });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// route for /
app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./public/index.html"));
});

// start server on port 9000
server.listen(9000, () => {
  console.log("Server is running on port 9000");
});
