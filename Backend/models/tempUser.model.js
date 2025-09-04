const mongoose = require("mongoose");

const tempuserSchema = new mongoose.Schema({
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
  otp: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
});

tempuserSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 300 });

const tempuser = mongoose.model("tempuser", tempuserSchema);

module.exports = tempuser;
