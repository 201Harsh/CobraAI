const router = require("express").Router();
const userController = require("../controllers/user.controller");
const UserMiddleware = require("../middlewares/user.middleware");
const RateLimitERMiddleware = require("../middlewares/RateLimter.middleware");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({
        min: 6,
      })
      .withMessage("Password must be at least 6 characters long"),
  ],
  RateLimitERMiddleware.authLimit,
  userController.registerTempuser
);

router.post(
  "/verify",
  RateLimitERMiddleware.authLimit,
  userController.VerifyUser
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({
        min: 6,
      })
      .withMessage("Password must be at least 6 characters long"),
  ],
  RateLimitERMiddleware.authLimit,
  userController.loginUser
);

router.get(
  "/me",
  UserMiddleware.authUser,
  RateLimitERMiddleware.GlobalLimit,
  userController.getMe
);

router.post(
  "/logout",
  UserMiddleware.authUser,
  RateLimitERMiddleware.GlobalLimit,
  userController.logoutUser
);

router.post(
  "/UpdateUserinfo",
  [
    body("Level").notEmpty().withMessage("Level is required"),
    body("Language").notEmpty().withMessage("Language is required"),
    body("LearningStyle").notEmpty().withMessage("LearningStyle is required"),
    body("gender").notEmpty().withMessage("gender is required"),
  ],
  UserMiddleware.authUser,
  RateLimitERMiddleware.authLimit,
  userController.updateUserInfo
);

router.post(
  "/updateProfile",
  UserMiddleware.authUser,
  RateLimitERMiddleware.authLimit,
  userController.UpdateUserProfile
);

module.exports = router;
