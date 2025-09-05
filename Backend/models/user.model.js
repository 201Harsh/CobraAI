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
    minlength: 6,
  },
  ProfilePic: {
    type: Boolean,
    default: false,
  },
  ProfilePicUrl: {
    type: String,
    default: "https://videos.openai.com/vg-assets/assets%2Ftask_01k4bdxy5vf0avyz6hdcdw7pxr%2F1757025418_img_0.webp?st=2025-09-05T02%3A50%3A34Z&se=2025-09-11T03%3A50%3A34Z&sks=b&skt=2025-09-05T02%3A50%3A34Z&ske=2025-09-11T03%3A50%3A34Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=6b41042f-a9cd-49d3-882a-22a7d9e97b16&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=%2F9WtcOypZsAOxGVtcvEiSqFDud4Yc%2FKLfUKeoFBXwGE%3D&az=oaivgprodscus",
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
  gender: {
    type: String,
    default: "",
  },
  joiningDate:{
    type: Date,
    default: Date.now
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
