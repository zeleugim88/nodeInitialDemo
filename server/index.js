//https://socket.io/docs/v4/server-initialization/

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { //https://socket.io/docs/v4/handling-cors/
    origin: "http://localhost:8080", //default Vue client port
  }, });

io.on("connection", (socket) => {
  console.log("connected")
});



const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
