const router = require("express").Router();
const ChatController = require("../controllers/chat.controller");
const UserMiddleware = require("../middlewares/user.middleware");

router.post("/savechat", UserMiddleware.authUser, ChatController.SaveChatHistory);

module.exports = router;
