const mongoose = require("mongoose");

const ConnectTODB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {})
    .catch((err) => {});
};

module.exports = ConnectTODB;
