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
    default: "https://videos.openai.com/vg-assets/assets%2Ftask_01k4hn2gk1fmkt0t9ka1qw5ydc%2F1757234277_img_1.webp?st=2025-09-12T06%3A15%3A54Z&se=2025-09-18T07%3A15%3A54Z&sks=b&skt=2025-09-12T06%3A15%3A54Z&ske=2025-09-18T07%3A15%3A54Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Z%2Bm9U2z4n5zr4UdpwPKqMDXCT6lh2gHKZhKNZpm6teA%3D&az=oaivgprodscus",
  },
  Level: {
    type: String,
    default: "Beginner",
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
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET , {
    expiresIn: "30d",
  } ) ;
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

const user = mongoose.model("User", UserSchema);

module.exports = user;
