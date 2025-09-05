const UserModel = require("../models/user.model");
const TempUserSchema = require("../models/tempuser.model");
const UserServices = require("../services/user.service");
const { validationResult } = require("express-validator");
const transporter = require("../services/emailSending.service");

module.exports.registerTempuser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "protonmail.com",
      "aol.com",
      "mail.com",
      "zoho.com",
      "yandex.com",
    ];

    const validateEmail = (email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      if (!allowedDomains.includes(domain)) {
        throw new Error("Use a Valid Email Address");
      }
      return true;
    };

    validateEmail(email);

    const otp = Math.floor(1000 + Math.random() * 9000);

    const hashedPassword = await UserModel.hashPassword(password);

    const tempuser = await UserServices.createTempUser({
      name,
      email,
      password: hashedPassword,
      otp,
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER_EMAIL,
      to: email,
      subject: "OTP for registration",
      text: `Your OTP is ${otp}. Please enter this OTP to complete the registration process. If you did not request this, please ignore this email. Thank you!`,
    });

    res.status(201).json({
      message: "User created successfully and otp sent to email",
      tempuser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.VerifyUser = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const tempuser = await TempUserSchema.findOne({ email });

    if (!tempuser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const user = await UserServices.VerifyOtp({
      email,
      otp,
    });

    const token = await user.jwtToken();

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "User verified successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const User = await UserModel.findOne({ email });

    if (!User) {
      return res.status(404).json({
        error: "Invalid credentials",
      });
    }

    const IsMatched = await User.comparePassword(password);

    if (!IsMatched) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = await User.jwtToken();

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "User logged in successfully",
      User,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.getMe = async (req, res) => {
  try {
    const UserId = req.user._id;

    const User = await UserModel.findById(UserId);

    if (!User) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "User found successfully",
      User,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateUserInfo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const UserId = req.user._id;

    const IfUser = await UserModel.findById(UserId);

    if (!IfUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const { Level, Language, LearningStyle, gender } = req.body;

    const UpdateUser = await UserServices.UpdatingUserInfo({
      id: UserId,
      Level,
      Language,
      LearningStyle,
      gender,
    });

    res.status(200).json({
      message: "Info updated successfully",
      UpdateUser,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
