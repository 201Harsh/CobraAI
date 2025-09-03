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

    const ValidateEmail = (email) => {
      const domain = email.split("@")[1].toLowerCase();

      const IsAllowed = allowedDomains.includes(domain);

      if (!IsAllowed) {
        throw new Error("Use a Valid Email Address");
      }
    };

    if (!ValidateEmail(email)) {
      return
    }

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
