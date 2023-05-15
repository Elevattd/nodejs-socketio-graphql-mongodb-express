const sockets = (io) => {
  try {
    io.on("connection", (socket) => {
      console.log("SOCKET.IO    --> ON:", socket.client.id);

      socket.on("createProduct", () => {
        io.emit("refreshList");
      });

      socket.on("updateProduct", () => {
        io.emit("refreshList");
      });

      socket.on("deleteProduct", () => {
        io.emit("refreshList");
      });

      io.on("disconnect", () => {
        console.log("SOCKET.IO    --> DISCONNECT", socket.client.id);
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sockets;
