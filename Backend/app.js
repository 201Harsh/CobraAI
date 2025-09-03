const express = require("express");
const router = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", router);

module.exports = app;
