const ChatModel = require("../models/chat.model");

module.exports.SaveChatHistory = async (req, res) => {
  try {
    const { UserChat, AIResponse } = req.body;
    const UserId = req.user._id;

    let chat = await ChatModel.findOne({ UserId });
    const newChatMessage = { user: UserChat, ai: AIResponse };

    if (chat) {
      chat.ChatHistory.push(newChatMessage);

      await chat.save();
    } else {
      chat = new ChatModel({
        UserId: UserId,
        ChatHistory: [newChatMessage],
      });
      await chat.save();
    }

    res.status(200).json({
      message: "Chat saved successfully",
      chat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.getChatHistory = async (req, res) => {
  try {
    const UserId = req.user._id;

    const chat = await ChatModel.findOne({ UserId });

    res.status(200).json({
      message: "Chat history found successfully",
      chat,
    });
    
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
