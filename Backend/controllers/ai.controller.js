const UserModel = require("../models/user.model");
const CodeAstraAI = require("../services/CodeAstraAI");

module.exports.chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    const UserId = req.user._id;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const User = await UserModel.findById(UserId);

    if (!User) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const AIResponse = await CodeAstraAI({ prompt, User });

    res.status(200).json({
      response: AIResponse,
    });
    
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
