const connectedUsers = new Map();

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("user-registration", (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`✅ User ${userId} connected with socket ID: ${socket.id}`);
    });

    // // Обробка приватного повідомлення
    // socket.on("sendPrivateMessage", ({ receiverId, message }) => {
    //   const receiverSocketId = connectedUsers.get(receiverId);

    //   if (receiverSocketId) {
    //     io.to(receiverSocketId).emit("privateMessage", {
    //       from: socket.id,
    //       message,
    //     });
    //     console.log(`📩 Message sent from ${socket.id} to ${receiverId}`);
    //   } else {
    //     console.log(`⚠️ User ${receiverId} not connected`);
    //   }
    // });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`❌ User ${userId} disconnected`);
          break;
        }
      }
    });
  });
}


export function updateUserAmount(io, userId, amount) {
  const socketId = connectedUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit("update-user-amount", amount);
    console.log(`📤 Server sent message to user ${userId} `, amount);
  } else {
    console.log(`⚠️ User ${userId} not connected`);
  }
}
