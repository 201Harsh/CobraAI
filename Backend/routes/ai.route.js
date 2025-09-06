const router = require("express").Router();
const UserMiddleware = require("../middlewares/user.middleware");
const AIController = require("../controllers/ai.controller");

router.post("/chat", UserMiddleware.authUser, AIController.chatWithAI);

module.exports = router;
