const router = require("express").Router();
const UserMiddleware = require("../middlewares/user.middleware");
const AIController = require("../controllers/ai.controller");

router.post("/chat", UserMiddleware.authUser, AIController.chatWithAI);

router.post("/reviewCode", UserMiddleware.authUser, AIController.reviewCode);

module.exports = router;
