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
      from: "CodeAstra<endgamingai2@gmail.com>",
      to: email,
      subject: "🔐 Your CodeAstra Verification Code",
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CodeAstra Verification Code</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
                -webkit-font-smoothing: antialiased;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #1c0f12;
                color: #e6e6e6;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid #660000;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            }
            
            .email-header {
                background: linear-gradient(135deg, #660000, #330000);
                padding: 30px 25px;
                text-align: center;
                border-bottom: 1px solid #990000;
                position: relative;
                overflow: hidden;
            }
            
            .email-header::before {
                content: "";
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%);
                transform: rotate(30deg);
            }
            
            .logo {
                font-size: 28px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 5px;
                letter-spacing: 1px;
                position: relative;
            }
            
            .logo span {
                color: #ff4c4c;
            }
            
            .tagline {
                margin: 5px 0 0;
                font-size: 12px;
                color: #ff9999;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                position: relative;
            }
            
            .email-body {
                padding: 35px 30px;
            }
            
            .greeting {
                color: #ff4c4c;
                margin-top: 0;
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            
            .message {
                line-height: 1.7;
                margin-bottom: 25px;
                font-size: 15px;
            }
            
            .otp-container {
                background-color: #2a0f15;
                border-left: 4px solid #ff4c4c;
                padding: 25px;
                margin: 30px 0;
                border-radius: 6px;
                text-align: center;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
            
            .otp-label {
                margin: 0 0 15px;
                font-size: 15px;
                color: #ff9999;
            }
            
            .otp-code {
                font-size: 38px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #ffffff;
                margin: 20px 0;
                background: linear-gradient(135deg, #660000, #330000);
                padding: 15px 25px;
                border-radius: 8px;
                display: inline-block;
                min-width: 250px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                font-family: 'Courier New', monospace;
            }
            
            .validity {
                margin: 15px 0 0;
                font-size: 14px;
                color: #ff9999;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .validity-icon {
                font-size: 16px;
            }
            
            .warning {
                font-size: 14px;
                color: #ff9999;
                line-height: 1.7;
                padding: 15px;
                background-color: #2a0f15;
                border-radius: 6px;
                margin: 25px 0;
                border-left: 3px solid #ff4c4c;
            }
            
            .support-section {
                margin-top: 35px;
                padding-top: 25px;
                border-top: 1px solid #660000;
            }
            
            .support-title {
                margin-bottom: 12px;
                color: #ff9999;
                font-weight: 500;
            }
            
            .support-email {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: #ff4c4c;
                text-decoration: none;
                font-weight: 500;
                padding: 10px 15px;
                background-color: #2a0f15;
                border-radius: 6px;
                transition: all 0.3s ease;
            }
            
            .support-email:hover {
                background-color: #330000;
            }
            
            .website-link {
                margin-top: 20px;
                font-size: 14px;
                color: #ff9999;
            }
            
            .website-link a {
                color: #ff4c4c;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            
            .website-link a:hover {
                text-decoration: underline;
            }
            
            .email-footer {
                background-color: #330000;
                padding: 20px 15px;
                text-align: center;
                font-size: 13px;
                color: #ff9999;
                border-top: 1px solid #660000;
            }
            
            .copyright {
                margin-bottom: 8px;
            }
            
            .powered-by {
                font-size: 12px;
                opacity: 0.8;
            }
            
            .social-links {
                margin-top: 15px;
                display: flex;
                justify-content: center;
                gap: 15px;
            }
            
            .social-link {
                color: #ff9999;
                text-decoration: none;
                font-size: 12px;
                transition: color 0.3s ease;
            }
            
            .social-link:hover {
                color: #ff4c4c;
            }
            
            @media (max-width: 480px) {
                .email-body {
                    padding: 25px 20px;
                }
                
                .otp-code {
                    font-size: 28px;
                    letter-spacing: 5px;
                    padding: 12px 20px;
                    min-width: 200px;
                }
                
                .email-header {
                    padding: 25px 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1 class="logo">Code<span>Astra</span></h1>
                <p class="tagline">POWERED BY Trinetra AI</p>
            </div>
            
            <div class="email-body">
                <h2 class="greeting">Verify Your Email Address</h2>
                <p class="message">Thank you for choosing CodeAstra. To complete your verification and access all our features, please enter the following One-Time Password (OTP) in the verification page:</p>
                
                <div class="otp-container">
                    <p class="otp-label">Your verification code for ${email}:</p>
                    <div class="otp-code">${otp}</div>
                    <p class="validity">
                        <span class="validity-icon">⏱</span> 
                        Valid for 5 minutes
                    </p>
                </div>
                
                <p class="warning">⚠️ For your security, please do not share this code with anyone. CodeAstra team will never ask you for your verification code.</p>
                
                <div class="support-section">
                    <p class="support-title">Need assistance?</p>
                    <a href="mailto:support@codeastra.ai" class="support-email">
                        <span>✉️</span> support@codeastra.ai
                    </a>
                    <p class="website-link">Or visit our website: <a href="https://codeastra.ai">codeastra.ai</a></p>
                </div>
            </div>
            
            <div class="email-footer">
                <p class="copyright">© ${new Date().getFullYear()} CodeAstra. All rights reserved.</p>
                <p class="powered-by">Powered by Trinetra AI Technology</p>
                <div class="social-links">
                    <a href="https://www.instagram.com/201harshs/" class="social-link">Instagram</a>" class="social-link">Privacy Policy</a>
                    <a href="https://github.com/201Harsh" class="social-link">GitHub</a>
                    <a href="https://www.linkedin.com/in/201harsh/" class="social-link">LinkedIn</a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,
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

    res.status(201).json({
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

module.exports.UpdateUserProfile = async (req, res) => {
  try {
    const { name, Level, Language, LearningStyle, gender } = req.body;

    const UserId = req.user._id;

    const UpdateUser = await UserServices.UpdateUserProfile({
      id: UserId,
      name,
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
