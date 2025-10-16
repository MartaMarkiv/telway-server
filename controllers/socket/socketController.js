const {getIO, connectedUsers}  = require("../../lib/socket.js");

function updateUserAmount(userId, amount) {
  console.log("updateUserAmount:  ", userId, amount);
  console.log(connectedUsers);
  const io = getIO();
  const socketId = connectedUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit("update-user-amount", amount);
    console.log(`📤 Server sent message to user ${userId} `, amount);
  } else {
    console.log(`⚠️ User ${userId} not connected`);
  }
}

module.exports = updateUserAmount;