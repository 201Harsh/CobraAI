const UserModel = require("../models/user.model");
const ChatModel = require("../models/chat.model");
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

    const chat = await ChatModel.findOne({ UserId });

    let historyText = "";
    if (
      chat &&
      Array.isArray(chat.ChatHistory) &&
      chat.ChatHistory.length > 0
    ) {
      historyText = chat.ChatHistory.map(
        (messagePair) => `User: ${messagePair.user}\nAI: ${messagePair.ai}\n`
      ).join("\n");
    }

    const fullPrompt = `${historyText}\nUser: ${prompt}\nAI:`;


    const AIResponse = await CodeAstraAI({ prompt, User, fullPrompt });

    res.status(200).json({
      response: AIResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
