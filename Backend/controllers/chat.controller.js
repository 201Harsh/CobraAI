const ChatModel = require("../models/chat.model");

module.exports.SaveChatHistory = async (req, res) => {
  try {
    const { UserChat, AIResponse } = req.body;
    const UserId = req.user._id;
    console.log(UserId);

    let chat = await ChatModel.findOne({ UserId });
    const newChatMessage = { user: UserChat, ai: AIResponse };

    if (chat) {
      chat.ChatHistory.push(newChatMessage);

      if (chat.ChatHistory.length > 50) {
        chat.ChatHistory = chat.ChatHistory.slice(-50);
      }

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

    if (!chat) {
      return res.status(404).json({
        message: "No chat history found for this user",
      });
    }

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
