const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

dotenv.config();

const indexRouter = require("./routes/index");

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

console.log("CORS allowed origins:", corsOptions.origin);

// app.options("*", cors(corsOptions)); 
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

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});