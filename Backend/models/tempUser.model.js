const mongoose = require("mongoose");

const TempUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const TempUser = mongoose.model("TempUser", TempUserSchema);
module.exports = TempUser;
