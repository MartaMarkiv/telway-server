const { Server } = require("socket.io");

let ioInstance;

const connectedUsers = new Map();

function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("user-registration", (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`Registered user: ${userId} (${socket.id})`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
      for (const [userId, sId] of connectedUsers.entries()) {
        if (sId === socket.id) connectedUsers.delete(userId);
      }
    });
  });

  ioInstance = io;
  return io;
}

function getIO() {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized yet!");
  }
  return ioInstance;
}

module.exports = { initSocket, getIO, connectedUsers };
