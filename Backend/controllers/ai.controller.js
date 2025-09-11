const UserModel = require("../models/user.model");
const ChatModel = require("../models/chat.model");
const CodeAstraAI = require("../services/CodeAstraAI");
const CodeAstraReviewAI = require("../services/CodeAstraReviewAI");

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

    const AIResponse = await CodeAstraAI({
      prompt,
      User,
      fullPrompt,
      historyText, // Pass the history text separately
    });

    // Save the new message to chat history
    if (chat) {
      chat.ChatHistory.push({ user: prompt, ai: AIResponse });
      await chat.save();
    } else {
      await ChatModel.create({
        UserId,
        ChatHistory: [{ user: prompt, ai: AIResponse }],
      });
    }

    res.status(200).json({
      response: AIResponse,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.reviewCode = async (req, res) => {
  try {
    const { codeSnippet, language } = req.body;
    const UserId = req.user._id;

    if (!codeSnippet) {
      return res.status(400).json({
        error: "Code snippet is required",
      });
    }

    const User = await UserModel.findById(UserId);

    if (!User) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const AIResponse = await CodeAstraReviewAI({ codeSnippet, language, User });

    res.status(200).json({
      response: AIResponse,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
