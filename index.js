const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const { initSocket } = require("./lib/socket.js");

dotenv.config();

const webhookController = require("./controllers/payment/webhook.js");

const indexRouter = require("./routes/index");

const app = express();

const http = require("http");
const server = http.createServer(app);

initSocket(server);

const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
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