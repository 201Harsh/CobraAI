const mongoose = require("mongoose");

const ConnectTODB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {});
};

module.exports = ConnectTODB;
