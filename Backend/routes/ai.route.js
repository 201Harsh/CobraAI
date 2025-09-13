const router = require("express").Router();
const UserMiddleware = require("../middlewares/user.middleware");
const AIController = require("../controllers/ai.controller");
const RateLimitERMiddleware = require("../middlewares/RateLimter.middleware");

router.post(
  "/chat",
  RateLimitERMiddleware.aiLimit,
  UserMiddleware.authUser,
  AIController.chatWithAI
);

router.post(
  "/reviewCode",
  RateLimitERMiddleware.aiLimit,
  UserMiddleware.authUser,
  AIController.reviewCode
);

module.exports = router;
