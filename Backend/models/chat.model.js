const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ChatHistory: [
    {
      user: {
        type: String,
        required: true,
      },
      ai: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
