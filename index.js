const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const { registerSocketHandlers } = require("./controllers/socket/socketController.js");


const { Server } = require("socket.io");

// const setupSocket = require("./controllers/socketController");
// const {setSocketInstance} = require("./controllers/user/sendSocketMessage");

dotenv.config();

const webhookController = require("./controllers/paymnet/webhook");

const indexRouter = require("./routes/index");

const app = express();

const http = require("http");
const server = http.createServer(app);


const io = new Server(server, {
  cors: { origin: "*" }
});

registerSocketHandlers(io);

  // io.on("connection", (socket) => {
  //   console.log("New socket connection: !!!!!!!!1", socket.id);

  //   socket.on("registerUser", (userId) => {
  //     connectedUsers.set(userId, socket.id);
  //     console.log(`✅ Registered user ${userId} (${socket.id})`);
  //     console.log(connectedUsers);
  //   });

  //   socket.on("send_message", (data) => {
  //     const { userId, receiverId, message } = data;
  //     console.log(`💬 ${userId} → ${receiverId}: ${message}`);
  //     console.log(connectedUsers);

  //     const receiverSocketId = connectedUsers.get(userId);
  //     console.log("receiverSocketId: ", receiverSocketId);
  //     if (receiverSocketId) {
  //       io.to(receiverSocketId).emit("receive_message", {
  //         from: userId,
  //         message,
  //       });
  //       console.log(`📤 Message sent to ${receiverId} (${receiverSocketId})`);
  //     } else {
  //       console.log(`⚠️ User ${receiverId} not connected`);
  //     }
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("🔴 Disconnected:", socket.id);
  //     // видаляємо користувача з мапи
  //     for (const [userId, sId] of connectedUsers.entries()) {
  //       if (sId === socket.id) {
  //         connectedUsers.delete(userId);
  //         console.log(`🗑️ Removed user ${userId}`);
  //         break;
  //       }
  //     }
  //   });
  // });


const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

console.log("CORS allowed origins:", corsOptions.origin);

// app.options("*", cors(corsOptions));
app.use("/payment/webhook", express.raw({ type: 'application/json' }), webhookController);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;

app.use(cookieSession({
  name: process.env.SESSION_NAME,
  keys: [process.env.SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000, // 1 день
  resave: true,
  saveUninitialized: true,
}));

app.use("/api", indexRouter);

server.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});