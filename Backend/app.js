const express = require("express");

const ConnectTODB = require("./config/db");
ConnectTODB();

const UserRouter = require("./routes/user.route");
const AIRouter = require("./routes/ai.route");
const ChatRouter = require("./routes/chat.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/users", UserRouter);
app.use("/ai", AIRouter);
app.use("/chat", ChatRouter);

module.exports = app;
