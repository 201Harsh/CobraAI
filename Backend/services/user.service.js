const userModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");

module.exports.createTempUser = async ({ name, email, password, otp }) => {
  if (!name || !email || !password || !otp) {
    throw new Error("All fields are required");
  }

  const iftempuser = await TempUserModel.findOne({ email });

  if (iftempuser) {
    throw new Error("User already exists");
  }
  const ifuser = await userModel.findOne({ email });

  if (ifuser) {
    throw new Error("User already exists");
  }

  const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);

  const tempuser = TempUserModel.create({
    name,
    email,
    password,
    otp,
    otpExpiry: otpExpiryTime,
  });

  return tempuser;
};

module.exports.VerifyOtp = async ({ email, otp }) => {
  if (!email) {
    throw new Error("Email is required");
  }

  if (!otp) {
    throw new Error("OTP is required");
  }

  const tempuser = await TempUserModel.findOne({ email });

  if (!tempuser) {
    throw new Error("User not found");
  }

  const isOtpValid = tempuser.otp === otp;

  if (!isOtpValid) {
    throw new Error("Invalid OTP");
  }

  const otpExpiryTime = tempuser.otpExpiry;

  if (otpExpiryTime < new Date()) {
    throw new Error("OTP has expired");
  }

  const user = await userModel.create({
    name: tempuser.name,
    email: tempuser.email,
    password: tempuser.password,
  });

  await TempUserModel.deleteOne({ _id: tempuser._id });

  return user;
};

module.exports.UpdatingUserInfo = async ({
  id,
  Level,
  Language,
  LearningStyle,
  gender,
}) => {
  if (!Level || !Language || !LearningStyle || !gender) {
    throw new Error("All fields are required");
  }

  const updateduser = await userModel.findByIdAndUpdate(id, {
    Level,
    Language,
    LearningStyle,
    gender,
  });

  if (!updateduser) {
    throw new Error("User not found");
  }

  return updateduser;
};

module.exports.UpdateUserProfile = async ({
  id,
  name,
  Level,
  Language,
  LearningStyle,
  gender,
}) => {
  if (!name || !Level || !Language || !LearningStyle || !gender) {
    throw new Error("All fields are required");
  }

  const updateduser = await userModel.findByIdAndUpdate(id, {
    name,
    Level,
    Language,
    LearningStyle,
    gender,
  });

  return updateduser;
};
