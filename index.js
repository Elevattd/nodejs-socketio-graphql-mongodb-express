const app = require("./src/app");
const { Server } = require("socket.io");
const http = require("http");
const { API_PORT, CORS } = require("./config");
const sockets = require("./sockets");

const server = http.createServer(app);
const httpServer = server.listen(API_PORT);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", " DELETE", "OPTIONS"],
  },
});

sockets(io);

console.log(`LOAD SERVER  --> ON: ${API_PORT}`);
