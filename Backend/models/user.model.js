const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
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
  ProfilePic: {
    type: Boolean,
    default: false,
  },
  ProfilePicUrl: {
    type: String,
    default: "",
  },
  Level: {
    type: String,
    default: "Beginner",
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
  },
  Language: {
    type: String,
    default: "Python",
  },
  LearningStyle: {
    type: String,
    default: "Simple and Fun",
  },
  gender:{
    type:String,
    default:""
  }
});

UserSchema.methods.jwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

const user = mongoose.model("User", UserSchema);

module.exports = user;
