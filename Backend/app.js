const express = require("express");

const ConnectTODB = require("./config/db");
ConnectTODB();

const router = require("./routes/user.route");
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

app.use("/users", router);

module.exports = app;
