const userModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");

module.exports.createTempUser = async ({ name, email, password, otp }) => {
  if (!name || !email || !password || !otp) {
    throw new Error("All fields are required");
  }

  const ifuser = await userModel.findOne({ email });

  if (ifuser) {
    throw new Error("User already exists");
  }

  const tempuser = TempUserModel.create({
    name,
    email,
    password,
    otp,
  });

  return tempuser;
};
